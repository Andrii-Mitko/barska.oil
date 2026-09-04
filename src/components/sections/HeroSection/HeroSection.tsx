import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
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

        <p className={styles.subtitle}>Соняшникова олія власного виробництва</p>

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
  );
}
