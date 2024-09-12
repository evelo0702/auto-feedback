import FaqListCard from "@/components/faq-list-card";
import { getFaqData } from "@/lib/getFaqData";
import SortCategory from "../utils/sortCategory";
import { categoryCode } from "../utils/categoryCode";
import { Faqs } from "@/types/type";

const FaqListPage = async () => {
  const data = await getFaqData();
  const sortData = SortCategory(data);

  return (
    <div className="flex justify-center">
      <div>
        {categoryCode.map((i) => (
          <div key={i.id}>
            <p className="text-center text-xl mb-2">
              {i.kor} ({i.eng})
            </p>
            {sortData[i.eng].map((item: Faqs) => (
              <div key={item.id} className="border-2 rounded-lg mb-4 p-2">
                <div>Q: {item.content.question}</div>
                <div>A: {item.content.answer}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqListPage;
