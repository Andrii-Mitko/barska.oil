import Image from "next/image";
import { notFound } from "next/navigation";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Makukha } from "@/models/Makukha";
import type { IMakukha } from "@/types/makukha";
import AddToCart from "@/components/product/AddToCart/AddToCart";

export default async function MakukhaPage() {
  await connectToDatabase();

  const makukha =
    (await Makukha.findOne().lean()) as unknown as IMakukha | null;

  if (!makukha) {
    notFound();
  }

  return (
    <main>
      <section>
        <div className="container">
          <p>Додаткова продукція</p>

          <h1>{makukha.name}</h1>

          {makukha.image && (
            <Image
              src={makukha.image}
              alt={makukha.name}
              width={600}
              height={600}
            />
          )}

          {makukha.description && <p>{makukha.description}</p>}

          <AddToCart
            productSlug="makukha"
            productName={makukha.name}
            pricePerUnit={makukha.pricePerKg}
            inStock={makukha.inStock}
            image={makukha.image}
            unit="кг"
          />
        </div>
      </section>
    </main>
  );
}
