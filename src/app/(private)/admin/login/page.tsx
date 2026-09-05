"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Помилка входу");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Помилка з'єднання");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вхід в адмінку</h1>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="login">
            Логін
          </label>
          <input
            id="login"
            className={styles.input}
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            autoComplete="username"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}
