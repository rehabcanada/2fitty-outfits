import { Product } from "./types";

// Product catalogue for 2Fitty Outfits.
//
// The catalogue lives as one JSON file per product in /content/products/
// (a Decap CMS "folder collection") instead of a single nested-list JSON
// file. This is what lets the Decap CMS admin panel (/admin) edit products:
// Decap commits one file per product to content/products/ in the git repo,
// Netlify rebuilds, and this module reads every file in that directory at
// build time. The TypeScript Product type/interface (lib/types.ts) is
// unchanged -- only the data-loading mechanism changed, not the shape.
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
// Loads every product JSON file in content/products/ (one file per
// product -- a Decap CMS "folder collection") at build time via webpack's
// require.context. This is used instead of Node's `fs` module because
// lib/products.ts is imported by both Server Components (e.g.
// app/product/[slug]/page.tsx) AND a couple of Client Components
// (app/shop/ShopClient.tsx, components/OrderRequestForm.tsx) that need the
// catalogue in the browser bundle -- `fs`/`path` aren't available in a
// browser bundle, but require.context is resolved statically by webpack at
// compile time for both the server and client bundles, so this works in
// both places without a code fork. Adding/removing a file in
// content/products/ is automatically picked up on the next build/dev
// reload -- no code change needed here.
declare const require: NodeRequire & {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => { keys: () => string[]; (id: string): unknown };
};

function loadProducts(): Product[] {
  const context = require.context("../content/products", false, /\.json$/);
  const loaded = context.keys().map((key) => context(key) as Product);
  return loaded
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

export const products: Product[] = loadProducts();


export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}

export function getNewReleases(limit = 8): Product[] {
  return products.filter((p) => p.newRelease).slice(0, limit);
}

export function getFeatured(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}


// Matches the shop page's "Category" filter chip, where "All" means no
// filtering. "New Releases" is a real category value on some products but
// is also used as a synonym for "show newRelease items" from homepage links.
export function matchesCategory(product: Product, category: string): boolean {
  if (!category || category === "All") return true;
  if (category === "New Releases") return product.category === "New Releases" || product.newRelease;
  return product.category === category;
}


// Lenient multi-word text search across name, category and description.
// Used for the shop search box.
export function matchesQuery(product: Product, query: string): boolean {
  const haystack = `${product.name} ${product.category} ${product.shortDescription} ${product.description}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}
