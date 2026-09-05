"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/context/CartContext";
import {
  checkoutSchema,
  type CheckoutInput,
} from "@/validations/checkout.schema";
import styles from "./cart.module.css";
import { calculateLineTotal } from "@/lib/pricing/priceTiers";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalSum, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutInput) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            productSlug: item.productSlug,
            productName: item.productName,
            quantity: item.quantity,
            pricePerUnit: item.pricePerUnit,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Помилка відправки заявки");
      }

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error(error);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.success}>
            Дякуємо! Заявку прийнято, ми зв&apos;яжемось з вами найближчим
            часом.
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container">
          <p className={styles.empty}>Кошик порожній.</p>
          <Link href="/catalog" className={styles.backLink}>
            Перейти до каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Кошик</h1>

        <div className={styles.list}>
          {items.map((item) => {
            const { unitPrice, total } = calculateLineTotal(
              item.productSlug,
              item.quantity,
              item.pricePerUnit,
            );

            return (
              <div key={item.productSlug} className={styles.item}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.productName}</p>
                  <p className={styles.itemMeta}>{unitPrice} ₴/шт</p>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      onClick={() =>
                        updateQuantity(
                          item.productSlug,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      onClick={() =>
                        updateQuantity(item.productSlug, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className={styles.subtotal}>{total} ₴</p>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeItem(item.productSlug)}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className={styles.total}>Разом: {totalSum} ₴</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="customerName">
              ФІО
            </label>
            <input
              id="customerName"
              className={styles.input}
              {...register("customerName")}
            />
            {errors.customerName && (
              <span className={styles.error}>
                {errors.customerName.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">
              Телефон
            </label>
            <input
              id="phone"
              className={styles.input}
              type="tel"
              placeholder="+380"
              {...register("phone")}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="deliveryAddress">
              Куди відправити (місто, відділення Нової Пошти)
            </label>
            <input
              id="deliveryAddress"
              className={styles.input}
              placeholder="м. Вінниця, відділення №5"
              {...register("deliveryAddress")}
            />
            {errors.deliveryAddress && (
              <span className={styles.error}>
                {errors.deliveryAddress.message}
              </span>
            )}
          </div>

          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Надсилаємо..." : "Оформити замовлення"}
          </button>
        </form>
      </div>
    </div>
  );
}
