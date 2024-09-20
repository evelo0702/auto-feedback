"use client";
import { Faqs } from "@/types/type";
import { useState } from "react";

const FaqListCard = (item: Faqs) => {
  const [ShowAns, setShowAns] = useState(false);
  return (
    <>
      {item.category_name && (
        <>
          <button onClick={() => setShowAns(!ShowAns)}>
            <div className="hover:bg-gray-100 border-2 mb-1 p-2 border-neutral-300 rounded-md flex-1 flex items-center">
              <>
                <div className="ms-4">{ShowAns ? "-" : "+"}</div>
                <div className="w-1/3 me-2">[{item.category_name.kor}]</div>
                <div>{item.content.question}</div>
              </>
            </div>
          </button>
          {ShowAns && (
            <div className="text-start p-2">{item.content.answer}</div>
          )}
        </>
      )}
      {!item.category_name && (
        <div className="hover:bg-gray-100 border-2 mb-1 p-2 border-neutral-300 rounded-md flex-1 text-center">
          <div>Q. {item.content.question}</div>
          <div>A. {item.content.answer}</div>
        </div>
      )}
    </>
  );
};

export default FaqListCard;
