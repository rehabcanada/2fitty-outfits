"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useOrderBag } from "@/context/OrderBagContext";
import ProductGrid from "@/components/ProductGrid";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [colour, setColour] = useState(product.colours[0]);
  const { addItem, openDrawer } = useOrderBag();

  function handleAddToBag() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      colour,
      size,
    });
    openDrawer();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10">
            <Image
              src={product.images[activeImage]}
              alt={`${product.name}, view ${activeImage + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1} of ${product.name}`}
                  aria-current={activeImage === i}
                  className={`relative h-20 w-16 overflow-hidden rounded-lg border ${
                    activeImage === i ? "border-white" : "border-white/20"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-brand-silver">
            {product.collection}
          </p>
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>
          <p className="text-2xl font-bold text-white">${product.price} CAD</p>

          {product.productStatus !== "None" && (
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
              <span className="rounded-full bg-brand-silver px-3 py-1 text-brand-black">{product.productStatus}</span>
              <span className="rounded-full border border-white/30 px-3 py-1 text-white">{product.availability}</span>
            </div>
          )}

          <p className="text-sm leading-relaxed text-white/70">{product.description}</p>

          <div className="flex flex-col gap-2 text-xs text-white/60">
            <p>
              <span className="font-bold text-white">Fit:</span> {product.fit}
            </p>
            <p>
              <span className="font-bold text-white">Materials:</span> {product.materials}
            </p>
            <p>
              <span className="font-bold text-white">Care:</span> {product.careInstructions}
            </p>
          </div>

          <div>
            <label htmlFor="pd-colour" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
              Colour
            </label>
            <select
              id="pd-colour"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-white/20 bg-brand-charcoal px-3 py-2.5 text-sm text-white focus:border-white"
            >
              {product.colours.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pd-size" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
              Size
            </label>
            <select
              id="pd-size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-white/20 bg-brand-charcoal px-3 py-2.5 text-sm text-white focus:border-white"
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {/* Placeholder sizing guidance pending real size-chart confirmation. */}
            <p className="mt-2 text-xs text-white/50">{product.sizeGuideInfo}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/order-request?product=${product.slug}&size=${encodeURIComponent(size)}&colour=${encodeURIComponent(colour)}&price=${product.price}&image=${encodeURIComponent(product.images[0])}`}
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-silverlight"
            >
              Request to Purchase
            </Link>
            <button
              type="button"
              onClick={handleAddToBag}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Add to Request Bag
            </button>
          </div>

          <div className="mt-2 flex flex-col gap-2 rounded-lg border border-white/10 bg-brand-charcoal p-4 text-xs text-white/60">
            <p>
              <span className="font-bold text-white">Size Guide:</span>{" "}
              {product.sizeGuideInfo}
            </p>
            <p>
              <span className="font-bold text-white">Shipping / Pickup:</span>{" "}
              Local pickup may be available in select areas; shipping is
              available otherwise. Exact costs and timelines are confirmed
              directly before any payment is made.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-white">
            You May Also Like
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
