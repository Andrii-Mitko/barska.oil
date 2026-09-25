"use client";

import styles from "../analytics.module.css";

const PERIODS = [7, 30, 90] as const;

type Period = (typeof PERIODS)[number];

type PeriodSelectorProps = {
  value: Period;
  onChange: (period: Period) => void;
};

export default function PeriodSelector({
  value,
  onChange,
}: PeriodSelectorProps) {
  return (
    <div className={styles.periodSelector} aria-label="Період аналітики">
      {PERIODS.map((period) => (
        <button
          key={period}
          type="button"
          className={`${styles.periodButton} ${
            value === period ? styles.periodButtonActive : ""
          }`}
          onClick={() => onChange(period)}
        >
          {period} днів
        </button>
      ))}
    </div>
  );
}
