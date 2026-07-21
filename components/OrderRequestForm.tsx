"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { useOrderBag } from "@/context/OrderBagContext";

const CONTACT_METHODS = ["Email", "Phone", "Instagram DM"];
const FULFILLMENT_OPTIONS = ["Pickup", "Local Delivery", "Shipping"];

// Encodes a flat object as application/x-www-form-urlencoded, which is what
// Netlify Forms expects on the POST body (see handleSubmit below).
function encodeFormData(data: Record<string, string | number | boolean>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(data[key]))}`)
    .join("&");
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  city: string;
  region: string;
  colour: string;
  size: string;
  quantity: number;
  fulfillment: string;
  instagram: string;
  notes: string;
  understandRequest: boolean;
  agreeContact: boolean;
}

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: CONTACT_METHODS[0],
  city: "",
  region: "",
  colour: "",
  size: "",
  quantity: 1,
  fulfillment: FULFILLMENT_OPTIONS[0],
  instagram: "",
  notes: "",
  understandRequest: false,
  agreeContact: false,
};

export default function OrderRequestForm() {
  const searchParams = useSearchParams();
  const { items: bagItems, clearBag } = useOrderBag();

  const fromBag = searchParams.get("fromBag") === "1";
  const productSlug = searchParams.get("product") || "";
  const queryProduct = productSlug ? getProductBySlug(productSlug) : undefined;
  const querySize = searchParams.get("size") || "";
  const queryPrice = searchParams.get("price") || "";

  const queryColour = searchParams.get("colour") || "";

  const productSummary = useMemo(() => {
    if (fromBag && bagItems.length > 0) {
      return bagItems
        .map((i) => `${i.name} - Colour ${i.colour} - Size ${i.size} x${i.quantity} - $${i.price} CAD`)
        .join("; ");
    }
    if (queryProduct) {
      return `${queryProduct.name} - Colour ${queryColour || queryProduct.colours[0]} - Size ${querySize || queryProduct.sizes[0]} - $${queryPrice || queryProduct.price} CAD`;
    }
    return "";
  }, [fromBag, bagItems, queryProduct, querySize, queryColour, queryPrice]);

  const [form, setForm] = useState<FormState>({
    ...initialState,
    size: querySize || queryProduct?.sizes[0] || "",
    colour: queryColour || queryProduct?.colours[0] || "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.region.trim()) next.region = "Province / region is required.";
    if (!form.understandRequest) next.understandRequest = "This must be acknowledged to continue.";
    if (!form.agreeContact) next.agreeContact = "This must be acknowledged to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    const payload = {
      fullName: form.fullName,
      email: form.email,
      colour: form.colour,
      phone: form.phone,
      preferredContact: form.preferredContact,
      city: form.city,
      region: form.region,
      product: productSummary || "Not specified",
      size: form.size,
      quantity: form.quantity,
      fulfillment: form.fulfillment,
      instagram: form.instagram,
      notes: form.notes,
    };

    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    setSubmitting(true);
    try {
      // Primary path: Netlify Forms. This is a POST of URL-encoded form
      // data to "/" with a "form-name" field matching the hidden static
      // form Netlify's build-time bot detects (see
      // public/__forms.html). This is the
      // standard documented workaround for using Netlify Forms with a
      // JS-rendered/React form instead of a native HTML POST. Submissions
      // show up in the Netlify dashboard (Forms tab) and are readable from
      // /admin-requests via the get-submissions serverless function.
      //
      // This only actually registers with Netlify once the site is
      // deployed on Netlify with the hidden form present in the built HTML
      // -- during local `next dev` it will typically fail silently or
      // 404/400, which is expected and not a bug.
      let netlifyOk = false;
      try {
        const res = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodeFormData({
            "form-name": "order-request",
            understandRequest: form.understandRequest ? "yes" : "no",
            agreeContact: form.agreeContact ? "yes" : "no",
            ...payload,
          }),
        });
        netlifyOk = res.ok;
      } catch {
        netlifyOk = false;
      }

      // Secondary/fallback path: Formspree, if configured. Kept so requests
      // aren't lost if Netlify Forms isn't set up yet (e.g. during local
      // development, or a non-Netlify host).
      if (formspreeEndpoint) {
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok && !netlifyOk) throw new Error("Form submission failed.");
      } else if (!netlifyOk) {
        // Neither Netlify Forms nor Formspree succeeded (most likely: this
        // is running locally, not on Netlify). Log to console so the
        // request isn't silently lost during development.
        console.log("Order request submitted (no live form backend reached):", payload);
      }
      setSubmitted(true);
      if (fromBag) clearBag();
    } catch (err) {
      setSubmitError(
        "Something went wrong sending your request. Please try again or reach out directly via Contact."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-brand-silver/10 bg-brand-charcoal p-8 text-center">
        <h1 className="mb-3 text-2xl font-bold text-white">Purchase Request Received</h1>
        <p className="text-sm text-white/70">
          Your request has been received. 2Fitty Outfits will contact you to
          confirm product availability, payment and delivery or pickup
          details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto flex max-w-2xl flex-col gap-6">
      {productSummary && (
        <div className="rounded-lg border border-brand-silver/10 bg-brand-charcoal p-4 text-sm text-white/80">
          <span className="block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Requesting
          </span>
          {productSummary}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-xs text-red-400">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
        </div>

        <div>
          <label htmlFor="preferredContact" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Preferred Contact Method
          </label>
          <select
            id="preferredContact"
            value={form.preferredContact}
            onChange={(e) => update("preferredContact", e.target.value)}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          >
            {CONTACT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            City *
          </label>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
          {errors.city && (
            <p id="city-error" className="mt-1 text-xs text-red-400">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="region" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Province / Region *
          </label>
          <input
            id="region"
            type="text"
            value={form.region}
            onChange={(e) => update("region", e.target.value)}
            aria-invalid={!!errors.region}
            aria-describedby={errors.region ? "region-error" : undefined}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
          {errors.region && (
            <p id="region-error" className="mt-1 text-xs text-red-400">
              {errors.region}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="colour" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Colour
          </label>
          <input
            id="colour"
            type="text"
            value={form.colour}
            onChange={(e) => update("colour", e.target.value)}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
        </div>

        <div>
          <label htmlFor="size" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Preferred Size
          </label>
          <input
            id="size"
            type="text"
            value={form.size}
            onChange={(e) => update("size", e.target.value)}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={form.quantity}
            onChange={(e) => update("quantity", Number(e.target.value))}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
        </div>

        <div>
          <label htmlFor="fulfillment" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Fulfillment
          </label>
          <select
            id="fulfillment"
            value={form.fulfillment}
            onChange={(e) => update("fulfillment", e.target.value)}
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          >
            {FULFILLMENT_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="instagram" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
            Instagram Username (optional)
          </label>
          <input
            id="instagram"
            type="text"
            value={form.instagram}
            onChange={(e) => update("instagram", e.target.value)}
            placeholder="@yourhandle"
            className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1 block text-xs font-bold uppercase tracking-widest2 text-brand-silver">
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Bundle requests, questions about sizing, anything else we should know."
          className="w-full rounded-lg border border-brand-silver/20 bg-brand-black px-3 py-2.5 text-sm text-white focus:border-brand-silver"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-brand-silver/10 bg-brand-charcoal p-4">
        <label className="flex items-start gap-3 text-sm text-white/80">
          <input
            type="checkbox"
            checked={form.understandRequest}
            onChange={(e) => update("understandRequest", e.target.checked)}
            aria-invalid={!!errors.understandRequest}
            aria-describedby={errors.understandRequest ? "understandRequest-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-silver/30 bg-brand-black"
          />
          <span>
            I understand that this is a purchase request and no payment has been collected.
          </span>
        </label>
        {errors.understandRequest && (
          <p id="understandRequest-error" className="text-xs text-red-400">
            {errors.understandRequest}
          </p>
        )}

        <label className="flex items-start gap-3 text-sm text-white/80">
          <input
            type="checkbox"
            checked={form.agreeContact}
            onChange={(e) => update("agreeContact", e.target.checked)}
            aria-invalid={!!errors.agreeContact}
            aria-describedby={errors.agreeContact ? "agreeContact-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-silver/30 bg-brand-black"
          />
          <span>I agree to be contacted by 2Fitty Outfits about this request.</span>
        </label>
        {errors.agreeContact && (
          <p id="agreeContact-error" className="text-xs text-red-400">
            {errors.agreeContact}
          </p>
        )}
      </div>

      {submitError && (
        <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full"
      >
        {submitting ? "Sending Request..." : "Request to Purchase"}
      </button>

      <p className="text-center text-xs text-white/50">
        No payment is collected here. 2Fitty Outfits will follow up to confirm availability, payment and delivery or pickup details.
      </p>
    </form>
  );
}
