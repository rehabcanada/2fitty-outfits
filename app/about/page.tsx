import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About 2Fitty Outfits",
  description:
    "2Fitty Outfits is an independent streetwear label creating original everyday clothing, matching sets, and limited releases.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide text-white">About 2Fitty Outfits</h1>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-white/70">
        <p>
          2Fitty Outfits is an independent streetwear label creating original
          everyday clothing, matching sets, and limited releases. Our goal is
          simple: clean designs, comfortable fits, and pieces you can wear
          your own way.
        </p>
        <p>
          Every product is designed and sold directly by 2Fitty Outfits --
          from relaxed hoodies and sweatpants to statement graphics and
          matching sets. We keep the lineup small and intentional, focusing
          on comfortable shapes, versatile colours, and recognizable 2Fitty
          details rather than chasing every trend.
        </p>
        <p>
          It&apos;s a direct, hands-on operation: every purchase request is
          handled personally, and every question gets a real answer from a
          real person. If you have questions about a product, sizing, or an
          order, reach out any time through the Contact page.
        </p>
      </div>
    </div>
  );
}
