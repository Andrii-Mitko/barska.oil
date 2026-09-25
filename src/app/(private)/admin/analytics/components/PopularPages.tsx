"use client";

import styles from "../analytics.module.css";

type PageAnalytics = {
  requestPath: string;
  visitors: number;
  pageviews: number;
};

type PopularPagesProps = {
  data: PageAnalytics[];
};

const numberFormatter = new Intl.NumberFormat("uk-UA");

function getPageName(path: string) {
  if (path === "/") {
    return "Головна";
  }

  if (path === "/catalog") {
    return "Каталог";
  }

  if (path.startsWith("/product/")) {
    return "Сторінка товару";
  }

  return path;
}

export default function PopularPages({ data }: PopularPagesProps) {
  const pages = [...data]
    .sort((a, b) => b.pageviews - a.pageviews)
    .slice(0, 10);

  return (
    <section className={styles.analyticsCard}>
      <div className={styles.analyticsCardHeader}>
        <div>
          <h2 className={styles.analyticsCardTitle}>Популярні сторінки</h2>

          <p className={styles.analyticsCardDescription}>
            Сторінки з найбільшою кількістю переглядів
          </p>
        </div>
      </div>

      {pages.length === 0 ? (
        <p className={styles.emptyState}>Даних про сторінки поки немає.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Сторінка</th>
                <th>Відвідувачі</th>
                <th>Перегляди</th>
              </tr>
            </thead>

            <tbody>
              {pages.map((page) => (
                <tr key={page.requestPath}>
                  <td>
                    <div className={styles.pageCell}>
                      <span className={styles.pageName}>
                        {getPageName(page.requestPath)}
                      </span>

                      <span className={styles.pagePath}>
                        {page.requestPath}
                      </span>
                    </div>
                  </td>

                  <td>{numberFormatter.format(page.visitors)}</td>

                  <td>{numberFormatter.format(page.pageviews)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
