import Image from "next/image";
import { notFound } from "next/navigation";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Makukha } from "@/models/Makukha";
import type { IMakukha } from "@/types/makukha";
import AddToCart from "@/components/product/AddToCart/AddToCart";

import styles from "./makukha.module.css";

export default async function MakukhaPage() {
  await connectToDatabase();

  const makukha =
    (await Makukha.findOne().lean()) as unknown as IMakukha | null;

  if (!makukha) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <p className={styles.eyebrow}>Власне виробництво</p>

        <div className={styles.content}>
          <div>
            {makukha.image ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={makukha.image}
                  alt={makukha.name}
                  width={600}
                  height={600}
                  className={styles.image}
                  priority
                />
              </div>
            ) : (
              <div className={styles.noImage}>Фото товару відсутнє</div>
            )}
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>{makukha.name}</h1>

            {makukha.description && (
              <p className={styles.description}>{makukha.description}</p>
            )}

            <p
              className={`${styles.availability} ${
                makukha.inStock ? styles.available : styles.unavailable
              }`}
            >
              {makukha.inStock ? "В наявності" : "Немає в наявності"}
            </p>

            <p className={styles.unit}>за 1 кг</p>

            <AddToCart
              productSlug="makukha"
              productName={makukha.name}
              pricePerUnit={makukha.pricePerKg}
              inStock={makukha.inStock}
              image={makukha.image}
              unit="кг"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
