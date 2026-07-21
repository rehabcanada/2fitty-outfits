// "Brand Benefits" section. Renamed from the old resale-era trust bar --
// no authenticity/verification claims since 2Fitty Outfits is the original
// designer and seller of every product.
const ITEMS = [
  { title: "Original 2Fitty Designs", desc: "Every piece is designed and sold directly by 2Fitty Outfits." },
  { title: "Limited Releases", desc: "Small-batch drops without inflated pricing." },
  { title: "Comfortable Fits", desc: "Relaxed, oversized shapes built for everyday wear." },
  { title: "Direct Customer Support", desc: "Clear, direct communication on every request." },
];

export default function TrustBar() {
  return (
    <section className="border-y border-brand-silver/10 bg-brand-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 sm:px-6 md:grid-cols-4 md:py-16 lg:px-8">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col gap-1">
            <span className="text-sm font-bold uppercase tracking-wide text-white">
              {item.title}
            </span>
            <span className="text-xs text-white/60">{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
