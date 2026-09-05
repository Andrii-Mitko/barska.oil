import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/models/Order";
import type { IOrder } from "@/types/order";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect/OrderStatusSelect";
import styles from "./orders.module.css";

export default async function AdminOrdersPage() {
  await connectToDatabase();

  const orders = (await Order.find()
    .sort({ createdAt: -1 })
    .lean()) as unknown as IOrder[];

  return (
    <div>
      <h1 className={styles.title}>Заявки ({orders.length})</h1>

      {orders.length === 0 ? (
        <p className={styles.empty}>Заявок поки немає.</p>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <div key={order._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.customerName}>
                  {order.customerName}
                </span>
                <span className={styles.date}>
                  {new Date(order.createdAt).toLocaleString("uk-UA")}
                </span>
              </div>

              <div className={styles.meta}>
                <span>
                  <span className={styles.metaLabel}>Телефон: </span>
                  {order.phone}
                </span>
                <span>
                  <span className={styles.metaLabel}>Куди: </span>
                  {order.deliveryAddress}
                </span>
              </div>

              <div className={styles.items}>
                {(order.items ?? []).map((item) => (
                  <div key={item.productSlug} className={styles.itemRow}>
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <span>{item.pricePerUnit * item.quantity} ₴</span>
                  </div>
                ))}
              </div>

              <div className={styles.footer}>
                <span className={styles.total}>{order.totalSum} ₴</span>
                <OrderStatusSelect
                  orderId={order._id}
                  currentStatus={order.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
