"use client";

import { useState } from "react";

// PLACEHOLDER email signup. This does not currently submit anywhere real --
// it only simulates a confirmation locally. To wire it up for real, point
// the form submit at a Formspree-style endpoint (see NEXT_PUBLIC_FORMSPREE_ENDPOINT
// in .env.example / README) the same way OrderRequestForm and ContactClient do.
export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // NOTE: this is a placeholder -- no email is actually sent/stored yet.
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h2 className="mb-2 text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
        Get notified about new 2Fitty releases
      </h2>
      <p className="mx-auto mb-6 max-w-md text-sm text-white/60">
        Be the first to know when new drops and matching sets go live.
      </p>
      {submitted ? (
        <p className="text-sm text-white/80">Thanks -- you&apos;re on the list.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="email-signup" className="sr-only">
            Email address
          </label>
          <input
            id="email-signup"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-full border border-white/20 bg-brand-charcoal px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-white px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-silverlight"
          >
            Notify Me
          </button>
        </form>
      )}
    </section>
  );
}
