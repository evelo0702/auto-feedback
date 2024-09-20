"use client";
import { useRouter } from "next/navigation";
import { categoryCode } from "../utils/categoryCode";
import { createNoticeAction } from "@/actions/create-notice.action";
import { useState } from "react";
import { createFaqAction } from "@/actions/create-faq.action";
import { getServiceData } from "@/lib/getServiceData";
import { SendEmail } from "../utils/send-email";

const RegisterPage = () => {
  const [mode, setMode] = useState("notice");
  const router = useRouter();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    mode: string
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (mode === "notice") {
      let newData = {
        title: formData.get("title")?.toString(),
        content: formData.get("content")?.toString(),
        category_code: Number(formData.get("category_code")),
      };
      let data = await getServiceData(newData.category_code);

      if (data.length > 0) {
        SendEmail(data, newData);
      }

      try {
        let res = await createNoticeAction(formData); // createNoticeAction 호출
        console.log(res);
        router.push("/notice"); // 페이지 이동
      } catch (error) {
        console.error("폼 제출 오류:", error);
      }
    } else {
      let newData = {
        title: formData.get("question")?.toString(),
        content: formData.get("answer")?.toString(),
        category_code: Number(formData.get("category_code")),
      };
      let data = await getServiceData(newData.category_code);
      if (data.length > 0) {
        SendEmail(data, newData);
      }
      try {
        let res = await createFaqAction(formData); // createNoticeAction 호출
        console.log(res);
        router.push("/faqs"); // 페이지 이동
      } catch (error) {
        console.error("폼 제출 오류:", error);
      }
    }
  };

  return (
    <section className="flex flex-col justify-center items-center p-4 h-[85vh]">
      <div className="flex justify-center my-4 ">
        <button
          onClick={() => setMode("notice")}
          className={`text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out shadow-md me-2 ${
            mode === "notice"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Notice
        </button>
        <button
          onClick={() => setMode("faqs")}
          className={`text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out shadow-md ${
            mode === "faqs"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-400"
          }`}
        >
          FAQs
        </button>
      </div>

      <section className="bg-white p-4 border-2 border-gray-200 rounded-lg shadow-lg w-full max-w-4xl h-full flex flex-col">
        {mode === "notice" ? (
          <p className="text-xl font-bold mb-2">NOTICE 작성하기</p>
        ) : (
          <p className="text-xl font-bold mb-2">FAQS 작성하기</p>
        )}
        <form
          className="flex flex-col space-y-2 flex-grow"
          onSubmit={(e) => handleSubmit(e, mode)} // use `mode` instead of hardcoded "notice"
        >
          <div className="flex items-center space-x-4">
            <select
              name="category_code"
              defaultValue=""
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-auto"
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

            {mode === "notice" ? (
              <input
                type="text"
                name="title"
                required
                placeholder="Notice의 제목을 입력해주세요"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
              />
            ) : (
              <input
                type="text"
                name="question"
                required
                placeholder="Question을 입력해주세요"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
              />
            )}
          </div>

          <div className="flex flex-col space-y-2">
            {mode === "notice" ? (
              <label className="font-semibold text-gray-700">
                내용을 입력해주세요:
              </label>
            ) : (
              <label className="font-semibold text-gray-700">Answer:</label>
            )}
            {mode === "notice" ? (
              <textarea
                name="content"
                required
                rows={10}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              ></textarea>
            ) : (
              <textarea
                name="answer"
                required
                rows={10}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              ></textarea>
            )}
          </div>

          <button
            type="submit"
            className="bg-gray-200 font-semibold py-3 rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out shadow-md"
          >
            저장하기
          </button>
        </form>
      </section>
    </section>

    // <section className="flex flex-col justify-center items-center p-4">
    //   <div className="flex justify-center mb-8">
    //     <button
    //       onClick={() => setMode("notice")}
    //       className="bg-gray-800 me-2 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out shadow-md"
    //     >
    //       Notice
    //     </button>
    //     <button
    //       onClick={() => setMode("faqs")}
    //       className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out shadow-md"
    //     >
    //       FAQs
    //     </button>
    //   </div>

    //   <section className="bg-white p-8 border-2 h-[70vh] border-gray-200 rounded-lg shadow-lg w-full max-w-4xl">
    //     <form
    //       className="flex flex-col space-y-6"
    //       onSubmit={(e) => handleSubmit(e, "notice")}
    //     >
    //       <div className="flex">
    //         <select
    //           name="category_code"
    //           required
    //           className="p-3 border me-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    //         >
    //           <option value="" disabled selected>
    //             카테고리 선택
    //           </option>
    //           {categoryCode.map((i) => (
    //             <option value={i.id} key={i.id}>
    //               {i.kor}
    //             </option>
    //           ))}
    //         </select>
    //         <input
    //           type="text"
    //           name="title"
    //           required
    //           className="p-3 border w-9/12 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    //         />
    //       </div>

    //       <div className="flex flex-col space-y-2">
    //         <label className="font-semibold text-gray-700">
    //           내용을 입력해주세요:
    //         </label>
    //         <textarea
    //           name="content"
    //           required
    //           rows={10}
    //           className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
    //         ></textarea>
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full bg-gray-200  font-semibold py-3 rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out shadow-md"
    //       >
    //         저장하기
    //       </button>
    //     </form>
    //   </section>
    // </section>
  );
};

export default RegisterPage;
