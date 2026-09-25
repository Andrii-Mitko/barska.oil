"use client";

import { useState } from "react";
import styles from "../analytics.module.css";

type AnalyticsPoint = {
  timestamp: string;
  visitors: number;
  pageviews: number;
};

type AnalyticsChartProps = {
  data: AnalyticsPoint[];
};

type TooltipData = {
  x: number;
  y: number;
  timestamp: string;
  visitors: number;
  pageviews: number;
};

const CHART_WIDTH = 800;
const CHART_HEIGHT = 280;

const PADDING_LEFT = 40;
const PADDING_RIGHT = 60;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 40;

const chartWidth = CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT;
const chartHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

function getMaxValue(data: AnalyticsPoint[]) {
  return Math.max(
    1,
    ...data.map((item) => Math.max(item.visitors, item.pageviews)),
  );
}

function getPointX(index: number, dataLength: number) {
  if (dataLength === 1) {
    return CHART_WIDTH / 2;
  }

  return PADDING_LEFT + (index / (dataLength - 1)) * chartWidth;
}

function getPointY(value: number, maxValue: number) {
  return PADDING_TOP + chartHeight - (value / maxValue) * chartHeight;
}

function createPoints(
  data: AnalyticsPoint[],
  key: "visitors" | "pageviews",
  maxValue: number,
) {
  return data
    .map((item, index) => {
      const x = getPointX(index, data.length);
      const y = getPointY(item[key], maxValue);

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

function formatTooltipDate(timestamp: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(timestamp));
}

function getLabelIndexes(length: number) {
  if (length <= 7) {
    return Array.from({ length }, (_, index) => index);
  }

  const step = Math.ceil((length - 1) / 6);
  const indexes: number[] = [];

  for (let index = 0; index < length; index += step) {
    indexes.push(index);
  }

  if (indexes[indexes.length - 1] !== length - 1) {
    indexes.push(length - 1);
  }

  return indexes;
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  if (data.length === 0) {
    return (
      <section className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h2 className={styles.chartTitle}>Відвідуваність</h2>

            <p className={styles.chartDescription}>
              Перегляди та відвідування за днями
            </p>
          </div>
        </div>

        <p className={styles.emptyState}>Даних за вибраний період немає.</p>
      </section>
    );
  }

  const maxValue = getMaxValue(data);

  const visitorsPoints = createPoints(data, "visitors", maxValue);
  const pageviewsPoints = createPoints(data, "pageviews", maxValue);

  const labelIndexes = getLabelIndexes(data.length);

  return (
    <section className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <h2 className={styles.chartTitle}>Відвідуваність</h2>

          <p className={styles.chartDescription}>
            Перегляди та відвідування за днями
          </p>
        </div>

        <div className={styles.chartLegend}>
          <span className={styles.legendItem}>
            <span
              className={`${styles.legendDot} ${styles.legendDotVisitors}`}
            />
            Відвідування
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
        <div className={styles.chartContainer}>
          <svg
            className={styles.chart}
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            role="img"
            aria-label="Графік відвідуваності сайту"
            onMouseLeave={() => setTooltip(null)}
          >
            {labelIndexes.map((index) => {
              const x = getPointX(index, data.length);

              return (
                <line
                  key={`grid-${data[index].timestamp}`}
                  x1={x}
                  y1={PADDING_TOP}
                  x2={x}
                  y2={CHART_HEIGHT - PADDING_BOTTOM}
                  className={styles.chartGridLine}
                />
              );
            })}

            <line
              x1={PADDING_LEFT}
              y1={CHART_HEIGHT - PADDING_BOTTOM}
              x2={CHART_WIDTH - PADDING_RIGHT}
              y2={CHART_HEIGHT - PADDING_BOTTOM}
              className={styles.chartAxisLine}
            />

            <polyline
              points={visitorsPoints}
              className={styles.chartLineVisitors}
            />

            <polyline
              points={pageviewsPoints}
              className={styles.chartLinePageviews}
            />

            {data.map((item, index) => {
              const x = getPointX(index, data.length);

              const visitorsY = getPointY(item.visitors, maxValue);
              const pageviewsY = getPointY(item.pageviews, maxValue);

              const tooltipY = Math.min(visitorsY, pageviewsY);

              return (
                <g
                  key={item.timestamp}
                  className={styles.chartPointGroup}
                  onMouseEnter={() =>
                    setTooltip({
                      x,
                      y: tooltipY,
                      timestamp: item.timestamp,
                      visitors: item.visitors,
                      pageviews: item.pageviews,
                    })
                  }
                >
                  <rect
                    x={x - 14}
                    y={PADDING_TOP}
                    width="28"
                    height={chartHeight}
                    className={styles.chartHoverArea}
                  />

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

            {labelIndexes.map((index) => {
              const item = data[index];
              const x = getPointX(index, data.length);

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

          {tooltip && (
            <div
              className={styles.chartTooltip}
              style={{
                left: `${(tooltip.x / CHART_WIDTH) * 100}%`,
                top: `${(tooltip.y / CHART_HEIGHT) * 100}%`,
              }}
            >
              <strong className={styles.chartTooltipDate}>
                {formatTooltipDate(tooltip.timestamp)}
              </strong>

              <span>
                <span
                  className={`${styles.chartTooltipDot} ${styles.chartTooltipDotVisitors}`}
                />
                Відвідування: <strong>{tooltip.visitors}</strong>
              </span>

              <span>
                <span
                  className={`${styles.chartTooltipDot} ${styles.chartTooltipDotPageviews}`}
                />
                Перегляди: <strong>{tooltip.pageviews}</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
