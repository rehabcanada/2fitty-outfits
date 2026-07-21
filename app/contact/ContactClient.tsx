"use client";

import { useState } from "react";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const next: { [k: string]: string } = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Please include a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    setSubmitting(true);
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...form, formType: "contact" }),
        });
        if (!res.ok) throw new Error("Failed to send message.");
      } else {
        // Fallback when no Formspree endpoint is configured yet.
        console.log("Contact message submitted (no Formspree endpoint configured):", form);
        // const mailto = `mailto:hello@2fittyoutfits.com?subject=${encodeURIComponent(
        //   "Website Contact"
        // )}&body=${encodeURIComponent(form.message)}`;
        // window.location.href = mailto;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your message. Please try emailing us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-brand-silver/10 bg-brand-charcoal p-8 text-center">
        <h2 className="mb-2 text-xl font-bold text-white">Message Sent</h2>
        <p className="text-sm text-white/70">
          Thanks for reaching out -- we&apos;ll get back to you as soon as we
          can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
          Name *
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          aria-invalid={!!errors.name}
          className="w-full rounded-lg border border-brand-silver/20 bg-brand-charcoal px-3 py-2.5 text-sm text-white focus:border-brand-silver"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
          Email *
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          aria-invalid={!!errors.email}
          className="w-full rounded-lg border border-brand-silver/20 bg-brand-charcoal px-3 py-2.5 text-sm text-white focus:border-brand-silver"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          aria-invalid={!!errors.message}
          placeholder="Questions about sizing, availability, bundles, shipping, or pickup -- ask away."
          className="w-full rounded-lg border border-brand-silver/20 bg-brand-charcoal px-3 py-2.5 text-sm text-white focus:border-brand-silver"
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      {submitError && <p className="text-sm text-red-400">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary self-start"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
