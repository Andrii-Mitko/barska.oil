import Image from "next/image";
import Link from "next/link";

import type { IProduct } from "@/types/product";
import { getPriceTiers } from "@/lib/pricing/priceTiers";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const priceTiers = getPriceTiers(product.slug);
  const lowestPrice = priceTiers?.[priceTiers.length - 1]?.pricePerUnit;

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

        {product.inStock && lowestPrice && (
          <span className={styles.priceBadge}>від {lowestPrice} ₴/шт</span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>

        <span className={styles.volume}>{product.volumeMl} мл</span>

        {product.inStock && priceTiers ? (
          <ul className={styles.priceTiers}>
            {priceTiers.map((tier, index) => {
              const nextTier = priceTiers[index + 1];
              const rangeLabel = nextTier
                ? tier.minQuantity === 1
                  ? `за 1 шт`
                  : `від ${tier.minQuantity} шт`
                : `від ${tier.minQuantity} шт і більше`;

              return (
                <li key={tier.minQuantity} className={styles.priceTierRow}>
                  <span className={styles.priceTierLabel}>{rangeLabel}</span>
                  <span className={styles.priceTierValue}>
                    {tier.pricePerUnit} ₴
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.footer}>
            <span className={styles.price}>{product.price} ₴</span>
          </div>
        )}

        <div className={styles.status}>
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
