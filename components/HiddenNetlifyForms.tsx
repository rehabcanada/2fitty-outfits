// Static, hidden HTML form used ONLY so Netlify's build-time bot can detect
// the shape of the "order-request" form.
//
// Netlify Forms works by scanning the static HTML output at build/deploy
// time for <form data-netlify="true" name="..."> tags with matching field
// names (plus a hidden form-name input). It cannot detect forms that only
// ever get rendered/submitted via client-side JavaScript, which is how
// components/OrderRequestForm.tsx works (it's a "use client" React form
// submitted with fetch()). The standard workaround -- documented by
// Netlify -- is to keep a plain, hidden, server-rendered form with the same
// name and field names somewhere in the static output (this one, rendered
// in the root layout) purely for detection, while the real interactive form
// does the actual client-side POST to "/" with the same form-name value.
//
// This form is never shown or interacted with by users (hidden attribute +
// aria-hidden), and it intentionally has no onSubmit handler.
export default function HiddenNetlifyForms() {
  return (
    <form
      name="order-request"
      data-netlify="true"
      netlify-honeypot="bot-field"
      hidden
      aria-hidden="true"
    >
      <input type="hidden" name="form-name" value="order-request" />
      <input type="text" name="bot-field" />
      <input type="text" name="fullName" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="preferredContact" />
      <input type="text" name="city" />
      <input type="text" name="region" />
      <input type="text" name="product" />
      <input type="text" name="colour" />
      <input type="text" name="size" />
      <input type="number" name="quantity" />
      <input type="text" name="fulfillment" />
      <input type="text" name="instagram" />
      <textarea name="notes" />
      <input type="text" name="understandRequest" />
      <input type="text" name="agreeContact" />
    </form>
  );
}
