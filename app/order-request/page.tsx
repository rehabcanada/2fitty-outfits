import type { Metadata } from "next";
import { Suspense } from "react";
import OrderRequestForm from "@/components/OrderRequestForm";

export const metadata: Metadata = {
  title: "Order Request | 2Fitty Outfits",
  description:
    "Submit a purchase request for a 2Fitty Outfits product. No payment is collected on this website -- final details are confirmed directly.",
};

export default function OrderRequestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold uppercase tracking-wide text-white">Order Request</h1>
      <p className="mb-8 text-sm text-white/60">
        Fill out the form below to request a product. This is not a
        completed purchase -- no payment is collected through this website.
        2Fitty Outfits will contact you directly to confirm availability,
        pricing, and delivery or pickup.
      </p>
      <Suspense fallback={<div className="text-white/60">Loading form...</div>}>
        <OrderRequestForm />
      </Suspense>
    </div>
  );
}
