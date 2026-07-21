import type { Metadata } from "next";
import LookbookGrid, { LookbookShot } from "@/components/LookbookGrid";

export const metadata: Metadata = {
  title: "2Fitty Outfits Lookbook",
  description:
    "An editorial look at 2Fitty Outfits -- Core Collection, Matching Sets, After Hours, and everyday fits.",
};

// All images below are placeholder editorial photography (picsum.photos
// seeded) -- swap the seeds for real campaign photography when available.
// Each shot can optionally link to a related product via the `href` field.
const SECTIONS: { title: string; shots: LookbookShot[] }[] = [
  {
    title: "Core Collection",
    shots: [
      { seed: "lookbook-core-1", caption: "Core Heavyweight Hoodie, front", href: "/product/2fitty-core-heavyweight-hoodie" },
      { seed: "lookbook-core-2", caption: "Core Relaxed Sweatpants, styled loose", href: "/product/2fitty-core-relaxed-sweatpants" },
      { seed: "lookbook-core-3", caption: "Core Fleece Shorts, warm-weather fit", href: "/product/2fitty-core-fleece-shorts" },
    ],
  },
  {
    title: "Matching Sets",
    shots: [
      { seed: "lookbook-sets-1", caption: "Signature Hoodie and Sweatpants Set", href: "/product/signature-hoodie-and-sweatpants-set" },
      { seed: "lookbook-sets-2", caption: "Matching set, detail shot" },
      { seed: "lookbook-sets-3", caption: "Matching set, full outfit" },
    ],
  },
  {
    title: "After Hours",
    shots: [
      { seed: "lookbook-afterhours-1", caption: "After Hours Washed Hoodie", href: "/product/after-hours-washed-hoodie" },
      { seed: "lookbook-afterhours-2", caption: "After Hours Wide-Leg Sweatpants", href: "/product/after-hours-wide-leg-sweatpants" },
      { seed: "lookbook-afterhours-3", caption: "After Hours, layered outfit" },
    ],
  },
  {
    title: "Detail Shots",
    shots: [
      { seed: "lookbook-detail-1", caption: "Close-up embroidery, 2F mark" },
      { seed: "lookbook-detail-2", caption: "Fabric and label detail" },
      { seed: "lookbook-detail-3", caption: "Ribbed cuff and hem detail" },
    ],
  },
  {
    title: "Everyday Fits",
    shots: [
      { seed: "lookbook-everyday-1", caption: "Fifty Oversized T-Shirt, styled loose", href: "/product/fifty-oversized-tshirt" },
      { seed: "lookbook-everyday-2", caption: "Layered outfit, everyday rotation" },
      { seed: "lookbook-everyday-3", caption: "Fifty Varsity Jacket, outerwear layer", href: "/product/fifty-varsity-jacket" },
    ],
  },
];

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold uppercase tracking-wide text-white">Lookbook</h1>
      <p className="mb-10 max-w-xl text-sm text-white/60">
        An editorial look at how 2Fitty pieces are worn -- placeholder
        photography shown below until real campaign images are ready.
      </p>
      <div className="flex flex-col gap-14">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="mb-6 text-xl font-bold uppercase tracking-wide text-white">
              {section.title}
            </h2>
            <LookbookGrid shots={section.shots} />
          </section>
        ))}
      </div>
    </div>
  );
}
