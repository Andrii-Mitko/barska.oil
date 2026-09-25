"use client";

import styles from "../analytics.module.css";

type AnalyticsPoint = {
  timestamp: string;
  visitors: number;
  pageviews: number;
};

type AnalyticsChartProps = {
  data: AnalyticsPoint[];
};

const CHART_WIDTH = 800;
const CHART_HEIGHT = 280;
const PADDING_X = 40;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 40;

function getMaxValue(data: AnalyticsPoint[]) {
  return Math.max(
    1,
    ...data.map((item) => Math.max(item.visitors, item.pageviews)),
  );
}

function createPoints(
  data: AnalyticsPoint[],
  key: "visitors" | "pageviews",
  maxValue: number,
) {
  if (data.length === 1) {
    return `${CHART_WIDTH / 2},${CHART_HEIGHT / 2}`;
  }

  const chartWidth = CHART_WIDTH - PADDING_X * 2;
  const chartHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  return data
    .map((item, index) => {
      const x = PADDING_X + (index / (data.length - 1)) * chartWidth;

      const y =
        PADDING_TOP + chartHeight - (item[key] / maxValue) * chartHeight;

      return `${x},${y}`;
    })
    .join(" ");
}

function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(timestamp));
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const maxValue = getMaxValue(data);

  const visitorsPoints = createPoints(data, "visitors", maxValue);

  const pageviewsPoints = createPoints(data, "pageviews", maxValue);

  return (
    <section className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <h2 className={styles.chartTitle}>Відвідуваність</h2>

          <p className={styles.chartDescription}>
            Перегляди та відвідувачі за днями
          </p>
        </div>

        <div className={styles.chartLegend}>
          <span className={styles.legendItem}>
            <span
              className={`${styles.legendDot} ${styles.legendDotVisitors}`}
            />
            Відвідувачі
          </span>

          <span className={styles.legendItem}>
            <span
              className={`${styles.legendDot} ${styles.legendDotPageviews}`}
            />
            Перегляди
          </span>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label="Графік відвідуваності сайту"
        >
          {data.map((_, index) => {
            const chartWidth = CHART_WIDTH - PADDING_X * 2;
            const x =
              data.length === 1
                ? CHART_WIDTH / 2
                : PADDING_X + (index / (data.length - 1)) * chartWidth;

            return (
              <line
                key={index}
                x1={x}
                y1={PADDING_TOP}
                x2={x}
                y2={CHART_HEIGHT - PADDING_BOTTOM}
                className={styles.chartGridLine}
              />
            );
          })}

          <polyline
            points={visitorsPoints}
            className={styles.chartLineVisitors}
          />

          <polyline
            points={pageviewsPoints}
            className={styles.chartLinePageviews}
          />

          {data.map((item, index) => {
            const chartWidth = CHART_WIDTH - PADDING_X * 2;

            const x =
              data.length === 1
                ? CHART_WIDTH / 2
                : PADDING_X + (index / (data.length - 1)) * chartWidth;

            const chartHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

            const visitorsY =
              PADDING_TOP +
              chartHeight -
              (item.visitors / maxValue) * chartHeight;

            const pageviewsY =
              PADDING_TOP +
              chartHeight -
              (item.pageviews / maxValue) * chartHeight;

            return (
              <g key={item.timestamp}>
                <circle
                  cx={x}
                  cy={visitorsY}
                  r="4"
                  className={styles.chartPointVisitors}
                />

                <circle
                  cx={x}
                  cy={pageviewsY}
                  r="4"
                  className={styles.chartPointPageviews}
                />
              </g>
            );
          })}

          {data.map((item, index) => {
            if (
              data.length > 10 &&
              index % Math.ceil(data.length / 7) !== 0 &&
              index !== data.length - 1
            ) {
              return null;
            }

            const chartWidth = CHART_WIDTH - PADDING_X * 2;

            const x =
              data.length === 1
                ? CHART_WIDTH / 2
                : PADDING_X + (index / (data.length - 1)) * chartWidth;

            return (
              <text
                key={`date-${item.timestamp}`}
                x={x}
                y={CHART_HEIGHT - 12}
                textAnchor="middle"
                className={styles.chartLabel}
              >
                {formatDate(item.timestamp)}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
