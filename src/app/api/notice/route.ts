import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";

// GET 요청 처리
export async function GET() {
  try {
    const db = (await connectDB).db("auto-feedback");
    const data = await db.collection("notices").find().toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
