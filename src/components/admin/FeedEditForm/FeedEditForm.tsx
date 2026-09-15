"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import type { IFeed } from "@/types/feed";

import styles from "./FeedEditForm.module.css";

interface FeedEditFormProps {
  feed: IFeed;
}

export default function FeedEditForm({ feed }: FeedEditFormProps) {
  const router = useRouter();

  const [price, setPrice] = useState(feed.price);
  const [weightKg, setWeightKg] = useState(feed.weightKg);
  const [formula, setFormula] = useState(feed.formula);
  const [inStock, setInStock] = useState(feed.inStock);
  const [description, setDescription] = useState(feed.description ?? "");
  const [images, setImages] = useState<string[]>(feed.images);

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setIsSaved(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error ?? "Помилка завантаження");
        return;
      }

      setImages([data.url]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSaving(true);
    setIsSaved(false);

    try {
      const response = await fetch(`/api/admin/feed/${feed._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price,
          weightKg,
          formula,
          inStock,
          description,
          images,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        console.error(data.error ?? "Помилка збереження");
        return;
      }

      setIsSaved(true);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Видалити комбікорм "${feed.name}"? Це незворотньо.`,
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/feed/${feed._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();

        console.error(data.error ?? "Помилка видалення");
        return;
      }

      router.push("/admin/feed");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>{feed.name}</h1>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Видалення..." : "Видалити комбікорм"}
        </button>
      </div>

      <div className={styles.readonlyRow}>
        <span>Артикул: {feed.sku}</span>
        <span>Виробник: {feed.brand}</span>
        <span>Slug: {feed.slug}</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {images[0] && (
          <Image
            src={images[0]}
            alt={feed.name}
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
            disabled={isUploading}
          />

          {isUploading && (
            <span className={styles.uploading}>Завантаження...</span>
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
            value={weightKg}
            onChange={(event) => setWeightKg(Number(event.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="formula">
            Рецептура
          </label>

          <input
            id="formula"
            className={styles.input}
            value={formula}
            onChange={(event) => setFormula(event.target.value)}
          />
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
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            Опис
          </label>

          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className={styles.checkboxRow}>
          <input
            id="inStock"
            type="checkbox"
            checked={inStock}
            onChange={(event) => setInStock(event.target.checked)}
          />

          <label htmlFor="inStock">В наявності</label>
        </div>

        {isSaved && <div className={styles.success}>Збережено ✓</div>}

        <button className={styles.submit} type="submit" disabled={isSaving}>
          {isSaving ? "Збереження..." : "Зберегти"}
        </button>
      </form>
    </div>
  );
}
