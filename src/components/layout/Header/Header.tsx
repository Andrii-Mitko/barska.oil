"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { totalItems } = useCart();

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

        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartLink}>
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>

          <a href="tel:+380677407135" className={styles.phoneButton}>
            +380 67 740 71 35
          </a>
        </div>
      </div>
    </header>
  );
}
