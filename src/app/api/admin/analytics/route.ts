import { NextRequest, NextResponse } from "next/server";
import { getVercelVisits } from "@/lib/analytics/vercel";

const ALLOWED_DAYS = [7, 30, 90] as const;

type AnalyticsDays = (typeof ALLOWED_DAYS)[number];

function getDateRange(days: AnalyticsDays) {
  const until = new Date();
  const since = new Date(until);

  since.setUTCDate(since.getUTCDate() - (days - 1));

  return {
    since: since.toISOString(),
    until: until.toISOString(),
  };
}

function getTotal(
  data: Array<Record<string, unknown>>,
  key: "visitors" | "pageviews",
) {
  return data.reduce((total, item) => {
    const value = item[key];

    return total + (typeof value === "number" ? value : 0);
  }, 0);
}

function isPublicPage(path: string) {
  return (
    path === "/" ||
    (!path.startsWith("/admin") &&
      !path.startsWith("/api") &&
      !path.startsWith("/_next") &&
      !path.includes("."))
  );
}

export async function GET(request: NextRequest) {
  try {
    const daysParam = request.nextUrl.searchParams.get("days") ?? "30";
    const days = Number(daysParam);

    if (!ALLOWED_DAYS.includes(days as AnalyticsDays)) {
      return NextResponse.json(
        {
          error: "Період повинен бути 7, 30 або 90 днів",
        },
        { status: 400 },
      );
    }

    const range = getDateRange(days as AnalyticsDays);

    const [daily, pagesResponse, devices, referrers] = await Promise.all([
      getVercelVisits({
        ...range,
        by: "day",
      }),

      getVercelVisits({
        ...range,
        by: "requestPath",
        limit: 100,
      }),

      getVercelVisits({
        ...range,
        by: "deviceType",
        limit: 10,
      }),

      getVercelVisits({
        ...range,
        by: "referrerHostname",
        limit: 20,
      }),
    ]);

    const pages = pagesResponse.data.filter((item) => {
      const path = item.requestPath;

      return typeof path === "string" && isPublicPage(path);
    });

    return NextResponse.json({
      period: {
        days,
        since: range.since,
        until: range.until,
      },

      summary: {
        visitors: getTotal(daily.data, "visitors"),
        pageviews: getTotal(daily.data, "pageviews"),
      },

      chart: daily.data,
      pages,
      devices: devices.data,
      referrers: referrers.data,
    });
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Невідома помилка",
      },
      { status: 500 },
    );
  }
}
