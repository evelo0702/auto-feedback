"use client";

import React, { useEffect, useRef } from "react";
import { Faqs } from "@/types/type";

interface FaqListProps {
  categoryCode: {
    id: number;
    kor: string;
    eng: string;
  }[];
  sortData: {
    [key: string]: Faqs[];
  };
}

const FaqList = ({ categoryCode, sortData }: FaqListProps) => {
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  // index에 따라 DOM요소를 sectionRefs 배열에 저장하는 함수
  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      sectionRefs.current[index] = el;
    }
  };

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative text-center">
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4  hover:font-semibold"
      >
        ↑ Top
      </button>

      <div className="mb-4">
        {categoryCode.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(index)}
            className="p-2 border rounded m-1 hover:bg-slate-200"
          >
            {item.kor}
          </button>
        ))}
      </div>

      <div>
        {categoryCode.map((i, index) => (
          <div key={i.id} ref={setRef(index)} className="mb-8">
            <p className="text-center text-xl mb-2">
              {i.kor} ({i.eng})
            </p>
            {sortData[i.eng].map((item: Faqs) => (
              <div key={item.id} className="border-2 rounded-lg mb-4 p-2">
                <div>Q: {item.content.question}</div>
                <div>A: {item.content.answer}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqList;
