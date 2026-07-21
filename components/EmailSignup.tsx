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
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
      <h2 className="section-heading mb-2">
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
            className="w-full rounded-full border border-brand-silver/20 bg-brand-charcoal px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-colors duration-200 focus:border-brand-silver"
          />
          <button
            type="submit"
            className="btn-primary shrink-0"
          >
            Notify Me
          </button>
        </form>
      )}
    </section>
  );
}
