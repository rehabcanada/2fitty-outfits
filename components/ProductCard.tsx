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

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-brand-charcoal">
        <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={`${product.name} in ${product.colours[0]}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <StatusBadge status={product.productStatus} />
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm font-bold text-white hover:text-brand-silverlight">
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
              className="flex-1 rounded-full border border-white/30 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Quick View
            </button>
            <Link
              href={`/order-request?product=${product.slug}&size=${encodeURIComponent(product.sizes[0])}&colour=${encodeURIComponent(product.colours[0])}&price=${product.price}&image=${encodeURIComponent(product.images[0])}`}
              className="flex-1 rounded-full bg-white px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-silverlight"
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
