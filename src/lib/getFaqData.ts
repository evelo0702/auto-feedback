import { Faqs } from "@/types/type";

export async function getFaqData(mode: string | ""): Promise<Faqs[]> {
  let url;
  if (mode === "HOME") {
    url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/faqs/home`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/faqs`;
  }

  try {
    let res = await fetch(url, { cache: "no-store" });
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
