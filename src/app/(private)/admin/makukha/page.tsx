// src/app/(private)/admin/makukha/page.tsx
import Link from "next/link";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Makukha } from "@/models/Makukha";
import type { IMakukha } from "@/types/makukha";

import styles from "./makukha.module.css";

export default async function AdminMakukhaPage() {
  await connectToDatabase();

  const makukha =
    (await Makukha.findOne().lean()) as unknown as IMakukha | null;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Соняшникова макуха</h1>

        {!makukha && (
          <Link href="/admin/makukha/new" className={styles.addButton}>
            + Додати макуху
          </Link>
        )}
      </div>

      {makukha ? (
        <div className={styles.card}>
          <div>
            <h2 className={styles.name}>{makukha.name}</h2>

            <p className={styles.price}>{makukha.pricePerKg} ₴ / кг</p>

            <p className={makukha.inStock ? styles.inStock : styles.outOfStock}>
              {makukha.inStock ? "В наявності" : "Немає в наявності"}
            </p>
          </div>

          <Link
            href={`/admin/makukha/${makukha._id}`}
            className={styles.editLink}
          >
            Редагувати
          </Link>
        </div>
      ) : (
        <p className={styles.empty}>Макуху ще не додано.</p>
      )}
    </div>
  );
}
