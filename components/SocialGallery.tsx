import Image from "next/image";

// Placeholder Instagram-style gallery. Replace image seeds / add real post
// links once the owner's Instagram account has content to pull from.
const GALLERY_SEEDS = [
  "wear-2fitty-1",
  "wear-2fitty-2",
  "wear-2fitty-3",
  "wear-2fitty-4",
  "wear-2fitty-5",
  "wear-2fitty-6",
];

export default function SocialGallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
          Wear 2Fitty
        </h2>
        <p className="mt-2 max-w-md text-sm text-white/60">
          Fits, new releases and behind-the-scenes updates from 2Fitty Outfits.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-6">
        {GALLERY_SEEDS.map((seed) => (
          <div key={seed} className="relative aspect-square overflow-hidden rounded-lg border border-brand-silver/10">
            <Image
              src={`https://picsum.photos/seed/${seed}/300/300`}
              alt="2Fitty Outfits community photo placeholder"
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {/* Placeholder link -- update with the real Instagram handle URL */}
        <a
          href="https://instagram.com/2fittyoutfits"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Follow @2FittyOutfits
        </a>
      </div>
    </section>
  );
}
