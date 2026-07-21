import Image from "next/image";
import Link from "next/link";

/**
 * Logo / brand mark -- uses the official 2Fitty Outfits logo file
 * (extracted from the brand's print-ready PDF).
 *
 * Two lockups are supported, matching the brand suite:
 *   - "horizontal": monogram beside a text wordmark with a vertical divider
 *     (header nav) -- default, matches prior call sites.
 *   - "stacked": the full official lockup (monogram + "2FITTY OUTFITS"
 *     wordmark) as a single image (hero / square placements).
 *
 * Two colour themes are supported:
 *   - "light": light-on-dark (white/silver mark) -- for dark backgrounds,
 *     default.
 *   - "dark": dark-on-light (charcoal/black mark) -- for footer/inverted
 *     sections on light backgrounds.
 */

type LogoVariant = "stacked" | "horizontal";
type LogoTheme = "light" | "dark";

interface LogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  className?: string;
}

export default function Logo({ variant = "horizontal", theme = "light", className = "" }: LogoProps) {
  const monogramSrc = theme === "light" ? "/logo/monogram-light.png" : "/logo/monogram-dark.png";
  const fullSrc = theme === "light" ? "/logo/full-light.png" : "/logo/full-dark.png";
  const textColor = theme === "light" ? "text-white" : "text-brand-black";

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center ${className}`} aria-label="2Fitty Outfits home">
        <Image
          src={fullSrc}
          alt="2Fitty Outfits"
          width={800}
          height={800}
          className="h-auto w-full"
          priority
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex flex-row items-center gap-3 ${className}`}
      aria-label="2Fitty Outfits home"
    >
      <Image
        src={monogramSrc}
        alt="2Fitty Outfits monogram"
        width={512}
        height={512}
        className="h-9 w-9 shrink-0 object-contain"
        priority
      />
      <span className={`h-8 w-px ${theme === "light" ? "bg-white/20" : "bg-black/20"}`} />
      <span className={`font-heading text-lg font-bold uppercase tracking-wide leading-none ${textColor}`}>
        2Fitty Outfits
      </span>
    </Link>
  );
}
