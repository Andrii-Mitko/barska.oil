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

    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setIsUpdating(false);
    router.refresh();
  };

  return (
    <select
      className={styles.statusSelect}
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
