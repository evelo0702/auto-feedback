import { Notices } from "@/types/type";

export async function getNoticeData(
  used?: string | null,
  id?: string
): Promise<Notices[]> {
  let url;
  if (used === "HOME") {
    url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/notice?used=HOME`;
  } else if (used === "NOTICE") {
    url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/notice?used=NOTICE`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/notice?id=${id}`;
  }

  try {
    let res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Notice Network response was not ok");
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}
