import Image from "next/image";
import Link from "next/link";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Feed } from "@/models/Feed";
import type { IFeed } from "@/types/feed";

import styles from "./feed.module.css";

export default async function AdminFeedPage() {
  await connectToDatabase();

  const feeds = (await Feed.find()
    .sort({ sku: 1 })
    .lean()) as unknown as IFeed[];

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Комбікорм ({feeds.length})</h1>

        <Link href="/admin/feed/new" className={styles.addButton}>
          + Додати комбікорм
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва</th>
            <th>Виробник</th>
            <th>Вага</th>
            <th>Ціна</th>
            <th>Наявність</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {feeds.map((feed) => (
            <tr key={feed._id}>
              <td>
                {feed.images[0] && (
                  <Image
                    src={feed.images[0]}
                    alt={feed.name}
                    width={48}
                    height={48}
                    className={styles.thumb}
                  />
                )}
              </td>

              <td className={styles.name}>{feed.name}</td>

              <td>{feed.brand}</td>

              <td>{feed.weightKg} кг</td>

              <td className={styles.price}>{feed.price} ₴</td>

              <td>
                <span
                  className={feed.inStock ? styles.inStock : styles.outOfStock}
                >
                  {feed.inStock ? "В наявності" : "Немає"}
                </span>
              </td>

              <td>
                <Link
                  href={`/admin/feed/${feed._id}`}
                  className={styles.editLink}
                >
                  Редагувати
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
