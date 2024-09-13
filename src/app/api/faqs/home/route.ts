import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import { getCategoryName } from "@/app/utils/categoryCode";
import { Faqs } from "@/types/type";

// GET 요청 처리
export async function GET() {
  try {
    const db = (await connectDB).db("auto-feedback");
    const data = await db
      .collection("faqs")
      .aggregate([
        {
          $group: {
            _id: "$category_code", // category 값으로 그룹화
            doc: { $first: "$$ROOT" }, // 각 그룹에서 첫 번째 문서 선택
          },
        },
        {
          $replaceRoot: { newRoot: "$doc" }, // 문서 구조 복원
        },
      ])
      .toArray();
    const addCategoryName = data.map((i) => ({
      ...i,
      category_name: getCategoryName(i.category_code),
    }));

    return NextResponse.json(addCategoryName);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
