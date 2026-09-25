// src/lib/analytics/vercel.ts

const VERCEL_API_URL = "https://api.vercel.com";

type AnalyticsQuery = {
  since: string;
  until: string;
  by?: "day" | "route" | "country" | "referrerHostname" | "deviceType";
  limit?: number;
  filter?: string;
};

type VercelAnalyticsResponse = {
  version: number;
  query: {
    since?: string;
    until?: string;
    groupBy?: string[];
    filter?: string;
    limit?: number;
  };
  data: Array<Record<string, unknown>>;
};

export async function getVercelVisits({
  since,
  until,
  by = "day",
  limit,
  filter,
}: AnalyticsQuery): Promise<VercelAnalyticsResponse> {
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const analyticsToken = process.env.VERCEL_ANALYTICS_TOKEN;

  if (!projectId) {
    throw new Error("VERCEL_PROJECT_ID is not configured");
  }

  if (!teamId) {
    throw new Error("VERCEL_TEAM_ID is not configured");
  }

  if (!analyticsToken) {
    throw new Error("VERCEL_ANALYTICS_TOKEN is not configured");
  }

  const params = new URLSearchParams({
    teamId,
    projectId,
    since,
    until,
    by,
  });

  if (limit !== undefined) {
    params.set("limit", String(limit));
  }

  if (filter) {
    params.set("filter", filter);
  }

  const response = await fetch(
    `${VERCEL_API_URL}/v1/query/web-analytics/visits/aggregate?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${analyticsToken}`,
      },
      next: {
        revalidate: 300,
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Vercel Analytics API error ${response.status}: ${errorText}`,
    );
  }

  return response.json();
}
