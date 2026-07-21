import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | 2Fitty Outfits",
  description:
    "Questions about products, sizing, purchase requests, pickup, shipping, exchanges, or collaborations? Get in touch with 2Fitty Outfits.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide text-white">Contact</h1>
      <p className="mb-8 text-sm text-white/70">
        Got questions about products, sizing, a purchase request, pickup,
        shipping, exchanges, or a collaboration? Send a message below or
        reach out directly -- we typically respond within [24-48 hours].
      </p>

      <div className="mb-10 grid grid-cols-1 gap-4 rounded-xl border border-brand-silver/10 bg-brand-charcoal p-6 text-sm text-white/70 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-brand-silver">Email</p>
          {/* Placeholder email -- update before launch */}
          <p>hello@2fittyoutfits.com</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-brand-silver">Instagram</p>
          {/* Placeholder handle -- update before launch */}
          <p>@2fittyoutfits</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-brand-silver">Location</p>
          {/* Placeholder location -- update before launch */}
          <p>Local pickup available in select areas -- ships nationwide.</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-brand-silver">Response Time</p>
          <p>Usually within [24-48 hours].</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-brand-silver">Collaborations</p>
          <p>For collaboration or wholesale inquiries, mention it in your message below.</p>
        </div>
      </div>

      <ContactClient />
    </div>
  );
}
