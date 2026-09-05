"use client";

import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  fallbackHref: string;
  label?: string;
}

export default function BackButton({
  fallbackHref,
  label = "Назад",
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Якщо є історія переходів на сайті — повертаємось назад (зберігає фільтри каталогу).
    // Якщо користувач прийшов напряму (з Google, Telegram тощо) — ведемо на fallbackHref.
    const cameFromSameSite =
      typeof document !== "undefined" &&
      document.referrer.startsWith(window.location.origin);

    if (cameFromSameSite && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button type="button" className={styles.backButton} onClick={handleClick}>
      <span className={styles.arrow}>←</span> {label}
    </button>
  );
}
