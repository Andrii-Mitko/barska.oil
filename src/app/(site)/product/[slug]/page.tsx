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
import { SITE_NAME, SITE_URL } from "@/lib/seo/config";

import styles from "./product.module.css";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

type ProductWithCategory = Omit<IProduct, "category"> & {
  category: ICategory;
};

const DEFAULT_PRODUCT_IMAGE = "/images/raf1.webp";

function getProductDescription(
  product: Pick<IProduct, "name" | "price" | "description">,
): string {
  return (
    product.description?.trim() ||
    `${product.name} — ${product.price} ₴. Доставка Новою Поштою по Україні.`
  );
}

function getProductImageUrl(image: string): string {
  return new URL(image, SITE_URL).toString();
}

function getProductJsonLd(product: ProductWithCategory) {
  const description = getProductDescription(product);

  const images = product.images.filter(Boolean).map(getProductImageUrl);

  const productUrl = `${SITE_URL}/product/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
    image: images,
    sku: product.sku,
    category: product.category.name,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: product.price,
      priceCurrency: "UAH",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  };
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getProductDescription(product);
  const productUrl = `${SITE_URL}/product/${product.slug}`;
  const image = product.images[0] || DEFAULT_PRODUCT_IMAGE;
  const imageUrl = getProductImageUrl(image);

  return {
    title: product.name,
    description,

    alternates: {
      canonical: productUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      locale: "uk_UA",
      siteName: SITE_NAME,
      title: product.name,
      description,
      url: productUrl,
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  await connectToDatabase();

  const product = (await Product.findOne({ slug })
    .populate("category")
    .lean()) as unknown as ProductWithCategory | null;

  if (!product) {
    notFound();
  }

  const productJsonLd = getProductJsonLd(product);

  return (
    <main className={styles.productPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />

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
