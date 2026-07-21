import { CollectionName, Product } from "./types";
import productsData from "@/content/products.json";

// Product catalogue for 2Fitty Outfits.
//
// The catalogue itself now lives in /content/products.json instead of being
// hardcoded here. This is what lets the Decap CMS admin panel (/admin) edit
// products: Decap commits changes to content/products.json in the git repo,
// Netlify rebuilds, and this import picks up the new data at build time.
// The TypeScript Product type/interface (lib/types.ts) is unchanged --
// only the data source moved from an inline array to an imported JSON file.
//
// Every product here is designed and sold by 2Fitty Outfits -- there is no
// third-party/resale brand attached to any item. All prices below are
// EDITABLE PLACEHOLDERS in CAD; confirm real pricing before launch.
//
// Materials/fabric/manufacturing details use bracketed placeholders (e.g.
// "[420 GSM cotton blend]") because the real specs have not been confirmed
// yet -- replace them once fabric/manufacturing details are finalized.
//
// Images are placeholders (picsum.photos seeded by slug) -- swap with real
// product photography before launch (or upload new images through /admin,
// which stores uploads in public/images/uploads). See README for instructions.
export const products: Product[] = productsData as Product[];

export const COLLECTIONS: { name: CollectionName; description: string; imageSeed: string }[] = [
  {
    name: "2Fitty Core",
    description: "Minimal everyday clothing with small 2F/2Fitty branding.",
    imageSeed: "collection-2fitty-core",
  },
  {
    name: "Fifty Series",
    description: "Larger graphics, numbers, embroidery, and statement branding.",
    imageSeed: "collection-fifty-series",
  },
  {
    name: "After Hours",
    description: "A darker collection in black, washed charcoal, grey, and muted tones.",
    imageSeed: "collection-after-hours",
  },
  {
    name: "Signature Sets",
    description: "Matching combinations designed to be worn as a complete outfit.",
    imageSeed: "collection-signature-sets",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.collection === product.collection)
    )
    .slice(0, limit);
}

export function getNewReleases(limit = 8): Product[] {
  return products.filter((p) => p.newRelease).slice(0, limit);
}

export function getFeatured(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getProductsByCollection(collection: CollectionName): Product[] {
  return products.filter((p) => p.collection === collection);
}

// Matches the shop page's "Category" filter chip, where "All" means no
// filtering. "New Releases" is a real category value on some products but
// is also used as a synonym for "show newRelease items" from homepage links.
export function matchesCategory(product: Product, category: string): boolean {
  if (!category || category === "All") return true;
  if (category === "New Releases") return product.category === "New Releases" || product.newRelease;
  return product.category === category;
}

// Matches the shop page's "Collection" filter, where "Any" means no
// filtering.
export function matchesCollection(product: Product, collection: string): boolean {
  if (!collection || collection === "Any") return true;
  return product.collection === collection;
}

// Lenient multi-word text search across name, collection, category and
// description. Used for the shop search box and for Featured Collection
// links that need more granularity than the category filter chips.
export function matchesQuery(product: Product, query: string): boolean {
  const haystack = `${product.name} ${product.collection} ${product.category} ${product.shortDescription} ${product.description}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}
