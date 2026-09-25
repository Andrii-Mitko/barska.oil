// src/app/api/admin/analytics/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getVercelVisits } from "@/lib/analytics/vercel";

export async function GET(request: NextRequest) {
  try {
    const daysParam = request.nextUrl.searchParams.get("days") ?? "30";
    const days = Number(daysParam);

    if (![7, 30, 90].includes(days)) {
      return NextResponse.json(
        { error: "Некоректний період" },
        { status: 400 },
      );
    }

    const until = new Date();
    const since = new Date();

    since.setDate(since.getDate() - (days - 1));

    const formatDate = (date: Date) => date.toISOString().slice(0, 10);

    const data = await getVercelVisits({
      since: formatDate(since),
      until: formatDate(until),
      by: "day",
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      { error: "Не вдалося отримати аналітику" },
      { status: 500 },
    );
  }
}
