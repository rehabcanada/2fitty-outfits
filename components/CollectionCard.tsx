import Link from "next/link";
import Image from "next/image";

export default function CollectionCard({
  title,
  href,
  imageSeed,
}: {
  title: string;
  href: string;
  imageSeed: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-brand-charcoal"
    >
      <Image
        src={`https://picsum.photos/seed/${imageSeed}/500/650`}
        alt={title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span className="absolute bottom-4 left-4 right-4 text-base font-bold uppercase tracking-wide text-white">
        {title}
      </span>
    </Link>
  );
}
