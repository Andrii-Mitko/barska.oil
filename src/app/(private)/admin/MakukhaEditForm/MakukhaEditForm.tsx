"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import type { IMakukha } from "@/types/makukha";

import styles from "./MakukhaEditForm.module.css";

interface MakukhaEditFormProps {
  makukha: IMakukha;
}

export default function MakukhaEditForm({ makukha }: MakukhaEditFormProps) {
  const router = useRouter();

  const [name, setName] = useState(makukha.name);
  const [pricePerKg, setPricePerKg] = useState(makukha.pricePerKg);
  const [inStock, setInStock] = useState(makukha.inStock);
  const [description, setDescription] = useState(makukha.description ?? "");
  const [image, setImage] = useState(makukha.image ?? "");

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

      setImage(data.url);
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
      const response = await fetch(`/api/admin/makukha/${makukha._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          pricePerKg,
          inStock,
          image,
          description,
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

  return (
    <div>
      <h1 className={styles.title}>{makukha.name}</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {image && (
          <Image
            src={image}
            alt={name}
            width={240}
            height={240}
            className={styles.imagePreview}
          />
        )}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="image">
            Фото макухи
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
          <label className={styles.label} htmlFor="name">
            Назва
          </label>

          <input
            id="name"
            className={styles.input}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
            value={pricePerKg}
            onChange={(event) => setPricePerKg(Number(event.target.value))}
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

        <button
          className={styles.submit}
          type="submit"
          disabled={isSaving || isUploading}
        >
          {isSaving ? "Збереження..." : "Зберегти"}
        </button>
      </form>
    </div>
  );
}
