import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-brand-silver/10 bg-brand-black">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/uploads/chatgpt-image-jul-21-2026-01_47_50-pm.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark gradient overlay so headline/body text stays legible over any photo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),_transparent_60%)]" />
      </div>

      <div className="animate-fade-in-up relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-start justify-center gap-6 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <span className="rounded-full border border-brand-silver/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest2 text-brand-silver">
          Limited first release coming soon
        </span>
        {/* Secondary tagline, per brand suite -- sits as a small kicker above the headline. */}
        <p className="font-heading text-sm uppercase tracking-widest2 text-white/70">
          Wear Different.
        </p>
        <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Made to Be Worn Your Way.
        </h1>
        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          Original streetwear, everyday essentials and matching sets designed
          by 2Fitty Outfits. Clean fits, comfortable materials and limited
          releases without inflated prices.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link href="/shop" className="btn-primary">
            Shop the Collection
          </Link>
          <Link href="/shop?category=New%20Releases" className="btn-secondary">
            View New Releases
          </Link>
        </div>
      </div>
    </section>
  );
}
