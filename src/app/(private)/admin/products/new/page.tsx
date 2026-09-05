import ProductCreateForm from "@/components/admin/ProductCreateForm/ProductCreateForm";

export default function AdminProductNewPage() {
  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Новий товар</h1>
      <ProductCreateForm />
    </div>
  );
}
