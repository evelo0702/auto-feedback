import { Faqs, Notices } from "@/types/type";

export default function ShowHomeNoticeData(data: Notices[]) {
  let res = data.slice(0, 8);
  return res;
}
