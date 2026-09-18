"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./CatalogControls.module.css";

const SORT_OPTIONS = [
  { value: "new", label: "Спочатку нові" },
  { value: "price-asc", label: "Дешевші спочатку" },
  { value: "price-desc", label: "Дорожчі спочатку" },
];

// 1000 → "1 л", 4500 → "4.5 л"
function formatVolume(volumeMl: number): string {
  const liters = volumeMl / 1000;
  return `${Number.isInteger(liters) ? liters : liters.toFixed(1)} л`;
}

interface CatalogControlsProps {
  availableVolumes: number[];
}

export default function CatalogControls({
  availableVolumes,
}: CatalogControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // невелика затримка, щоб не смикати запит на кожен символ
    debounceRef.current = setTimeout(() => {
      updateParams({ q: value || null });
    }, 400);
  };

  return (
    <div className={styles.controls}>
      <input
        type="search"
        value={query}
        onChange={(event) => handleSearchChange(event.target.value)}
        placeholder="Пошук за назвою..."
        className={styles.search}
        aria-label="Пошук товарів"
      />

      <select
        value={searchParams.get("sort") ?? "new"}
        onChange={(event) => updateParams({ sort: event.target.value })}
        className={styles.sort}
        aria-label="Сортування"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {availableVolumes.length > 0 && (
        <select
          value={searchParams.get("volume") ?? ""}
          onChange={(event) =>
            updateParams({ volume: event.target.value || null })
          }
          className={styles.sort}
          aria-label="Об'єм"
        >
          <option value="">Будь-який об&apos;єм</option>

          {availableVolumes.map((volumeMl) => (
            <option key={volumeMl} value={volumeMl}>
              {formatVolume(volumeMl)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
