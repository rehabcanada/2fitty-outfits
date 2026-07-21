import Link from "next/link";

/**
 * Logo / brand mark -- CODED APPROXIMATION.
 *
 * No raster/vector logo file was ever provided for this project (only a
 * brand-suite reference image shared in chat), so this component builds an
 * inline-SVG approximation of the documented mark rather than importing a
 * real asset:
 *   - A bold, angular "2F" monogram where the "2" and "F" share a
 *     slanted/cut diagonal edge, filled with a white -> Steel Silver
 *     (#C6CCD2) gradient to imitate a faceted metallic look.
 *   - A "2FITTY OUTFITS" wordmark, with "OUTFITS" set smaller, letter-spaced,
 *     and flanked by thin horizontal rules ("— OUTFITS —").
 *
 * Two lockups are supported, matching the brand suite's "Secondary Logo
 * Variations":
 *   - "stacked": monogram above the wordmark (hero / square placements)
 *   - "horizontal": monogram beside the wordmark with a vertical divider
 *     (header nav) -- this is the default, matching prior call sites.
 *
 * Two colour themes are supported:
 *   - "light": light-on-dark (white/silver on black) -- default
 *   - "dark": dark-on-light (black on Bone White) -- for inverted/footer-
 *     on-light sections
 *
 * TO REPLACE WITH THE REAL LOGO:
 * 1. Drop the real logo file(s) into /public/logo-horizontal.svg and
 *    /public/logo-stacked.svg (or .png).
 * 2. Swap the <Monogram>/<Wordmark> JSX below for a next/image (or <img>)
 *    tag pointing at the real asset, keeping the same component props
 *    (variant, theme, className) so call sites don't need to change.
 * 3. Remove the inline SVG monogram markup once the real asset is wired up.
 */

type LogoVariant = "stacked" | "horizontal";
type LogoTheme = "light" | "dark";

function Monogram({ theme, gradientId }: { theme: LogoTheme; gradientId: string }) {
  // Angular "2F" monogram. The "2" and "F" are drawn as a single faceted
  // silhouette sharing one slanted diagonal cut edge down the middle,
  // filled with a metallic-look gradient (white -> Steel Silver).
  const fill = theme === "light" ? `url(#${gradientId})` : "#0B0B0B";
  const plate = theme === "light" ? "#0B0B0B" : "#F4F1EA";
  const stroke = "#8A8A8A";

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <rect x="0.5" y="0.5" width="39" height="39" rx="7" fill={plate} stroke={stroke} />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C6CCD2" />
        </linearGradient>
      </defs>
      {/* "2" -- angular block strokes forming a numeral 2 */}
      <path
        d="M9 12 L9 10.5 C9 9 10.5 8 13 8 C15.5 8 17 9 17 11 C17 13 15 14.5 12.5 16.5 L9 19.5 L17 19.5 L17 22 L8 22 L8 19.5 L13.5 15 C15 13.7 15 12.8 15 11.3 C15 10.3 14.3 10 13 10 C11.7 10 11 10.6 11 12 Z"
        fill={fill}
      />
      {/* Diagonal cut edge shared between "2" and "F" */}
      <path d="M18 8 L22 8 L18 32 L14 32 Z" fill={fill} opacity="0.9" />
      {/* "F" -- angular block strokes forming the letter F */}
      <path d="M23 8 L32 8 L32 10.5 L25.5 10.5 L25.5 14 L31 14 L31 16.5 L25.5 16.5 L25.5 22 L23 22 Z" fill={fill} />
    </svg>
  );
}

function Wordmark({ theme }: { theme: LogoTheme }) {
  const primary = theme === "light" ? "text-white" : "text-brand-black";
  const secondary = theme === "light" ? "text-brand-silver" : "text-brand-grey";

  return (
    <div className="flex flex-col leading-none">
      <span className={`font-heading text-lg font-bold uppercase tracking-wide ${primary}`}>
        2Fitty Outfits
      </span>
      <span className={`mt-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest2 ${secondary}`}>
        <span className="h-px w-3 bg-current" />
        Outfits
        <span className="h-px w-3 bg-current" />
      </span>
    </div>
  );
}

interface LogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  className?: string;
}

export default function Logo({ variant = "horizontal", theme = "light", className = "" }: LogoProps) {
  const gradientId = `logo-gradient-${theme}`;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${variant === "stacked" ? "flex-col text-center" : "flex-row"} ${className}`}
      aria-label="2Fitty Outfits home"
    >
      <Monogram theme={theme} gradientId={gradientId} />
      {variant === "horizontal" && (
        <span className={`h-8 w-px ${theme === "light" ? "bg-white/20" : "bg-black/20"}`} />
      )}
      <Wordmark theme={theme} />
    </Link>
  );
}
