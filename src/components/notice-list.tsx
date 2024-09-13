import { Notices } from "@/types/type";
import Link from "next/link";

const NoticeList = (item: Notices) => {
  return (
    <div>
      <Link href={`/notice/${item.id}`}>
        <div className="hover:bg-gray-100 border-2 mb-1 p-2 border-neutral-300 rounded-md flex-1 flex items-center">
          <div className="ms-4">{item.title}</div>
        </div>
      </Link>
    </div>
  );
};

export default NoticeList;
