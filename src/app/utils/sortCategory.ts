import { Faqs, Notices } from "@/types/type";
import { categoryCode } from "./categoryCode";

export default function SortCategory(data: Faqs[] | Notices[]) {
  let sortCategory: any = {};
  categoryCode.forEach((i) => {
    sortCategory[i.eng] = data.filter((j) => j.category_code === i.id);
  });
  return sortCategory;
}
