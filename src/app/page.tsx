import FaqListCard from "@/components/faq-list-card";
import NoticeList from "@/components/notice-list";
import { getFaqData } from "@/lib/getFaqData";
import { getNoticeData } from "@/lib/getNoticeData";
import { Faqs } from "@/types/type";
import Link from "next/link";
import ShowHomeFaQData from "./utils/faqfilter";
import ShowHomeNoticeData from "./utils/noticefilter";

export default async function Home() {
  // FaQ 데이터중에 각 카테고리별로 한개씩만 필터링해주는 메소드

  const notices = await getNoticeData();
  const faqs = await getFaqData();
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-1 h-3/4">
          <div className="w-1/2 me-2">
            <div className="flex justify-center text-xl font-normal my-3">
              <p>공지사항</p>
            </div>
            {ShowHomeNoticeData(notices).map((item) => (
              <NoticeList key={item.id} {...item} />
            ))}
          </div>
          <div className="w-1/2 flex flex-col overflow-scroll ms-2">
            <div className="flex justify-center text-xl font-normal my-3">
              <p>궁금한게 있으시다면 FAQ를 먼저 확인해주세요!</p>
            </div>
            <div className="flex flex-col flex-1">
              {ShowHomeFaQData(faqs).map((item) => (
                <FaqListCard {...item} key={item.id} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-1/4 justify-center items-center text-xl">
          <div className="flex justify-center items-center">
            FAQ와 공지사항으로 궁금한점이 해결이 안되셨다면
            <Link href={"/contact"} className="mx-2 text-5xl ">
              Contact
            </Link>
            를 통해 문의해주세요
          </div>
        </div>
      </div>
    </>
  );
}
