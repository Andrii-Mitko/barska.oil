import type { JSX } from "react";

export default function BuyButton({
  productName,
  inStock,
}: {
  productName: string;
  inStock: boolean;
}): JSX.Element {
  const phone = "380677407135";
  const message = encodeURIComponent(
    `Доброго дня! Хочу замовити: ${productName}`,
  );
  const viberLink = `viber://chat?number=%2B${phone}&text=${message}`;
  const telLink = `tel:+${phone}`;

  if (!inStock) {
    return (
      <a
        href={telLink}
        className="block mt-6 text-center py-3 px-6 rounded-lg"
        style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
      >
        Уточнити наявність за телефоном
      </a>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <a
        href={viberLink}
        className="block text-center py-3 px-6 rounded-lg text-white"
        style={{ backgroundColor: "#7360f2" }}
      >
        Купити через Viber
      </a>
      <a
        href={telLink}
        className="block text-center py-3 px-6 rounded-lg"
        style={{ backgroundColor: "#16a34a", color: "#ffffff" }}
      >
        Купити за телефоном
      </a>
    </div>
  );
}
