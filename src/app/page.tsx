
import FaqListCard from "@/components/faq-list-card";
import NoticeList from "@/components/notice-list";
import { getFaqData } from "@/lib/getFaqData";
import { getNoticeData } from "@/lib/getNoticeData";
import { Faqs, Notices } from "@/types/type";
import Link from "next/link";

export default async function Home() {
  const notices: Notices[] = await getNoticeData("HOME");
  const faqs: Faqs[] = await getFaqData("HOME");
  faqs.sort((a, b) => a.category_code - b.category_code);
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-1 h-3/4">
          <div className="w-1/2 me-2">
            <div className="flex justify-center text-xl font-normal my-3">
              <p>공지사항</p>
            </div>
            {notices.map((item) => (
              <NoticeList key={item.id} {...item} />
            ))}
          </div>
          <div className="w-1/2 flex flex-col overflow-scroll ms-2">
            <div className="flex justify-center text-xl font-normal my-3">
              <p>궁금한게 있으시다면 FAQ를 먼저 확인해주세요!</p>
            </div>
            <div className="flex flex-col flex-1">
              {faqs.map((item) => (
                <FaqListCard {...item} key={item.id} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-1/5 justify-center items-center text-xl">
          <div className="flex flex-col justify-center items-center">
            <div className="text-base">
              홈화면에서는 공지사항과 FAQS 중 일부만 제공됩니다 더 많은 정보를
              원하시면 상단에서 해당 탭을 선택해주세요
            </div>
            <div>
              FAQ와 공지사항으로 궁금한점이 해결이 안되셨다면
              <Link href={"/contact"} className="mx-2 text-5xl ">
                Contact
              </Link>
              를 통해 문의해주세요
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
