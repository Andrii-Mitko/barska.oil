"use client";

import { useState } from "react";
import PeriodSelector from "./components/PeriodSelector";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import styles from "./analytics.module.css";

type Period = 7 | 30 | 90;

const DEFAULT_PERIOD: Period = 30;

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Аналітика</h1>

          <p className={styles.description}>Статистика відвідуваності сайту</p>
        </div>

        <PeriodSelector value={period} onChange={setPeriod} />
      </header>

      <AnalyticsDashboard period={period} />
    </main>
  );
}
