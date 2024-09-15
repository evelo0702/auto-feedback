import NoticeList from "@/components/notice-list";
import NoticePagination from "@/components/notice-pagination";
import { getNoticeData } from "@/lib/getNoticeData";
import { Notices } from "@/types/type";
import Link from "next/link";

const NoticeListPage = async () => {
  let data = await getNoticeData("");

  const sortByDate = (data: Notices[]) => {
    return data.sort(
      (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };
  sortByDate(data);

  return (
    <div>
      <NoticePagination data={data} />
    </div>
  );
};

export default NoticeListPage;
