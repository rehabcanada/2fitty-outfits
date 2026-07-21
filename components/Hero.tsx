import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-brand-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest2 text-brand-silver">
          Limited first release coming soon
        </span>
        {/* Secondary tagline, per brand suite -- sits as a small kicker above the headline. */}
        <p className="font-heading text-sm uppercase tracking-widest2 text-white/70">
          Wear Different.
        </p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Made to Be Worn Your Way.
        </h1>
        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          Original streetwear, everyday essentials and matching sets designed
          by 2Fitty Outfits. Clean fits, comfortable materials and limited
          releases without inflated prices.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-silverlight"
          >
            Shop the Collection
          </Link>
          <Link
            href="/shop?category=New%20Releases"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
          >
            View New Releases
          </Link>
        </div>
      </div>
    </section>
  );
}
