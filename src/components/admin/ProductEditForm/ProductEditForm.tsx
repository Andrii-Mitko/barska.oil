"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { IProduct } from "@/types/product";
import styles from "./ProductEditForm.module.css";

interface ProductEditFormProps {
  product: IProduct;
}

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();
  const [price, setPrice] = useState(product.price);
  const [inStock, setInStock] = useState(product.inStock);
  const [description, setDescription] = useState(product.description ?? "");
  const [images, setImages] = useState<string[]>(product.images);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImages([data.url]);
      }
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
      await fetch(`/api/admin/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, inStock, description, images }),
      });

      setIsSaved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Видалити товар "${product.name}"? Це незворотньо.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await fetch(`/api/admin/products/${product._id}`, {
        method: "DELETE",
      });

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>{product.name}</h1>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Видалення..." : "Видалити товар"}
        </button>
      </div>

      <div className={styles.readonlyRow}>
        <span>SKU: {product.sku}</span>
        <span>Об&apos;єм: {product.volumeMl} мл</span>
        <span>Slug: {product.slug}</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {images[0] && (
          <Image
            src={images[0]}
            alt={product.name}
            width={120}
            height={120}
            className={styles.imagePreview}
          />
        )}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="image">
            Фото товару
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
          <label className={styles.label} htmlFor="price">
            Ціна (₴)
          </label>
          <input
            id="price"
            type="number"
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
