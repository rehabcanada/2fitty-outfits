import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | 2Fitty Outfits",
  description: "Shipping information for 2Fitty Outfits orders.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide text-white">Shipping Policy</h1>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-white/70">
        <p>
          Shipping options are confirmed after you submit a purchase request
          -- 2Fitty Outfits will follow up directly with the methods
          available for your location.
        </p>
        <p>
          Shipping costs are confirmed before any payment is made. Exact
          rates depend on the product, your location, and the shipping
          method you choose.
        </p>
        <p>
          Delivery estimates begin once your order is confirmed and payment
          is complete -- no shipping times are guaranteed before that point.
        </p>
        <p>
          Local pickup may be available in select areas as an alternative to
          shipping ([pickup area] to be confirmed by the owner) -- this can
          be selected when you submit an order request.
        </p>
        <p>
          Once an order is confirmed and shipped, you&apos;ll receive
          shipment details directly (e.g. tracking information, where
          available) so you can follow your package to delivery.
        </p>
        <p>
          If you have questions about shipping to your specific location,
          reach out via the Contact page before submitting a request.
        </p>
      </div>
      <p className="mt-10 text-xs text-white/40">
        Note to owner: review and finalize this shipping policy before
        launch to make sure it matches your actual process.
      </p>
    </div>
  );
}
