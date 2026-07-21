"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import QuickViewModal from "./QuickViewModal";

function StatusBadge({ status }: { status: Product["productStatus"] }) {
  if (status === "None") return null;
  const styles: Record<Exclude<Product["productStatus"], "None">, string> = {
    "New Release": "bg-white text-brand-black",
    Limited: "bg-brand-silver text-brand-black",
    "Coming Soon": "bg-white/20 text-white",
    "Sold Out": "bg-white/10 text-white/60",
    Restocking: "bg-white/20 text-white",
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const hasSecondaryImage = product.images.length > 1;

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-lg border border-brand-silver/10 bg-brand-black transition-all duration-300 hover:-translate-y-1 hover:border-brand-silver/30 hover:shadow-xl hover:shadow-black/40">
        <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={`${product.name} in ${product.colours[0]}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${hasSecondaryImage ? "group-hover:opacity-0" : ""}`}
          />
          {hasSecondaryImage && (
            <Image
              src={product.images[1]}
              alt={`${product.name} on model, front view`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <div className="absolute left-2 top-2">
            <StatusBadge status={product.productStatus} />
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm font-bold text-white transition-colors duration-200 hover:text-brand-silverlight">
                {product.name}
              </h3>
            </Link>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-silver">
              {product.colours[0]}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-white">${product.price} CAD</span>
            <span className="text-xs text-white/50">{product.availability}</span>
          </div>

          <p className="text-xs text-white/50">Sizes: {product.sizes.join(", ")}</p>

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="btn-secondary-sm flex-1"
            >
              Quick View
            </button>
            <Link
              href={`/order-request?product=${product.slug}&size=${encodeURIComponent(product.sizes[0])}&colour=${encodeURIComponent(product.colours[0])}&price=${product.price}&image=${encodeURIComponent(product.images[0])}`}
              className="btn-primary-sm flex-1 text-center"
            >
              Request to Purchase
            </Link>
          </div>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
