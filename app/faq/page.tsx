import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | 2Fitty Outfits",
  description: "Frequently asked questions about 2Fitty Outfits products, sizing, ordering, and shipping.",
};

const FAQS = [
  {
    q: "How do 2Fitty products fit?",
    a: "Most 2Fitty pieces are cut in a relaxed or oversized fit -- each product page lists a specific fit description (e.g. relaxed, oversized, wide-leg) along with sizing guidance for that item.",
  },
  {
    q: "Where can I find the size guide?",
    a: "Each product page includes a short fit note near the size selector. A full size chart is [coming soon / to be added by the owner] -- reach out via Contact if you're unsure between two sizes.",
  },
  {
    q: "Are products made by 2Fitty Outfits?",
    a: "Yes. Every product on this site is designed and sold directly by 2Fitty Outfits -- we do not resell other brands.",
  },
  {
    q: "How do I submit a purchase request?",
    a: "Choose a product, colour, and size, then select Request to Purchase. You can request a single item or add multiple pieces to your Request Bag and submit them together.",
  },
  {
    q: "How will payment be arranged?",
    a: "No payment is collected on this website. After you submit a request, 2Fitty Outfits will contact you directly to confirm availability, pricing, and how to complete payment ([e-transfer / other method to be confirmed by the owner]).",
  },
  {
    q: "Do you offer pickup?",
    a: "Local pickup may be available in [select areas -- to be confirmed by the owner]. Choose your preferred fulfillment method on the order request form and we'll confirm what's possible for your location.",
  },
  {
    q: "Do you ship across Canada?",
    a: "Shipping options and costs are confirmed after your purchase request is submitted. See the Shipping Policy page for details.",
  },
  {
    q: "Can I exchange an item?",
    a: "Exchanges may be available for unworn items with original tags -- see the Returns and Exchanges page for full details and current windows.",
  },
  {
    q: "What does limited release mean?",
    a: "Limited release products are made in small batches and may not be restocked once sold out. Availability is shown on each product page.",
  },
  {
    q: "How should I wash my 2Fitty clothing?",
    a: "Care instructions are listed on each product page. In general: [wash cold, inside out; tumble dry low] -- follow the specific care instructions for your item.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-white">Frequently Asked Questions</h1>
      <div className="flex flex-col divide-y divide-white/10">
        {FAQS.map((item) => (
          <div key={item.q} className="py-5">
            <h2 className="mb-2 text-base font-bold text-white">{item.q}</h2>
            <p className="text-sm text-white/70">{item.a}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs text-white/40">
        Note to owner: review this FAQ content before launch and replace the
        bracketed placeholders with your confirmed policies and process.
      </p>
    </div>
  );
}
