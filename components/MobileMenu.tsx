"use client";

import { useEffect } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  // Close on Escape for keyboard accessibility.
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col gap-1 border-l border-brand-silver/10 bg-brand-charcoal p-6">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-widest2 text-brand-silver">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Mobile primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
