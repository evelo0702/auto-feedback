import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import { getCategoryName } from "@/app/utils/categoryCode";
import { Notices } from "@/types/type";

// GET 요청 처리
export async function GET(req: Request) {
  const url = new URL(req.url);
  const used = url.searchParams.get("used");
  const id = url.searchParams.get("id");

  try {
    const db = (await connectDB).db("auto-feedback");
    let data;
    if (used === "HOME") {
      data = await db.collection("notices").find().limit(8).toArray();
    } else if (used === "NOTICE") {
      data = await db
        .collection("notices")
        .find({}, { projection: { content: 0 } })
        .toArray();
    } else {
      data = await db
        .collection("notices")
        .find({ id: Number(id) })
        .toArray();
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

export async function POST(req: Request) {
  try {
    const db = (await connectDB).db("auto-feedback");
    let collection = db.collection("notices");
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
