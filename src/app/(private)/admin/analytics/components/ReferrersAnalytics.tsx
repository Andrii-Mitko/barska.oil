"use client";

import styles from "../analytics.module.css";

type ReferrerAnalytics = {
  referrerHostname: string;
  visitors: number;
  pageviews: number;
};

type ReferrersAnalyticsProps = {
  data: ReferrerAnalytics[];
};

const numberFormatter = new Intl.NumberFormat("uk-UA");

function getReferrerName(hostname: string) {
  if (!hostname) {
    return "Прямий перехід";
  }

  return hostname;
}

export default function ReferrersAnalytics({ data }: ReferrersAnalyticsProps) {
  const referrers = [...data].sort((a, b) => b.pageviews - a.pageviews);

  const totalPageviews = referrers.reduce(
    (total, referrer) => total + referrer.pageviews,
    0,
  );

  return (
    <section className={styles.analyticsCard}>
      <h2 className={styles.analyticsCardTitle}>Джерела переходів</h2>

      <p className={styles.analyticsCardDescription}>
        Звідки користувачі переходять на сайт
      </p>

      {referrers.length === 0 ? (
        <p className={styles.emptyState}>
          Даних про джерела переходів поки немає.
        </p>
      ) : (
        <div className={styles.analyticsList}>
          {referrers.map((referrer) => {
            const percentage =
              totalPageviews > 0
                ? (referrer.pageviews / totalPageviews) * 100
                : 0;

            return (
              <div
                key={referrer.referrerHostname || "direct"}
                className={styles.analyticsListItem}
              >
                <div className={styles.analyticsListMain}>
                  <span className={styles.analyticsListName}>
                    {getReferrerName(referrer.referrerHostname)}
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

                  <span>{numberFormatter.format(referrer.pageviews)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
