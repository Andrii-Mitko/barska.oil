import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Барська Олія"
            width={677}
            height={369}
            priority
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Головна
          </Link>

          <Link href="/catalog" className={styles.navLink}>
            Каталог
          </Link>

          <Link href="/#about" className={styles.navLink}>
            Про нас
          </Link>

          <Link href="/#contacts" className={styles.navLink}>
            Контакти
          </Link>
        </nav>

        <a href="tel:+380677407135" className={styles.phoneButton}>
          +380 67 740 71 35
        </a>
      </div>
    </header>
  );
}
