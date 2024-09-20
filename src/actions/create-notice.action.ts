"use server";

import { connectDB } from "@/app/utils/database";
import getDate from "@/app/utils/getDate";
import { revalidatePath } from "next/cache";

export async function createNoticeAction(formData: FormData) {
  // DB 연결
  const db = (await connectDB).db("auto-feedback");
  const collection = db.collection("notices");

  // formData
  const content = formData.get("content")?.toString();
  const title = formData.get("title")?.toString();
  const category_code = Number(formData.get("category_code"));
  const date = getDate();
  const id = 79;

  if (!content || !title || !category_code || !date || !id) {
    return {
      status: 400,
      error: "Invalid input data",
    };
  }
  // DB 전송
  try {
    await collection.insertOne({
      id,
      title,
      content,
      category_code,
      date,
    });
    revalidatePath("/notice");
    return { status: 201, message: "Notice created successfully" };
  } catch (err) {
    console.error("Error inserting notice:", err);
    return { status: 500, message: "Error inserting notice" };
  }
}

