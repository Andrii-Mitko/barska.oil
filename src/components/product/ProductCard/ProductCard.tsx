import Image from "next/image";
import Link from "next/link";

import type { IProduct } from "@/types/product";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: IProduct;
}

function formatVolume(volumeMl: number): string {
  const liters = volumeMl / 1000;
  return `${liters % 1 === 0 ? liters : liters.toFixed(1)} Л`;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <span className={styles.volumeSeal}>
          {formatVolume(product.volumeMl)}
        </span>

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

        {!product.inStock && (
          <div className={styles.outOfStockOverlay}>
            <span className={styles.outOfStockLabel}>Тимчасово немає</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.footer}>
          <span className={styles.price}>{product.price} ₴</span>
          <span className={styles.priceCaption}>за пляшку</span>
        </div>
      </div>
    </Link>
  );
}
