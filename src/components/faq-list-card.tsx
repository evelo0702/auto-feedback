import { Faqs } from "@/types/faqs";
import Link from "next/link";

const FaqListCard = (item: Faqs) => {
  return (
    <Link href={`/faq/${item.id}`}>
      <div className="bg-gray-100 border-2 mb-1 border-neutral-300 rounded-md flex-1 flex items-center">
        <div className="w-1/3 mx-2">[{item.category}]</div>
        <div>{item.content.question}</div>
      </div>
    </Link>
  );
};

export default FaqListCard;
