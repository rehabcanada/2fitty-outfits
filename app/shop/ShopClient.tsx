"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductFilters, { FilterState } from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import { products, matchesCategory, matchesQuery } from "@/lib/products";

const ALL_SIZES = Array.from(new Set(products.flatMap((p) => p.sizes))).sort();
const ALL_COLOURS = Array.from(new Set(products.flatMap((p) => p.colours))).sort();
const MAX_PRICE_CEILING = Math.max(...products.map((p) => p.price));

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    search: initialQuery,
    size: "Any",
    colour: "Any",
    maxPrice: MAX_PRICE_CEILING,
    availability: "Any",
    sort: "Featured",
  });

  function handleChange(next: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...next }));
  }

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (!matchesCategory(p, filters.category)) return false;
      if (filters.search && !matchesQuery(p, filters.search)) return false;
      if (filters.size !== "Any" && !p.sizes.includes(filters.size)) return false;
      if (filters.colour !== "Any" && !p.colours.includes(filters.colour)) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.availability !== "Any" && p.availability !== filters.availability) return false;
      return true;
    });

    switch (filters.sort) {
      case "Price Low-High":
        return [...result].sort((a, b) => a.price - b.price);
      case "Price High-Low":
        return [...result].sort((a, b) => b.price - a.price);
      case "Newest":
        return [...result].sort((a, b) => Number(b.newRelease) - Number(a.newRelease));
      case "Featured":
      default:
        return [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-white">Shop</h1>
      <ProductFilters
        filters={filters}
        onChange={handleChange}
        sizes={ALL_SIZES}
        colours={ALL_COLOURS}
        maxPriceCeiling={MAX_PRICE_CEILING}
      />
      <p className="mb-4 text-sm text-white/50">{filtered.length} item{filtered.length === 1 ? "" : "s"}</p>
      <ProductGrid products={filtered} />
    </div>
  );
}
