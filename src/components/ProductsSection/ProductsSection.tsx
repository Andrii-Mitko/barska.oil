import styles from "./ProductsSection.module.css";

export default function ProductsSection() {
  return (
    <section className={styles.products}>
      <div className="container">
        <p className={styles.sectionEyebrow}>НАША ПРОДУКЦІЯ</p>

        <h2 className={styles.sectionTitle}>Соняшникова олія</h2>

        <div className={styles.productTypes}>
          <article className={styles.productType}>
            <h3>Рафінована</h3>
            <p>
              Чиста соняшникова олія для щоденного використання та приготування
              їжі.
            </p>
          </article>

          <article className={styles.productType}>
            <h3>Холодного віджиму</h3>
            <p>
              Олія, виготовлена методом холодного віджиму насіння соняшника.
            </p>
          </article>
        </div>

        <a className={styles.primaryButton} href="/catalog">
          Переглянути всі товари
        </a>
      </div>
    </section>
  );
}
