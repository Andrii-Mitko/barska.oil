"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/types/order";
import styles from "./OrderStatusSelect.module.css";

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Нова",
  processed: "Оброблена",
  cancelled: "Скасована",
};

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as OrderStatus;
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(data?.error || "Не вдалося оновити статус заявки");
      }

      router.refresh();
    } catch (error) {
      console.error("Status update error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      className={`${styles.statusSelect} ${styles[currentStatus]}`}
      value={currentStatus}
      onChange={handleChange}
      disabled={isUpdating}
    >
      {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}
