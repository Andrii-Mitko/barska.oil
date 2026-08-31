import Image from "next/image";
import Link from "next/link";

import type { IProduct } from "@/types/product";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log("SKU:", product.sku);
  console.log("IMAGES:", product.images);
  console.log("IMAGE 0:", product.images?.[0]);
  console.log("IMAGE 0 TYPE:", typeof product.images?.[0]);
  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, (max-width: 1199px) 33vw, 25vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>Немає зображення</div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>

        <span className={styles.volume}>{product.volumeMl} мл</span>

        <div className={styles.footer}>
          <span className={styles.price}>{product.price} ₴</span>

          <span
            className={product.inStock ? styles.inStock : styles.outOfStock}
          >
            {product.inStock ? "В наявності" : "Немає в наявності"}
          </span>
        </div>
      </div>
    </Link>
  );
}
