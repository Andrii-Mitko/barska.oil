import styles from "./BuyButton.module.css";

interface BuyButtonProps {
  productName: string;
  inStock: boolean;
}

export default function BuyButton({ productName, inStock }: BuyButtonProps) {
  const phone = "380677407135";

  const message = encodeURIComponent(
    `Доброго дня! Хочу замовити: ${productName}`,
  );

  const viberLink = `viber://chat?number=%2B${phone}&text=${message}`;
  const telLink = `tel:+${phone}`;

  if (!inStock) {
    return (
      <a href={telLink} className={styles.outOfStockButton}>
        Уточнити наявність за телефоном
      </a>
    );
  }

  return (
    <div className={styles.buttons}>
      <a href={viberLink} className={styles.viberButton}>
        Купити через Viber
      </a>

      <a href={telLink} className={styles.phoneButton}>
        Купити за телефоном
      </a>
    </div>
  );
}
