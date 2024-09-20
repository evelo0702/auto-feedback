import { getCategoryName } from "@/app/utils/categoryCode";
import { connectDB } from "@/app/utils/database";
import { Faqs, Notices } from "@/types/type";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  try {
    const db = (await connectDB).db("auto-feedback");

    let faqsData = await db
      .collection("faqs")
      .find({ category_code: Number(code) })
      .toArray();
    let noticesData = await db
      .collection("notices")
      .find({ category_code: Number(code) })
      .toArray();
    const fixFaqsData = faqsData.map((i) => ({
      ...i,
      category_name: getCategoryName(i.category_code),
      type: "FAQS",
    }));
    const fixNoticesData = noticesData.map((i) => ({
      ...i,
      category_name: getCategoryName(i.category_code),
      type: "공지사항",
    }));
    let totalData = [...fixFaqsData, ...fixNoticesData];

    return NextResponse.json(totalData);
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: Request) {
  try {
    const db = (await connectDB).db("auto-feedback");
    const collection = db.collection("service");
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
