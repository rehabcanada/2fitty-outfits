"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useOrderBag } from "@/context/OrderBagContext";

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [colour, setColour] = useState(product.colours[0]);
  const { addItem, openDrawer } = useOrderBag();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
    onClose();
    openDrawer();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Quick view of ${product.name}`}>
      <button aria-label="Close quick view" className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-brand-silver/10 bg-brand-charcoal sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative aspect-square w-full sm:w-1/2">
          <Image src={product.images[activeImage]} alt={`${product.name}, view ${activeImage + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
          {product.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)
                }
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={activeImage === i}
                    className={`h-1.5 w-1.5 rounded-full ${activeImage === i ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex w-full flex-col gap-3 p-6 sm:w-1/2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-silver">{product.category}</p>
          <h2 className="text-lg font-bold text-white">{product.name}</h2>
          <p className="text-lg font-bold text-white">${product.price} CAD</p>
          <p className="text-sm text-white/60 line-clamp-3">{product.shortDescription}</p>

          <div>
            <label htmlFor="quickview-colour" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
              Colour
            </label>
            <select
              id="quickview-colour"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2 text-sm text-white focus:border-brand-silver"
            >
              {product.colours.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quickview-size" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
              Size
            </label>
            <select
              id="quickview-size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2 text-sm text-white focus:border-brand-silver"
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <Link
              href={`/order-request?product=${product.slug}&size=${encodeURIComponent(size)}&colour=${encodeURIComponent(colour)}&price=${product.price}&image=${encodeURIComponent(product.images[0])}`}
              onClick={onClose}
              className="btn-primary text-center"
            >
              Request to Purchase
            </Link>
            <button
              type="button"
              onClick={handleAddToBag}
              className="btn-secondary"
            >
              Add to Request Bag
            </button>
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-center text-xs font-semibold text-white/60 hover:text-white"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
