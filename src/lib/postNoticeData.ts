import { Notices } from "@/types/type";
import { NextResponse } from "next/server";

export const PostNoticeData = async (notice: Notices) => {
  let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/notice`;
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notice),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API ERROR:", errorData);
      return NextResponse.json(
        { error: "API call failed", details: errorData },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Request Error:", err);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
};
