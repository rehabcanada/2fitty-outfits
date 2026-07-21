import Link from "next/link";
import Image from "next/image";

export interface LookbookShot {
  seed: string;
  caption: string;
  href?: string;
}

// Editorial image grid used on the homepage Lookbook Preview and the full
// /lookbook page. Images are placeholder photography (picsum.photos seeded)
// -- swap the seeds for real campaign photography and this grid keeps working
// without any other changes.
export default function LookbookGrid({ shots }: { shots: LookbookShot[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {shots.map((shot) => {
        const content = (
          <>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-brand-charcoal">
              <Image
                src={`https://picsum.photos/seed/${shot.seed}/700/875`}
                alt={shot.caption}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/60">
              {shot.caption}
            </p>
          </>
        );
        return shot.href ? (
          <Link key={shot.seed} href={shot.href} className="group block">
            {content}
          </Link>
        ) : (
          <div key={shot.seed} className="group block">
            {content}
          </div>
        );
      })}
    </div>
  );
}
