import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns and Exchanges | 2Fitty Outfits",
  description: "Return and exchange information for 2Fitty Outfits orders.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold uppercase tracking-wide text-white">Returns and Exchanges</h1>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-white/70">
        <p>
          All 2Fitty Outfits products are new, unworn clothing. To be
          eligible for a return or exchange, items must be unworn, unwashed,
          and returned with all original tags attached.
        </p>
        <p>
          For hygiene reasons, some items (e.g. accessories worn close to the
          skin) may be marked as final sale and are not eligible for return
          or exchange -- this will be noted on the product page where it
          applies.
        </p>
        <p>
          Return requests must be submitted within [7-day return window] of
          receiving your order, and exchange requests within [14-day exchange
          window]. Sale items are generally [final sale] unless stated
          otherwise.
        </p>
        <p>
          Return shipping is the customer&apos;s responsibility unless the
          item received was incorrect or defective ([return shipping
          responsibility] to be confirmed by the owner).
        </p>
        <p>
          If an item arrives damaged, incorrect, or significantly different
          from what was described, contact us right away so we can make it
          right.
        </p>
      </div>
      <p className="mt-10 text-xs text-white/40">
        Note to owner: review and finalize this return/exchange policy before
        launch, replacing the bracketed placeholders with your actual windows
        and process.
      </p>
    </div>
  );
}
