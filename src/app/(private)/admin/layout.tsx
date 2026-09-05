import AdminNav from "./AdminNav";
import styles from "./admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <AdminNav />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
