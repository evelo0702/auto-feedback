export const getContactData = async () => {
  let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/contact`;
  try {
    let res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Contact Network response was not ok");
    }
  } catch (err) {
    console.error(err);
  }
};
