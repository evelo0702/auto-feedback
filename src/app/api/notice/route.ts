import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import { getCategoryName } from "@/app/utils/categoryCode";

// GET 요청 처리
export async function GET(req: Request) {
  const url = new URL(req.url);
  const used = url.searchParams.get("used");
  try {
    const db = (await connectDB).db("auto-feedback");
    let data;
    if (used === "HOME") {
      data = await db.collection("notices").find().limit(8).toArray();
    } else {
      data = await db.collection("notices").find().toArray();
    }
    const addNameNotice = data.map((i) => ({
      ...i,
      category_name: getCategoryName(i.category_code),
    }));
    return NextResponse.json(addNameNotice);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
