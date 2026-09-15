"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { makukhaCreateSchema } from "@/validations/makukhaCreate.schema";

import styles from "./MakukhaCreateForm.module.css";

type MakukhaCreateFormValues = z.input<typeof makukhaCreateSchema>;

export default function MakukhaCreateForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MakukhaCreateFormValues>({
    resolver: zodResolver(makukhaCreateSchema),
    defaultValues: {
      name: "Соняшникова макуха",
      pricePerKg: 0,
      inStock: true,
      description: "",
    },
  });

  const onSubmit = async (data: MakukhaCreateFormValues) => {
    setServerError(null);

    try {
      const response = await fetch("/api/admin/makukha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.error ?? "Помилка створення макухи");
        return;
      }

      router.push("/admin/makukha");
      router.refresh();
    } catch (error) {
      console.error(error);
      setServerError("Помилка з'єднання з сервером");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {serverError && <div className={styles.error}>{serverError}</div>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Назва
        </label>

        <input id="name" className={styles.input} {...register("name")} />

        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="pricePerKg">
          Ціна за 1 кг (₴)
        </label>

        <input
          id="pricePerKg"
          type="number"
          min="0"
          step="1"
          className={styles.input}
          {...register("pricePerKg")}
        />

        {errors.pricePerKg && (
          <span className={styles.error}>{errors.pricePerKg.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="description">
          Опис
        </label>

        <textarea
          id="description"
          className={styles.textarea}
          {...register("description")}
        />

        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      <div className={styles.checkboxRow}>
        <input id="inStock" type="checkbox" {...register("inStock")} />

        <label htmlFor="inStock">В наявності</label>
      </div>

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Створення..." : "Створити макуху"}
      </button>
    </form>
  );
}
