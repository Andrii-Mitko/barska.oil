import { Wheat, Package } from "lucide-react";
import styles from "./FarmSupply.module.css";

export default function FarmSupply() {
  return (
    <section className={styles.section}>
      <div className="container">
        <span className={styles.eyebrow}>Для фермерів та посередників</span>
        <h2 className={styles.title}>Приймаємо насіння, продаємо макуху</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Wheat className={styles.icon} size={32} />
            <h3 className={styles.cardTitle}>Приймаємо насіння соняшника</h3>
            <p className={styles.cardText}>
              Співпрацюємо з фермерами та посередниками — приймаємо соняшник на
              переробку на власних потужностях у м. Бар.
            </p>
          </div>

          <div className={styles.card}>
            <Package className={styles.icon} size={32} />
            <h3 className={styles.cardTitle}>Продаємо соняшникову макуху</h3>
            <p className={styles.cardText}>
              Макуха завжди в наявності після пресування — якісний білковий корм
              для тваринництва.
            </p>
          </div>
        </div>

        <a href="tel:+380677407135" className={styles.contactLink}>
          Обговорити співпрацю: +380 67 740 71 35
        </a>
      </div>
    </section>
  );
}
