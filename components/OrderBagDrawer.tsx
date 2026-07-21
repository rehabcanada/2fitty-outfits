"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderBag } from "@/context/OrderBagContext";

// User-facing "Request Bag" drawer (component retained as OrderBagDrawer
// internally to limit refactor risk, but all copy says "Request Bag").
export default function OrderBagDrawer() {
  const { items, removeItem, updateQuantity, estimatedTotal, isDrawerOpen, closeDrawer } =
    useOrderBag();
  const router = useRouter();

  useEffect(() => {
    if (!isDrawerOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  function handleSubmitRequest() {
    closeDrawer();
    router.push("/order-request?fromBag=1");
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Request bag">
      <button aria-label="Close request bag" className="absolute inset-0 bg-black/70" onClick={closeDrawer} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-brand-silver/10 bg-brand-charcoal">
        <div className="flex items-center justify-between border-b border-brand-silver/10 p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest2 text-white">Request Bag</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-sm text-white/60">
              Your request bag is empty. Browse the shop and add pieces
              you&apos;d like to request.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={`${item.productId}-${item.colour}-${item.size}`} className="flex gap-3 border-b border-brand-silver/10 pb-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/50">Colour: {item.colour}</p>
                    <p className="text-xs text-white/50">Size: {item.size}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <label htmlFor={`qty-${item.productId}-${item.colour}-${item.size}`} className="text-xs text-white/50">
                        Qty
                      </label>
                      <input
                        id={`qty-${item.productId}-${item.colour}-${item.size}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, item.size, Number(e.target.value), item.colour)}
                        className="w-14 rounded border border-brand-silver/20 bg-brand-black px-2 py-1 text-xs text-white"
                      />
                      <span className="ml-auto text-sm font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)} CAD
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.size, item.colour)}
                      className="mt-1 self-start text-xs font-semibold text-white/50 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-brand-silver/10 p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-white/70">Estimated Product Total</span>
            <span className="font-bold text-white">${estimatedTotal.toFixed(2)} CAD</span>
          </div>
          <p className="mb-4 text-xs text-white/50">
            Shipping, taxes and final availability will be confirmed before
            payment. No payment is collected on this website.
          </p>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={handleSubmitRequest}
            className="btn-primary w-full"
          >
            Submit Purchase Request
          </button>
          <Link
            href="/shop"
            onClick={closeDrawer}
            className="mt-3 block text-center text-xs font-semibold text-white/60 hover:text-white"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
