import styles from "./TrustBar.module.css";

const badges = [
  { title: "ДСТУ 4492:2005", caption: "Державний стандарт якості" },
  { title: "Без ГМО", caption: "Перевірена сировина" },
  { title: "Extra Virgin", caption: "Холодного пресування, першого віджиму" },
  {
    title: "18 / 12 місяців",
    caption: "Термін зберігання: рафінована / нерафінована",
  },
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
