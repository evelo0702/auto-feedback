import { getFaqData } from "@/lib/getFaqData";
import SortCategory from "../utils/sortCategory";
import { categoryCode } from "../utils/categoryCode";
import FaqList from "@/components/faq-list";

export default async function Page() {
  const data = await getFaqData("");
  const sortData = SortCategory(data);

  return (
    <div className="flex justify-center">
      <FaqList categoryCode={categoryCode} sortData={sortData} />
    </div>
  );
}
