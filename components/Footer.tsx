import Link from "next/link";
import Logo from "./Logo";

const SHOP_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
];

const INFO_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping-policy", label: "Shipping" },
  { href: "/return-policy", label: "Returns and Exchanges" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-white/60">
            Original streetwear, matching sets and limited releases designed
            by 2Fitty Outfits.
          </p>
          <p className="font-heading text-sm uppercase tracking-wide text-brand-silver">
            Wear Different.
          </p>
          <div className="flex gap-3 text-xs font-semibold uppercase tracking-wide text-brand-silver">
            {/* Placeholder social links -- update with real handles */}
            <a href="https://instagram.com/2fittyoutfits" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href="https://tiktok.com/@2fittyoutfits" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              TikTok
            </a>
            {/* Placeholder email -- update before launch */}
            <a href="mailto:hello@2fittyoutfits.com" className="hover:text-white">
              Email
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest2 text-white">Shop</h3>
          <ul className="flex flex-col gap-2">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest2 text-white">Support</h3>
          <ul className="flex flex-col gap-2">
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest2 text-white">About</h3>
          <p className="text-sm text-white/70">
            2Fitty Outfits designs and sells its own original streetwear.
            Purchases are arranged directly with 2Fitty Outfits -- no payment
            is collected on this website.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/50 sm:px-6 lg:px-8">
        <p>
          2Fitty Outfits &mdash; EST. 2024. &copy; {year} 2Fitty Outfits. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
