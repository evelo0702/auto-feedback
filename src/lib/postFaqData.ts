import { Faqs } from "@/types/type";
import { NextResponse } from "next/server";

export const PostFaqsData = async (faq: Faqs) => {
  let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/faqs`;
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faq),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API ERROR:", errorData);
      return NextResponse.json(
        { error: "API call failed", details: errorData },
        { status: res.status }
      );
    }
  } catch (err) {
    console.error("Request Error:", err);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
};
