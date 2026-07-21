"use client";

const CATEGORY_CHIPS = [
  "All",
  "New Releases",
  "Hoodies",
  "Sweatshirts",
  "Sweatpants",
  "T-Shirts",
  "Shorts",
  "Matching Sets",
  "Outerwear",
  "Accessories",
];

const AVAILABILITIES = ["Any", "In Stock", "Limited", "Restocking", "Pre-Order", "Sold Out"];
const SORT_OPTIONS = ["Featured", "Newest", "Price Low-High", "Price High-Low"];

export interface FilterState {
  category: string;
  search: string;
  size: string;
  colour: string;
  maxPrice: number;
  availability: string;
  sort: string;
}

export default function ProductFilters({
  filters,
  onChange,
  sizes,
  colours,
  maxPriceCeiling,
}: {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  sizes: string[];
  colours: string[];
  maxPriceCeiling: number;
}) {
  return (
    <div className="mb-8 flex flex-col gap-6">
      <div>
        <label htmlFor="product-search" className="mb-2 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
          Search
        </label>
        <input
          id="product-search"
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by name..."
          className="w-full max-w-md rounded-full border border-white/20 bg-brand-charcoal px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white"
        />
      </div>

      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {CATEGORY_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onChange({ category: chip })}
            aria-pressed={filters.category === chip}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              filters.category === chip
                ? "border-white bg-white text-brand-black"
                : "border-white/25 text-white/70 hover:border-white hover:text-white"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="filter-size" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Size
          </label>
          <select
            id="filter-size"
            value={filters.size}
            onChange={(e) => onChange({ size: e.target.value })}
            className="w-full rounded-lg border border-white/20 bg-brand-charcoal px-3 py-2 text-sm text-white focus:border-white"
          >
            <option value="Any">Any size</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-colour" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Colour
          </label>
          <select
            id="filter-colour"
            value={filters.colour}
            onChange={(e) => onChange({ colour: e.target.value })}
            className="w-full rounded-lg border border-white/20 bg-brand-charcoal px-3 py-2 text-sm text-white focus:border-white"
          >
            <option value="Any">Any colour</option>
            {colours.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-price" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Max Price: ${filters.maxPrice} CAD
          </label>
          <input
            id="filter-price"
            type="range"
            min={0}
            max={maxPriceCeiling}
            step={5}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-white"
          />
        </div>

        <div>
          <label htmlFor="filter-availability" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Availability
          </label>
          <select
            id="filter-availability"
            value={filters.availability}
            onChange={(e) => onChange({ availability: e.target.value })}
            className="w-full rounded-lg border border-white/20 bg-brand-charcoal px-3 py-2 text-sm text-white focus:border-white"
          >
            {AVAILABILITIES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-sort" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Sort By
          </label>
          <select
            id="filter-sort"
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="w-full rounded-lg border border-white/20 bg-brand-charcoal px-3 py-2 text-sm text-white focus:border-white"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
