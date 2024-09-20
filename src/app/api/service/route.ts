import { connectDB } from "@/app/utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category_code = url.searchParams.get("code");
  try {
    const db = (await connectDB).db("auto-feedback");
    const data = await db
      .collection("service")
      .find(
        { category_code: Number(category_code) },
        { projection: { _id: 0 } }
      )
      .toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
