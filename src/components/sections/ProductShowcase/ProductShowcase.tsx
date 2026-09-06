import Image from "next/image";
import styles from "./ProductShowcase.module.css";

export default function ProductShowcase() {
  return (
    <section className={styles.showcase}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/raf1.webp"
          alt="Преміум якість від Барської Олії — рафінована соняшникова олія"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <a href="/catalog" className={styles.cta}>
        Переглянути каталог
      </a>
    </section>
  );
}
