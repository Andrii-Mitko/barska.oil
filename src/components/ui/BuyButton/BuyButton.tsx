import styles from "./BuyButton.module.css";

interface BuyButtonProps {
  productName: string;
  inStock: boolean;
}

export default function BuyButton({ productName, inStock }: BuyButtonProps) {
  if (!inStock) {
    return null;
  }

  const phone = "380677407135";

  const message = encodeURIComponent(
    `Доброго дня! Хочу замовити: ${productName}`,
  );

  const viberLink = `viber://chat?number=%2B${phone}&text=${message}`;
  const telLink = `tel:+${phone}`;

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
