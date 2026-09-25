"use client";

import styles from "../analytics.module.css";

type DeviceAnalytics = {
  deviceType: string;
  visitors: number;
  pageviews: number;
};

type DevicesAnalyticsProps = {
  data: DeviceAnalytics[];
};

const numberFormatter = new Intl.NumberFormat("uk-UA");

const DEVICE_NAMES: Record<string, string> = {
  desktop: "Комп'ютер",
  mobile: "Телефон",
  tablet: "Планшет",
};

function getDeviceName(device: string) {
  return DEVICE_NAMES[device] ?? device;
}

export default function DevicesAnalytics({ data }: DevicesAnalyticsProps) {
  const devices = [...data].sort((a, b) => b.pageviews - a.pageviews);

  const totalPageviews = devices.reduce(
    (total, device) => total + device.pageviews,
    0,
  );

  return (
    <section className={styles.analyticsCard}>
      <h2 className={styles.analyticsCardTitle}>Пристрої</h2>

      <p className={styles.analyticsCardDescription}>
        З яких пристроїв переглядають сайт
      </p>

      {devices.length === 0 ? (
        <p className={styles.emptyState}>Даних про пристрої поки немає.</p>
      ) : (
        <div className={styles.analyticsList}>
          {devices.map((device) => {
            const percentage =
              totalPageviews > 0
                ? (device.pageviews / totalPageviews) * 100
                : 0;

            return (
              <div key={device.deviceType} className={styles.analyticsListItem}>
                <div className={styles.analyticsListMain}>
                  <span className={styles.analyticsListName}>
                    {getDeviceName(device.deviceType)}
                  </span>

                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className={styles.analyticsListValues}>
                  <strong>{Math.round(percentage)}%</strong>

                  <span>{numberFormatter.format(device.pageviews)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
