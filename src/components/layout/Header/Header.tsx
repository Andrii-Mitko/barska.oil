"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
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
          <Link href="/cart" className={styles.cartLink} onClick={closeMenu}>
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>

          <a
            href="tel:+380677407135"
            className={styles.phoneButton}
            onClick={closeMenu}
          >
            +380 67 740 71 35
          </a>

          <button
            type="button"
            className={styles.burgerButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileNavLink} onClick={closeMenu}>
            Головна
          </Link>
          <Link
            href="/catalog"
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            Каталог
          </Link>
          <Link
            href="/#about"
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            Про нас
          </Link>
          <Link
            href="/#contacts"
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            Контакти
          </Link>
        </div>
      )}
    </header>
  );
}
