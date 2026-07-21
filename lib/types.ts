// Core data model for the 2Fitty Outfits catalogue.
// 2Fitty Outfits designs and manufactures every product listed here -- there
// is no third-party/resale brand concept in this model. There is no
// "condition" field because every product is new, original 2Fitty stock.

export type Availability = "In Stock" | "Limited" | "Sold Out" | "Restocking" | "Pre-Order";

// Editorial status shown as an optional badge on product cards / detail pages.
export type ProductStatus = "New Release" | "Limited" | "Coming Soon" | "Sold Out" | "Restocking" | "None";

export type ProductCategory =
  | "New Releases"
  | "Hoodies"
  | "Sweatshirts"
  | "Sweatpants"
  | "T-Shirts"
  | "Shorts"
  | "Matching Sets"
  | "Outerwear"
  | "Accessories";

// Collection names are intentionally kept in one place so they're easy to
// rename later without touching every product entry.
export type CollectionName = "2Fitty Core" | "Fifty Series" | "After Hours" | "Signature Sets";

export interface Product {
  id: string;
  name: string;
  slug: string;
  collection: CollectionName;
  category: ProductCategory;
  /** Price in CAD, stored as a plain number (e.g. 85 => "$85 CAD"). */
  price: number;
  description: string;
  shortDescription: string;
  colours: string[];
  sizes: string[];
  /** Short fit description, e.g. "Relaxed, slightly oversized fit." */
  fit: string;
  /** Bracketed placeholders until the owner confirms real fabric specs. */
  materials: string;
  careInstructions: string;
  availability: Availability;
  productStatus: ProductStatus;
  featured: boolean;
  newRelease: boolean;
  images: string[];
  /** Short note shown near the size selector, e.g. sizing guidance. */
  sizeGuideInfo: string;
  instagramPostUrl?: string;
}
