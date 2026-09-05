export interface PriceTier {
  minQuantity: number;
  pricePerUnit: number;
}

// Ціни за штуку залежно від кількості — ключ: slug товару
export const PRICE_TIERS: Record<string, PriceTier[]> = {
  "oliya-sonyashnykova-rafinovana-1l": [
    { minQuantity: 1, pricePerUnit: 95 },
    { minQuantity: 10, pricePerUnit: 90 },
    { minQuantity: 20, pricePerUnit: 85 },
    { minQuantity: 30, pricePerUnit: 80 },
  ],
  "oliya-sonyashnykova-rafinovana-3l": [
    { minQuantity: 1, pricePerUnit: 265 },
    { minQuantity: 4, pricePerUnit: 250 },
    { minQuantity: 8, pricePerUnit: 235 },
    { minQuantity: 12, pricePerUnit: 225 },
  ],
  "oliya-sonyashnykova-rafinovana-5l": [
    { minQuantity: 1, pricePerUnit: 425 },
    { minQuantity: 3, pricePerUnit: 400 },
    { minQuantity: 6, pricePerUnit: 375 },
    { minQuantity: 9, pricePerUnit: 350 },
  ],
  "oliya-sonyashnykova-rafinovana-10l": [
    { minQuantity: 1, pricePerUnit: 810 },
    { minQuantity: 2, pricePerUnit: 770 },
    { minQuantity: 4, pricePerUnit: 730 },
    { minQuantity: 6, pricePerUnit: 690 },
  ],
  "oliya-sonyashnykova-holodnogo-presuvannya-1l": [
    { minQuantity: 1, pricePerUnit: 90 },
    { minQuantity: 10, pricePerUnit: 85 },
    { minQuantity: 20, pricePerUnit: 80 },
    { minQuantity: 30, pricePerUnit: 75 },
  ],
  "oliya-sonyashnykova-holodnogo-presuvannya-3l": [
    { minQuantity: 1, pricePerUnit: 255 },
    { minQuantity: 4, pricePerUnit: 240 },
    { minQuantity: 8, pricePerUnit: 225 },
    { minQuantity: 12, pricePerUnit: 215 },
  ],
  "oliya-sonyashnykova-holodnogo-presuvannya-5l": [
    { minQuantity: 1, pricePerUnit: 415 },
    { minQuantity: 3, pricePerUnit: 385 },
    { minQuantity: 6, pricePerUnit: 355 },
    { minQuantity: 9, pricePerUnit: 335 },
  ],
};

// Короткі позначення для компактного відображення (Telegram, чек)
export const SHORT_LABELS: Record<string, string> = {
  "oliya-sonyashnykova-rafinovana-1l": "1л раф.",
  "oliya-sonyashnykova-rafinovana-3l": "3л раф.",
  "oliya-sonyashnykova-rafinovana-4-5l": "4.5л раф.",
  "oliya-sonyashnykova-rafinovana-5l": "5л раф.",
  "oliya-sonyashnykova-rafinovana-10l": "10л раф.",
  "oliya-sonyashnykova-holodnogo-presuvannya-1l": "1л хол.",
  "oliya-sonyashnykova-holodnogo-presuvannya-3l": "3л хол.",
  "oliya-sonyashnykova-holodnogo-presuvannya-5l": "5л хол.",
};

export function getPriceTiers(slug: string): PriceTier[] | null {
  return PRICE_TIERS[slug] ?? null;
}

export function getShortLabel(slug: string, fallbackName: string): string {
  return SHORT_LABELS[slug] ?? fallbackName;
}

export function getUnitPrice(
  slug: string,
  quantity: number,
  fallbackPrice: number,
): number {
  const tiers = PRICE_TIERS[slug];
  if (!tiers) return fallbackPrice;

  const sorted = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);
  let price = fallbackPrice;

  for (const tier of sorted) {
    if (quantity >= tier.minQuantity) {
      price = tier.pricePerUnit;
    }
  }

  return price;
}

export function getNextTier(slug: string, quantity: number): PriceTier | null {
  const tiers = PRICE_TIERS[slug];
  if (!tiers) return null;

  const sorted = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);
  return sorted.find((tier) => quantity < tier.minQuantity) ?? null;
}

export function calculateLineTotal(
  slug: string,
  quantity: number,
  fallbackPrice: number,
): { unitPrice: number; total: number } {
  const unitPrice = getUnitPrice(slug, quantity, fallbackPrice);
  return { unitPrice, total: unitPrice * quantity };
}
