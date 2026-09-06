import styles from "./TrustBar.module.css";

const badges = [
  { title: "ДСТУ 8175:2015", caption: "Державний стандарт якості" },
  { title: "Без ГМО", caption: "Перевірена сировина" },
  { title: "Extra Virgin", caption: "Холодного пресування, першого віджиму" },
  { title: "24 місяці", caption: "Термін зберігання, герметична тара" },
];

export default function TrustBar() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.row}`}>
        {badges.map((badge) => (
          <div key={badge.title} className={styles.item}>
            <span className={styles.itemTitle}>{badge.title}</span>
            <span className={styles.itemCaption}>{badge.caption}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
