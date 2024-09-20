"use server";

import { connectDB } from "@/app/utils/database";

import { revalidatePath } from "next/cache";

export async function createFaqAction(formData: FormData) {
  // DB 연결
  const db = (await connectDB).db("auto-feedback");
  const collection = db.collection("faqs");

  // formData
  const content = {
    question: formData.get("question")?.toString(),
    answer: formData.get("answer")?.toString(),
  };
  const category_code = Number(formData.get("category_code"));

  const id = 78;

  if (!content || !category_code || !id) {
    return {
      status: 400,
      error: "Invalid input data",
    };
  }
  // DB 전송
  try {
    await collection.insertOne({
      id,
      category_code,
      content,
    });
    revalidatePath("/Faqs");
    return { status: 201, message: "Faq created successfully" };
  } catch (err) {
    console.error("Error inserting Faq:", err);
    return { status: 500, message: "Error inserting Faq" };
  }
}
