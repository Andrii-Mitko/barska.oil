import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/production.webp"
          alt="Виробництво Барської Олії"
          fill
          priority
          sizes="100vw"
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ВЛАСНЕ ВИРОБНИЦТВО · БАР</p>

          <h1 className={styles.title}>Барська Олія</h1>

          <p className={styles.subtitle}>
            Соняшникова олія власного виробництва
          </p>

          <div className={styles.actions}>
            <a className={styles.primaryButton} href="/catalog">
              Переглянути продукцію
            </a>

            <a className={styles.secondaryButton} href="#about">
              Про нас
            </a>
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.container}>
          <p className={styles.sectionEyebrow}>БАРСЬКА ОЛІЯ</p>

          <h2 className={styles.sectionTitle}>Виробляємо соняшникову олію</h2>

          <p className={styles.sectionText}>
            Працюємо у місті Бар та виробляємо соняшникову олію для наших
            покупців. Якість продукції та відповідальне ставлення до своєї
            справи — основа нашої роботи.
          </p>

          <a className={styles.textLink} href="/catalog">
            Перейти до каталогу →
          </a>
        </div>
      </section>

      <section className={styles.products}>
        <div className={styles.container}>
          <p className={styles.sectionEyebrow}>НАША ПРОДУКЦІЯ</p>

          <h2 className={styles.sectionTitle}>Соняшникова олія</h2>

          <div className={styles.productTypes}>
            <article className={styles.productType}>
              <h3>Рафінована</h3>
              <p>
                Чиста соняшникова олія для щоденного використання та
                приготування їжі.
              </p>
            </article>

            <article className={styles.productType}>
              <h3>Холодного пресування</h3>
              <p>
                Олія, виготовлена методом холодного пресування насіння
                соняшнику.
              </p>
            </article>
          </div>

          <a className={styles.primaryButton} href="/catalog">
            Переглянути всі товари
          </a>
        </div>
      </section>
    </div>
  );
}
