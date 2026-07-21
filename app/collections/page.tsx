import type { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import { COLLECTIONS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections | 2Fitty Outfits",
  description:
    "Browse 2Fitty Outfits collections -- 2Fitty Core, Fifty Series, After Hours, and Signature Sets.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold uppercase tracking-wide text-white">Collections</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {COLLECTIONS.map((c) => (
          <div key={c.name} className="flex flex-col gap-3">
            <CollectionCard
              title={c.name}
              href={`/shop?q=${encodeURIComponent(c.name)}`}
              imageSeed={c.imageSeed}
            />
            <p className="text-sm text-white/60">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
