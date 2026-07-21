import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop 2Fitty Outfits",
  description:
    "Shop the full 2Fitty Outfits catalogue -- hoodies, sweatshirts, sweatpants, T-shirts, shorts, matching sets, outerwear, and accessories. Filter by category, size, colour, price, and availability.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-white/60">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
