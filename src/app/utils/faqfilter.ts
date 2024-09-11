import { Faqs } from "@/types/type";

export default function ShowHomeFaQData(data: Faqs[]) {
  const filterFaQData = new Set();
  return data.filter((item) => {
    if (!filterFaQData.has(item.category)) {
      filterFaQData.add(item.category);
      return true;
    }
    return false;
  });
}
