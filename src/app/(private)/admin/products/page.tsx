import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import type { IProduct } from "@/types/product";

import styles from "./products.module.css";

export default async function AdminProductsPage() {
  await connectToDatabase();

  const products = (await Product.find()
    .sort({ sku: 1 })
    .lean()) as unknown as IProduct[];

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Товари ({products.length})</h1>
        <Link href="/admin/products/new" className={styles.addButton}>
          + Додати товар
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва</th>
            <th>SKU</th>
            <th>Ціна</th>
            <th>Наявність</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={48}
                    height={48}
                    className={styles.thumb}
                  />
                )}
              </td>
              <td className={styles.name}>{product.name}</td>
              <td>{product.sku}</td>
              <td className={styles.price}>{product.price} ₴</td>
              <td>
                <span
                  className={
                    product.inStock ? styles.inStock : styles.outOfStock
                  }
                >
                  {product.inStock ? "В наявності" : "Немає"}
                </span>
              </td>
              <td style={{ display: "flex", gap: 12 }}>
                <Link
                  href={`/admin/products/${product._id}`}
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
