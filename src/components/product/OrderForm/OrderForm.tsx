"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderInput } from "@/validations/order.schema";
import styles from "./OrderForm.module.css";

interface OrderFormProps {
  productName: string;
  productSlug: string;
}

export default function OrderForm({
  productName,
  productSlug,
}: OrderFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productName,
      productSlug,
    },
  });

  const onSubmit = async (data: OrderInput) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Помилка відправки заявки");
      }

      setIsSuccess(true);
      reset({ productName, productSlug });
    } catch (error) {
      console.error(error);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.success}>
        Дякуємо! Заявку прийнято, ми зв&apos;яжемось з вами найближчим часом.
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="customerName">
          Ім&apos;я
        </label>
        <input
          id="customerName"
          className={styles.input}
          {...register("customerName")}
        />
        {errors.customerName && (
          <span className={styles.error}>{errors.customerName.message}</span>
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
        <label className={styles.label} htmlFor="comment">
          Коментар (необов&apos;язково)
        </label>
        <textarea
          id="comment"
          className={styles.textarea}
          {...register("comment")}
        />
      </div>

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Надсилаємо..." : "Залишити заявку"}
      </button>
    </form>
  );
}
