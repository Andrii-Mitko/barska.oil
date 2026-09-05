import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/BackButton/BackButton";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import type { ICategory } from "@/types/category";
import type { IProduct } from "@/types/product";
import BuyButton from "@/components/ui/BuyButton/BuyButton";

import styles from "./product.module.css";
import AddToCart from "@/components/product/AddToCart/AddToCart";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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
      <div className={styles.container}>
        <BackButton fallbackHref="/catalog" label="Назад до каталогу" />
        <div className={styles.product}>
          <div className={styles.imageWrapper}>
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
                Зображення товару відсутнє
              </div>
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.category}>{product.category.name}</p>

            <h1 className={styles.title}>{product.name}</h1>

            <p className={styles.volume}>{product.volumeMl} мл</p>

            <p className={styles.price}>{product.price} ₴</p>

            <div className={styles.stock}>
              {product.inStock ? (
                <span className={styles.inStock}>Готово до відправки</span>
              ) : (
                <span className={styles.outOfStock}>Немає в наявності</span>
              )}
            </div>

            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}

            <div className={styles.buy}>
              <BuyButton productName={product.name} inStock={product.inStock} />
            </div>

            <div className={styles.orderForm}>
              <AddToCart
                productSlug={product.slug}
                productName={product.name}
                pricePerUnit={product.price}
                inStock={product.inStock}
                image={product.images[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
