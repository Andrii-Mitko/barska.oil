import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Feed } from "@/models/Feed";
import type { IFeed } from "@/types/feed";

import styles from "./feed.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Комбікорм",
  description:
    "Комбікорм від Барської Олії — якісні кормові суміші для сільськогосподарських тварин та птиці.",
};

export default async function FeedPage() {
  await connectToDatabase();

  const feeds = (await Feed.find()
    .sort({ createdAt: -1 })
    .lean()) as unknown as IFeed[];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>БАРСЬКА ОЛІЯ</p>

          <h1 className={styles.title}>Комбікорм</h1>

          <p className={styles.description}>
            Кормові суміші для сільськогосподарських тварин та птиці.
          </p>
        </header>

        {feeds.length > 0 ? (
          <div className={styles.grid}>
            {feeds.map((feed) => (
              <article key={feed._id} className={styles.card}>
                <Link href={`/feed/${feed.slug}`} className={styles.imageLink}>
                  <div className={styles.imageWrapper}>
                    {feed.images[0] ? (
                      <Image
                        src={feed.images[0]}
                        alt={feed.name}
                        fill
                        sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 33vw"
                        className={styles.image}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        Фото товару відсутнє
                      </div>
                    )}
                  </div>
                </Link>

                <div className={styles.content}>
                  <p className={styles.brand}>{feed.brand}</p>

                  <h2 className={styles.name}>
                    <Link href={`/feed/${feed.slug}`}>{feed.name}</Link>
                  </h2>

                  <p className={styles.weight}>{feed.weightKg} кг</p>

                  <div className={styles.bottom}>
                    <p className={styles.price}>{feed.price} ₴</p>

                    <span
                      className={
                        feed.inStock ? styles.inStock : styles.outOfStock
                      }
                    >
                      {feed.inStock ? "В наявності" : "Немає в наявності"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Комбікорму поки немає в наявності.</p>
        )}
      </div>
    </main>
  );
}
