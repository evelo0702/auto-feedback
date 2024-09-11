import FaqItem from "@/components/faq-item";

const FaqDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      FaQ page : {params.id}
      <FaqItem />
    </div>
  );
};

export default FaqDetailPage;
