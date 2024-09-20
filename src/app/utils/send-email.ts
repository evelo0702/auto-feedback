import { Email } from "./email";
import { Services } from "@/types/type";

export const SendEmail = async (
  serviceData: Services[],
  newData: {
    title: string | undefined;
    content: string | undefined;
    category_code: number;
  }
) => {
  let msg = `문의사항 데이터 배열인 ${JSON.stringify(
    serviceData
  )}이 배열속 객체 각각의 text값과 ${JSON.stringify(
    newData
  )}의 title값이나 content값이 논리적인 연관성이 있다고 생각되거나
  일부 문자열이 일치하거나 포함된 경우일경우 해당 데이터 객체들만 추가 코멘트 없이 배열에 넣어서 반환해 주세요. 
  관련된 데이터가 없다면, 빈 배열만 반환해 주세요.
  비교 방식은 다음과 같습니다:
  text 값에 title이나 content의 일부 또는 전체가 포함되어 있는지 확인합니다.
  text 값하고 title이나 content의 값이 논리적으로 연관성이 있다고 생각되는 경우를 확인합니다.
  문자열 포함 여부를 확인할 때는 대소문자 구분 없이 비교해 주세요.
  관련성이 없다면 빈 배열을 반환해 주세요.
  반환값은 다음과 같이 해주세요
  관련있는 데이터가 있을때 : [{해당데이터객체}] 
  관련있는 데이터가 없을때 :  []`;

  try {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: msg }),
    });
    if (!res.ok) {
      throw new Error("openai 네트워크 응답에 실패했습니다");
    }
    const data = await res.json();
    const content = data.choices[0]?.message.content;

    const cleanedContent = content.replace(/```json|```|```/g, "").trim();
    let emailData = JSON.parse(cleanedContent);
    if (emailData.length > 0) {
      for (let i = 0; i < emailData.length; i++) {
        Email(emailData[i].email, emailData[i].text, newData);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
