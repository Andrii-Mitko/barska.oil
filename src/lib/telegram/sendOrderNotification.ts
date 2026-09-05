interface OrderNotificationItem {
  productSlug: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
}

interface OrderNotificationInput {
  customerName: string;
  phone: string;
  deliveryAddress: string;
  items: OrderNotificationItem[];
  totalSum: number;
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

  const itemsList = input.items
    .map(
      (item) =>
        `${item.productName} ${item.quantity}шт*${item.pricePerUnit}грн`,
    )
    .join("\n");

  const text = [
    "🛒 Нова заявка",
    `👤 ${input.customerName}`,
    `📞 ${input.phone}`,
    `📦 ${input.deliveryAddress}`,
    "——",
    itemsList,
    "——",
    `Всього: ${input.totalSum} грн`,
  ].join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (error) {
    console.error("Помилка відправки в Telegram:", error);
  }
}
