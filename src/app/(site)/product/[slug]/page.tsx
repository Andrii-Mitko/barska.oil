import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BackButton from "@/components/ui/BackButton/BackButton";
import BuyButton from "@/components/ui/BuyButton/BuyButton";
import AddToCart from "@/components/product/AddToCart/AddToCart";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import type { ICategory } from "@/types/category";
import type { IProduct } from "@/types/product";
import styles from "./product.module.css";
export const dynamic = "force-dynamic";
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const product = (await Product.findOne({
    slug,
  }).lean()) as unknown as IProduct | null;
  if (!product) {
    return {
      title: "Товар не знайдено",
      robots: { index: false, follow: false },
    };
  }
  const description =
    product.description?.trim() ||
    `${product.name} — ${product.price} ₴. Доставка Новою Поштою по Україні.`;
  const image = product.images[0];
  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url: `/product/${product.slug}`,
      siteName: "Барська Олія",
      locale: "uk_UA",
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  await connectToDatabase();
  const product = (await Product.findOne({ slug })
    .populate("category")
    .lean()) as unknown as (IProduct & { category: ICategory }) | null;
  if (!product) {
    notFound();
  }
  return (
    <main className={styles.productPage}>
      {" "}
      <div className={styles.container}>
        {" "}
        <BackButton fallbackHref="/catalog" label="Назад до каталогу" />{" "}
        <div className={styles.product}>
          {" "}
          <div className={styles.imageWrapper}>
            {" "}
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                {" "}
                Зображення товару відсутнє{" "}
              </div>
            )}{" "}
          </div>{" "}
          <div className={styles.info}>
            {" "}
            <p className={styles.category}>{product.category.name}</p>{" "}
            <h1 className={styles.title}>{product.name}</h1>{" "}
            <p className={styles.volume}>{product.volumeMl} мл</p>{" "}
            <p className={styles.price}>{product.price} ₴</p>{" "}
            <div className={styles.stock}>
              {" "}
              {product.inStock ? (
                <span className={styles.inStock}>Готово до відправки</span>
              ) : (
                <span className={styles.outOfStock}> Немає в наявності </span>
              )}{" "}
            </div>{" "}
            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}{" "}
            <div className={styles.buy}>
              {" "}
              <BuyButton
                productName={product.name}
                inStock={product.inStock}
              />{" "}
            </div>{" "}
            <div className={styles.orderForm}>
              {" "}
              <AddToCart
                productSlug={product.slug}
                productName={product.name}
                pricePerUnit={product.price}
                inStock={product.inStock}
                image={product.images[0]}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}
