import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official 2Fitty Outfits brand suite palette. Keys are kept the
        // same as before this rebrand pass so existing class names across
        // the codebase (bg-brand-black, text-brand-silver, etc.) continue
        // to work -- only the underlying hex values changed.
        brand: {
          black: "#0B0B0B", // Obsidian Black -- primary background
          charcoal: "#1E1E1E", // Midnight Graphite -- secondary background/cards
          grey: "#8A8A8A", // Concrete Grey -- secondary text/details
          silver: "#C6CCD2", // Steel Silver -- accents, borders, secondary text
          silverlight: "#DDE1E5", // Lighter tint of Steel Silver, used for hover states on white buttons
          bone: "#F4F1EA", // Bone White -- light-on-dark text / dark-on-light backgrounds
        },
      },
      fontFamily: {
        // Point Tailwind's `font-heading` / `font-body` / `font-sans`
        // utilities at the CSS variables defined in globals.css (plain
        // system/fallback stacks -- no external font fetch required).
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        sans: ["var(--font-body)"],
      },
      letterSpacing: {
        // Slightly wider than Tailwind's built-in `tracking-widest` (0.1em),
        // used throughout for small uppercase labels/kickers per the brand
        // suite's "Minimal" / condensed-but-spaced look.
        widest2: "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
