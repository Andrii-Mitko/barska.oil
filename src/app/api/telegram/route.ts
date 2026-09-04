import { NextResponse } from "next/server";

export async function POST() {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Telegram env variables are missing" },
        { status: 500 },
      );
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "Нове замовлення!",
      }),
    });

    if (!response.ok) {
      throw new Error("Telegram API error");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram error:", error);

    return NextResponse.json(
      { error: "Не вдалося відправити повідомлення" },
      { status: 500 },
    );
  }
}
