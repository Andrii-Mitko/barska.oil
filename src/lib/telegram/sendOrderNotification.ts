interface OrderNotificationInput {
  productName: string;
  customerName: string;
  phone: string;
  comment?: string;
}

export async function sendOrderNotification(
  input: OrderNotificationInput,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задані");
    return;
  }

  const text = [
    "🛒 Нова заявка",
    `Товар: ${input.productName}`,
    `Ім'я: ${input.customerName}`,
    `Телефон: ${input.phone}`,
    input.comment ? `Коментар: ${input.comment}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });
  } catch (error) {
    // Не блокуємо збереження заявки, якщо Telegram недоступний
    console.error("Помилка відправки в Telegram:", error);
  }
}
