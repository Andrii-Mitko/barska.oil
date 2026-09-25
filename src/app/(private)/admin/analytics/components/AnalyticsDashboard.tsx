"use client";

import { useEffect, useState } from "react";
import styles from "../analytics.module.css";
import AnalyticsChart from "./AnalyticsChart";
import PopularPages from "./PopularPages";
import DevicesAnalytics from "./DevicesAnalytics";
import ReferrersAnalytics from "./ReferrersAnalytics";

type Period = 7 | 30 | 90;

type PageAnalytics = {
  requestPath: string;
  visitors: number;
  pageviews: number;
};

type AnalyticsPoint = {
  timestamp: string;
  visitors: number;
  pageviews: number;
};

type AnalyticsData = {
  period: {
    days: Period;
    since: string;
    until: string;
  };

  summary: {
    visitors: number;
    pageviews: number;
  };

  chart: AnalyticsPoint[];

  pages: PageAnalytics[];

  devices: DeviceAnalytics[];

  referrers: ReferrerAnalytics[];
};

type AnalyticsDashboardProps = {
  period: Period;
};

type DeviceAnalytics = {
  deviceType: string;
  visitors: number;
  pageviews: number;
};

type ReferrerAnalytics = {
  referrerHostname: string;
  visitors: number;
  pageviews: number;
};

const numberFormatter = new Intl.NumberFormat("uk-UA");

export default function AnalyticsDashboard({
  period,
}: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnalytics() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`/api/admin/analytics?days=${period}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Не вдалося завантажити аналітику");
        }

        const result: AnalyticsData = await response.json();

        setData(result);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Не вдалося завантажити аналітику",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      controller.abort();
    };
  }, [period]);

  if (isLoading) {
    return (
      <section className={styles.loadingGrid} aria-label="Завантаження">
        <div className={styles.loadingCard} />
        <div className={styles.loadingCard} />
        <div className={styles.loadingChart} />
      </section>
    );
  }

  if (error) {
    return (
      <div className={styles.errorBox}>
        <p className={styles.error}>{error}</p>

        <button
          type="button"
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Спробувати ще раз
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className={styles.summary}>
      <article className={styles.summaryCard}>
        <span className={styles.summaryLabel}>Відвідування</span>

        <strong className={styles.summaryValue}>
          {numberFormatter.format(data.summary.visitors)}
        </strong>

        <span className={styles.summaryPeriod}>
          Сума денних відвідувань за {data.period.days} днів
        </span>
      </article>

      <article className={styles.summaryCard}>
        <span className={styles.summaryLabel}>Перегляди сторінок</span>

        <strong className={styles.summaryValue}>
          {numberFormatter.format(data.summary.pageviews)}
        </strong>

        <span className={styles.summaryPeriod}>
          Усього переглядів за {data.period.days} днів
        </span>
      </article>

      <AnalyticsChart data={data.chart} />

      <PopularPages data={data.pages} />

      <div className={styles.analyticsGrid}>
        <DevicesAnalytics data={data.devices} />

        <ReferrersAnalytics data={data.referrers} />
      </div>
    </section>
  );
}
