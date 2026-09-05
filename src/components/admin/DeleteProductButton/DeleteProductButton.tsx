"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DeleteProductButton.module.css";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Видалити товар "${productName}"? Це незворотньо.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);

    await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });

    router.refresh();
  };

  return (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Видалення..." : "Видалити"}
    </button>
  );
}
