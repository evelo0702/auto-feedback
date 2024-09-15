"use client";
import { Notices } from "@/types/type";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const NoticePagination = ({ data }: { data: Notices[] }) => {
  const [pageNum, setPageNum] = useState(0);
  const [noticeData, setNoticeData] = useState<Notices[]>([]);
  const itemsPerPage = 10;
  const totalPage = Math.ceil(data.length / itemsPerPage);

  const sliceData = (pageNum: number) => {
    setNoticeData(data.slice(pageNum * 10, pageNum * 10 + 10));
  };
  useEffect(() => {
    sliceData(pageNum);
  }, [pageNum]);
  return (
    <div className="relative mt-4">
      <div className="h-[65vh]">
        {noticeData.map((i) => (
          <div key={i.id}>
            <Link href={`/notice/${i.id}`}>
              <div className="hover:bg-gray-100 border-2 mb-1 p-2 border-neutral-300 rounded-md flex-1 flex items-center justify-between">
                <div className="ms-4">{i.title}</div>
                <div>{i.date}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => setPageNum(index)}
            className={`
                p-2 rounded-md cursor-pointer transition-colors me-4 mt-4 ${
                  pageNum === index
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticePagination;
