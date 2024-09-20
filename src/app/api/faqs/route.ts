import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import { getCategoryName } from "@/app/utils/categoryCode";

// GET 요청 처리
export async function GET() {
  try {
    const db = (await connectDB).db("auto-feedback");
    const data = await db.collection("faqs").find().toArray();
    const addNameFaqs = data.map((i) => ({
      ...i,
      category_name: getCategoryName(i.category_code),
    }));
    return NextResponse.json(addNameFaqs);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const db = (await connectDB).db("auto-feedback");
    let collection = db.collection("faqs");
    const data = await req.json();
    await collection.insertOne(data);
    return NextResponse.json(
      { message: "Data inserted successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting data:", err);
    return NextResponse.json(
      { message: "Error inserting data" },
      { status: 500 }
    );
  }
}
