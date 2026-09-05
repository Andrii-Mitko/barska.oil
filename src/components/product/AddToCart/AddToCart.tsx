"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
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
      <p className={styles.currentPrice}>{pricePerUnit} ₴/шт</p>

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
          {isAdded ? "Додано ✓" : "Додати в кошик"}
        </button>
      </div>

      <p className={styles.totalPrice}>
        Разом: <strong>{pricePerUnit * quantity} ₴</strong>
      </p>
    </div>
  );
}
