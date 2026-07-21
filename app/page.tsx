import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import SocialGallery from "@/components/SocialGallery";
import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import EmailSignup from "@/components/EmailSignup";
import { getNewReleases, getProductBySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "2Fitty Outfits | Original Streetwear and Matching Sets",
  description:
    "Shop original hoodies, sweatpants, T-shirts, shorts and matching sets designed by 2Fitty Outfits.",
};

const STEPS = [
  {
    title: "Choose Your Fit",
    desc: "Browse the shop and pick the product, colour, size, and quantity you want.",
  },
  {
    title: "Send Your Request",
    desc: "Submit a Request to Purchase -- this is not a completed order or a payment.",
  },
  {
    title: "Confirm Your Order",
    desc: "2Fitty Outfits contacts you directly to confirm availability, payment, and delivery.",
  },
];

export default function Home() {
  const newReleases = getNewReleases(8);
  const matchingSet = getProductBySlug("signature-hoodie-and-sweatpants-set");

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
            New Releases
          </h2>
          <Link href="/shop?category=New%20Releases" className="text-sm font-semibold text-brand-silver hover:text-white">
            View All
          </Link>
        </div>
        <ProductGrid products={newReleases} />
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
          Built for Everyday Rotation
        </h2>
        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          2Fitty Outfits creates clean, relaxed streetwear that can be worn
          separately or combined into complete fits. Each release focuses on
          comfortable shapes, versatile colours and recognizable 2Fitty
          details.
        </p>
      </section>

      {matchingSet && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 rounded-xl border border-white/10 bg-brand-charcoal p-6 sm:p-10 lg:grid-cols-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
              <Image
                src={matchingSet.images[0]}
                alt={matchingSet.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest2 text-brand-silver">
                Featured Matching Set
              </span>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{matchingSet.name}</h2>
              <p className="text-sm leading-relaxed text-white/70">{matchingSet.shortDescription}</p>
              <p className="text-lg font-bold text-white">${matchingSet.price} CAD</p>
              <p className="text-xs text-white/50">
                Prefer just one piece? Request the hoodie only, the sweatpants
                only, or the complete set -- just note your preference on the
                order request form.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/order-request?product=${matchingSet.slug}&size=${encodeURIComponent(matchingSet.sizes[0])}&colour=${encodeURIComponent(matchingSet.colours[0])}&price=${matchingSet.price}&image=${encodeURIComponent(matchingSet.images[0])}`}
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-silverlight"
                >
                  Request to Purchase
                </Link>
                <Link
                  href={`/product/${matchingSet.slug}`}
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
          How Ordering Works
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
              <p className="text-sm text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-white/50">
          No payment is collected through this website. Your order is
          confirmed after 2Fitty Outfits contacts you directly.
        </p>
      </section>

      <TrustBar />

      <EmailSignup />

      <SocialGallery />
    </>
  );
}
