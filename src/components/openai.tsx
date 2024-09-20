"use client";
import { categoryCode } from "@/app/utils/categoryCode";
import { getContactData } from "@/lib/getContactData";
import { Openai } from "@/types/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import FaqListCard from "./faq-list-card";
import { PostContactData } from "@/lib/postContactData";

const OpenAi = () => {
  const [res, setRes] = useState<Openai[]>([]);
  const [question, setQuestion] = useState({
    category: "",
    text: "",
  });
  const [comment, setComment] = useState(
    `문의사항과 연관있는 게시글을 찾아드립니다`
  );
  const [saveQuestion, setSaveQuestion] = useState({
    category_code: 0,
    text: "",
    email: "",
    date: "",
  });
  const [chatMode, setMode] = useState("WAIT");
  const handleSubmit = async (msg: string, qes: string) => {
    setMode("LOADING");
    setComment("문의사항과 연관있는 데이터를 DB에서 검색중입니다");
    setRes([]);
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 실패했습니다.");
      }

      const data = await response.json();
      const content = data.choices[0]?.message.content;
      const cleanedContent = content.replace(/```json|```|```/g, "").trim();
      let parsedData = JSON.parse(cleanedContent || "[]");

      // 한번의 요청으론 데이터가 부정확한 경우가 많아서 2차 요청으로 재검증하는 과정
      if (parsedData.length > 0) {
        const secondMsg = `"데이터:${cleanedContent}" 해당 데이터중 ${qes}하고 조금이라도 연관된 내용이있다면 해당 데이터를 모두 반환해주고
     "데이터"가 빈값이거나 연관이 없다면 빈배열을 반환해줘 `;

        const secondRes = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: secondMsg }),
        });
        const data2 = await secondRes.json();
        const content2 = data2.choices[0]?.message.content
          .replace(/```json|```|```/g, "")
          .trim();

        parsedData = JSON.parse(content2 || "[]");
      }
      setMode("DONE");
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        setRes(parsedData);
        setComment(
          `데이터 베이스에서 질문:${qes}하고 연관된 데이터들을 불러왔습니다\n 해당 데이터로 해결이 되지않았다면 문의를 저장해주세요`
        );
      } else {
        setRes([]);
        setComment(
          `데이터 베이스에 질문: ${qes} 하고 관련된 데이터가 없습니다\n 해당 문의를 저장해주시면 관련된 데이터가 업데이트 될 경우 알려드리겠습니다`
        );
      }
    } catch (error) {
      setRes([]);
      setMode("DONE");
      setComment(`DB로 데이터를 요청중에 Error가 발생했습니다 재시도해주세요`);
    }
  };

  const sendQ = async () => {
    setSaveQuestion({
      category_code: Number(question.category),
      text: question.text,
      email: "",
      date: "",
    });

    if (question.category && question.text) {
      const data = await getContactData(question.category);
      const newMsg = `"데이터:${JSON.stringify(data)}" 다음 데이터들 중에서 ${
        question.text
      }하고 관련된 모든 데이터를 찾고 싶습니다. 연관이 있는지 여러번 확인해주세요
      연관이있는 근거가있는 데이터만 반환해주세요
      반환된 데이터는 배열안에 아래 형식으로 객체를 넣어서 제공해 주세요:
      newId: 0부터 시작하여 연속적으로 증가하는 숫자
      type: 객체의 type 값이 FAQS인 경우 "faqs", 공지사항인 경우 "notice"
      id: 객체의 id
      category_code: 객체의 category_code
      만약 객체의 type이 FAQS인 경우, content 객체에 question과 answer 값을 포함
      만약 객체의 type이 notice인 경우, title 값 포함
      연관된 데이터가 없을 경우, 빈 배열을 반환해 주세요 그리고 배열외 아무런 코멘트 없이 배열만 반환해주세요`;

      handleSubmit(newMsg, question.text);
      setQuestion({
        category: "",
        text: "",
      });
    }
  };
  const saveDB = () => {
    let data = {
      ...saveQuestion,
      date: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };
    PostContactData(data);
    setSaveQuestion({
      category_code: 0,
      text: "",
      email: "",
      date: "",
    });
    setComment("정상적으로 저장되었습니다");
  };

  return (
    <div>
      <div className="w-[60vw] h-[70vh] bg-white p-4 border-2 border-gray-200 rounded-lg shadow-lg overflow-auto ">
        {Array.isArray(res) && chatMode === "DONE" ? (
          <>
            {res.map((i) => (
              <div key={i.newId}>
                {i.type === "faqs" && i.content ? (
                  <FaqListCard
                    {...{
                      id: i.id,
                      content: i.content,
                      category_code: i.category_code,
                    }}
                  />
                ) : (
                  <div className="relative">
                    <div key={i.id}>
                      <Link href={`/notice/${i.id}`}>
                        <div className="hover:bg-sky-100 border-2 mb-1 p-2 border-neutral-300 rounded-md flex-1 flex items-center justify-between">
                          <div className="ms-4">{i.title}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="whitespace-pre-line text-center flex flex-col items-center  w-full h-full">
              {comment}
              {comment !== "정상적으로 저장되었습니다" && (
                <div className="w-1/2">
                  <input
                    type="email"
                    value={saveQuestion.email}
                    onChange={(e) =>
                      setSaveQuestion({
                        ...saveQuestion,
                        email: e.target.value,
                      })
                    }
                    placeholder="이메일을 작성해주세요"
                  />
                  <button onClick={saveDB}>문의 저장하기</button>
                </div>
              )}
            </div>
          </>
        ) : chatMode === "LOADING" ? (
          <div className="flex items-center justify-center w-full h-full flex-col">
            <p className="w-full text-center text-xl mb-4">{comment}</p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-8 border-gray-200 border-t-transparent border-solid rounded-full animate-spin relative">
                <div className="absolute inset-0 border-t-4 border-black border-solid rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center ">
            <p className="text-xl">{comment}</p>
          </div>
        )}
      </div>

      <div className="w-[60vw] flex mt-4">
        <select
          name=""
          id=""
          value={question.category}
          onChange={(e) =>
            setQuestion({ ...question, category: e.target.value })
          }
        >
          <option value="" disabled>
            카테고리 선택
          </option>
          {categoryCode.map((i) => (
            <option value={i.id} key={i.id}>
              {i.kor}
            </option>
          ))}
        </select>
        <textarea
          placeholder="문의사항을 작성해주세요"
          className="flex-grow rounded-md p-2 me-1"
          value={question.text}
          onChange={(e) => setQuestion({ ...question, text: e.target.value })}
        />
        <button className="bg-sky-100 w-1/6 rounded-md p-1" onClick={sendQ}>
          전송
        </button>
      </div>
    </div>
  );
};

export default OpenAi;