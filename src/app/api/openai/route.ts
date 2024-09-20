import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    return NextResponse.json({ error: "API KEY IS MISSING" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 2000,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Error:", errorData);
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
}
