import Link from "next/link";
import type { IProduct } from "@/types/product";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col border border-solid border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div
        className="w-full aspect-square"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        {product.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <h3 className="mt-3 text-base font-medium">{product.name}</h3>
      <span className="mt-1 text-sm text-gray-500">{product.volumeMl} мл</span>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-semibold">{product.price} ₴</span>
        <span
          className={
            product.inStock ? "text-green-600 text-sm" : "text-red-500 text-sm"
          }
        >
          {product.inStock ? "В наявності" : "Немає в наявності"}
        </span>
      </div>
    </Link>
  );
}
