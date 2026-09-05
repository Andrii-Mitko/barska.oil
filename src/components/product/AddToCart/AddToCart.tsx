"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getUnitPrice, getNextTier } from "@/lib/pricing/priceTiers";
import styles from "./AddToCart.module.css";

interface AddToCartProps {
  productSlug: string;
  productName: string;
  pricePerUnit: number;
  inStock: boolean;
  image?: string;
}

export default function AddToCart({
  productSlug,
  productName,
  pricePerUnit,
  inStock,
  image,
}: AddToCartProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const currentUnitPrice = getUnitPrice(productSlug, quantity, pricePerUnit);
  const nextTier = getNextTier(productSlug, quantity);

  const handleAdd = () => {
    addItem({ productSlug, productName, pricePerUnit, quantity, image });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (!inStock) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.outOfStock}>Товар тимчасово відсутній</p>
        <a href="tel:+380677407135" className={styles.outOfStockCall}>
          Уточнити появу за телефоном
        </a>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.currentPrice}>{currentUnitPrice} ₴/шт</p>

      {nextTier && (
        <p className={styles.discountHint}>
          Від {nextTier.minQuantity} шт — {nextTier.pricePerUnit} ₴/шт
        </p>
      )}

      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
          >
            −
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => setQuantity((qty) => qty + 1)}
          >
            +
          </button>
        </div>

        <button type="button" className={styles.addButton} onClick={handleAdd}>
          {isAdded ? "Додано ✓" : `Додати до кошика за ${currentUnitPrice} ₴`}
        </button>
      </div>
    </div>
  );
}
