import { getNoticeData } from "@/lib/getNoticeData";

const NoticeDetailPage = async ({ params }: { params: { id: string } }) => {
  let data = await getNoticeData("", params.id);
  return (
    <div className="px-32 py-10">
      {data[0] && (
        <>
          <div className="flex items-center justify-between text-2xl">
            {data[0].title} <p className="text-sm">{data[0].date}</p>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: data[0].content.replace(/\n/g, "<br />"),
            }}
          />
        </>
      )}
    </div>
  );
};

export default NoticeDetailPage;
