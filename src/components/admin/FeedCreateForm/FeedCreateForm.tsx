"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { feedCreateSchema } from "@/validations/feedCreate.schema";

import styles from "./FeedCreateForm.module.css";

type FeedCreateFormValues = z.input<typeof feedCreateSchema>;

export default function FeedCreateForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedCreateFormValues>({
    resolver: zodResolver(feedCreateSchema),
    defaultValues: {
      inStock: true,
      images: [],
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setServerError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error ?? "Помилка завантаження фото");
        return;
      }

      setImages([data.url]);
    } catch (error) {
      console.error(error);
      setServerError("Помилка завантаження фото");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: FeedCreateFormValues) => {
    setServerError(null);

    const response = await fetch("/api/admin/feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        images,
      }),
    });

    if (!response.ok) {
      const result = await response.json();

      setServerError(result.error ?? "Помилка створення комбікорму");
      return;
    }

    router.push("/admin/feed");
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {serverError && <span className={styles.error}>{serverError}</span>}

      {images[0] && (
        <Image
          src={images[0]}
          alt="Фото комбікорму"
          width={120}
          height={120}
          className={styles.imagePreview}
        />
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="image">
          Фото комбікорму
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleFileChange}
          disabled={isUploading || isSubmitting}
        />

        {isUploading && (
          <span className={styles.uploading}>Завантаження...</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="sku">
          Артикул
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
        <label className={styles.label} htmlFor="brand">
          Виробник
        </label>

        <input
          id="brand"
          className={styles.input}
          placeholder="Житомель"
          {...register("brand")}
        />

        {errors.brand && (
          <span className={styles.error}>{errors.brand.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="weightKg">
          Вага (кг)
        </label>

        <input
          id="weightKg"
          type="number"
          min="0.1"
          step="0.1"
          className={styles.input}
          {...register("weightKg")}
        />

        {errors.weightKg && (
          <span className={styles.error}>{errors.weightKg.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="formula">
          Рецептура
        </label>

        <input
          id="formula"
          className={styles.input}
          placeholder="31-26/26 гр/кр"
          {...register("formula")}
        />

        {errors.formula && (
          <span className={styles.error}>{errors.formula.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="price">
          Ціна (₴)
        </label>

        <input
          id="price"
          type="number"
          min="0"
          step="1"
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

        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      <div className={styles.checkboxRow}>
        <input id="inStock" type="checkbox" {...register("inStock")} />

        <label htmlFor="inStock">В наявності</label>
      </div>

      <button
        className={styles.submit}
        type="submit"
        disabled={isSubmitting || isUploading}
      >
        {isSubmitting ? "Створення..." : "Створити комбікорм"}
      </button>
    </form>
  );
}