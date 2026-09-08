import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.stamp}>Власне виробництво · Бар</span>

        <h1 className={styles.title}>Барська Олія</h1>

        <p className={styles.subtitle}>
          Соняшникова та ріпакова олія власного виробництва — пресуємо в місті
          Бар на Вінниччині, без ГМО, за стандартом ДСТУ.
        </p>

        <div className={styles.actions}>
          <a className={styles.primaryButton} href="/catalog">
            Переглянути каталог
          </a>
          <a className={styles.secondaryButton} href="#about">
            Про нас
          </a>
        </div>
      </div>

      <div className={styles.imagePanel}>
        <Image
          src="/images/hero.webp"
          alt="Поле соняшника — сировина для олії Барська"
          fill
          priority
          sizes="(min-width: 900px) 45vw, 100vw"
          className={styles.image}
        />
      </div>
    </section>
  );
}
