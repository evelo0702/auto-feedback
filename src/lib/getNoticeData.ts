import { Notices } from "@/types/type";

export async function getNoticeData(): Promise<Notices[]> {
  let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/notice`;

  try {
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}
