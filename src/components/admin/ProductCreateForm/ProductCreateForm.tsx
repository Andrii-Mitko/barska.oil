"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { productCreateSchema } from "@/validations/productCreate.schema";
import styles from "./ProductCreateForm.module.css";

type ProductCreateFormValues = z.input<typeof productCreateSchema>;

interface CategoryOption {
  _id: string;
  name: string;
}

export default function ProductCreateForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: { inStock: true, pressType: "refined" },
  });

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories ?? []));
  }, []);

  const onSubmit = async (data: ProductCreateFormValues) => {
    setServerError(null);

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      setServerError(result.error ?? "Помилка створення товару");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {serverError && <span className={styles.error}>{serverError}</span>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="sku">
          SKU
        </label>
        <input id="sku" className={styles.input} {...register("sku")} />
        {errors.sku && (
          <span className={styles.error}>{errors.sku.message}</span>
        )}
      </div>

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
        <label className={styles.label} htmlFor="slug">
          Slug (латиницею, для URL)
        </label>
        <input
          id="slug"
          className={styles.input}
          placeholder="oliya-sonyashnykova-rafinovana-1l"
          {...register("slug")}
        />
        {errors.slug && (
          <span className={styles.error}>{errors.slug.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="category">
          Категорія
        </label>
        <select
          id="category"
          className={styles.select}
          {...register("category")}
        >
          <option value="">Оберіть категорію</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className={styles.error}>{errors.category.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="pressType">
          Тип обробки
        </label>
        <select
          id="pressType"
          className={styles.select}
          {...register("pressType")}
        >
          <option value="refined">Рафінована</option>
          <option value="cold-pressed">Холодного пресування</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="volumeMl">
          Об&apos;єм (мл)
        </label>
        <input
          id="volumeMl"
          type="number"
          className={styles.input}
          {...register("volumeMl")}
        />
        {errors.volumeMl && (
          <span className={styles.error}>{errors.volumeMl.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="price">
          Базова ціна (₴)
        </label>
        <input
          id="price"
          type="number"
          className={styles.input}
          {...register("price")}
        />
        {errors.price && (
          <span className={styles.error}>{errors.price.message}</span>
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
      </div>

      <div className={styles.checkboxRow}>
        <input id="inStock" type="checkbox" {...register("inStock")} />
        <label htmlFor="inStock">В наявності</label>
      </div>

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Створення..." : "Створити товар"}
      </button>
    </form>
  );
}
