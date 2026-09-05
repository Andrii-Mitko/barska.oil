import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import type { IProduct } from "@/types/product";
import ProductEditForm from "@/components/admin/ProductEditForm/ProductEditForm";

interface AdminProductEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProductEditPage({
  params,
}: AdminProductEditPageProps) {
  const { id } = await params;

  await connectToDatabase();

  const product = (await Product.findById(
    id,
  ).lean()) as unknown as IProduct | null;

  if (!product) {
    notFound();
  }

  return <ProductEditForm product={JSON.parse(JSON.stringify(product))} />;
}
