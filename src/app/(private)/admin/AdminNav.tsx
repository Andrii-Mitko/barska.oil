"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./admin.module.css";
import Image from "next/image";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className={styles.topbar}>
      <nav className={styles.nav}>
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
        <h3>Адміністрування</h3>
        <Link
          href="/admin/orders"
          className={`${styles.navLink} ${
            pathname.startsWith("/admin/orders") ? styles.navLinkActive : ""
          }`}
        >
          Заявки
        </Link>
        <Link
          href="/admin/products"
          className={`${styles.navLink} ${
            pathname.startsWith("/admin/products") ? styles.navLinkActive : ""
          }`}
        >
          Товари
        </Link>
      </nav>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Вийти
      </button>
    </div>
  );
}
