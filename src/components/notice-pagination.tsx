"use client";
import { Notices } from "@/types/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NoticePagination = ({ data }: { data: Notices[] }) => {
  const [pageNum, setPageNum] = useState(0);
  const [noticeData, setNoticeData] = useState<Notices[]>([]);
  const itemsPerPage = 10;
  const totalPage = Math.ceil(data.length / itemsPerPage);

  // 페이지 번호에 따라 데이터를 슬라이스하는 함수
  const sliceData = (currentPage: number) => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    setNoticeData(data.slice(start, end));
  };

  // pageNum 또는 data가 변경될 때마다 sliceData 호출
  useEffect(() => {
    sliceData(pageNum);
  }, [pageNum, data]);

  return (
    <div className="relative mt-4">
      {/* 공지사항 리스트 */}
      <div className="h-[65vh] overflow-y-auto">
        {noticeData.length > 0 ? (
          noticeData.map((i) => (
            <div key={i._id}>
              <Link href={`/notice/${i.id}`}>
                <div className="hover:bg-gray-100 border-2 mb-1 p-2 border-neutral-300 rounded-md flex items-center justify-between">
                  <div className="ms-4">{i.title}</div>
                  <div>{i.date}</div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>공지사항이 없습니다.</div>
        )}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => setPageNum(index)}
            className={`p-2 rounded-md cursor-pointer transition-colors me-4 mt-4 ${
              pageNum === index
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100"
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
