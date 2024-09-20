export async function Email(
  email: string,
  text: string,
  newData: {
    title: string | undefined;
    content: string | undefined;
    category_code: number;
  }
) {
  let loading = false;
  let error: string | null = null;
  let message: string | null = null;

  const sendEmail = async () => {
    loading = true;
    error = null;
    message = null;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          to: email,
          subject: `작성해주신 질문:${text}하고 연관된 게시글이 작성되었습니다`,
          text: `제목: ${newData.title}\n 내용: ${newData.content}\n 보다 자세한 내용은 해당 게시물을 통해 확인해주세요`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      message = data.message;
      console.log(message);
    } catch (e) {
      error = "Failed to send email";
      console.error(e);
    } finally {
      loading = false;
    }
  };

  await sendEmail();
}
