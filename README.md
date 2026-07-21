# 2Fitty Outfits

A static, request-based storefront for 2Fitty Outfits' original streetwear,
built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. 2Fitty
Outfits designs and sells its own original clothing -- there is no third-party
brand or resale concept anywhere in this project. There is no real payment
processing, no accounts/auth, and no database -- the product catalogue is
static data, and every "purchase" is really a **request** that the owner
confirms directly with the buyer (via email/phone/Instagram).

## Project Structure

```
2fitty-outfits/
├── app/                        Next.js App Router pages
│   ├── layout.tsx               Root layout (AnnouncementBar, Header, Footer, RequestBagDrawer, providers)
│   ├── page.tsx                 Homepage
│   ├── globals.css              Tailwind base styles + focus-visible rules
│   ├── shop/                    /shop -- catalogue with filters + search
│   ├── collections/             /collections -- collection grid (2Fitty Core, Fifty Series, After Hours, Signature Sets)
│   ├── lookbook/                /lookbook -- editorial lookbook page
│   ├── product/[slug]/          /product/[slug] -- product detail page
│   ├── about/                   /about
│   ├── contact/                 /contact (form + placeholders)
│   ├── order-request/           /order-request (the purchase-request form)
│   ├── faq/                     /faq
│   ├── shipping-policy/         /shipping-policy
│   └── return-policy/           /return-policy (returns and exchanges)
├── components/                 Reusable UI components (Header, Footer, ProductCard, etc.)
├── context/OrderBagContext.tsx  React Context + localStorage-backed "Request Bag"
├── lib/
│   ├── types.ts                 Product/Category/Collection/Availability types
│   └── products.ts               Static product catalogue + collection/filter helpers
├── public/                      Static assets (drop real logo/photos here)
├── netlify.toml                 Netlify build config (@netlify/plugin-nextjs)
└── .env.example                 Environment variable template
```

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your real Formspree endpoint:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId
```

- Sign up at https://formspree.io, create a form, and use the endpoint it
  gives you (receiving email is configured on the Formspree side, in your
  Formspree dashboard -- set it to whichever inbox should get order requests
  and contact messages).
- Both the Order Request form (`components/OrderRequestForm.tsx`) and the
  Contact form (`app/contact/ContactClient.tsx`) POST JSON to this endpoint.
- If the env var is not set, both forms fall back to `console.log`-ing the
  submission instead of failing silently. A commented-out `mailto:` fallback
  is included in both files if you'd rather open the visitor's email client
  instead -- just uncomment those lines.
- The homepage email signup (`components/EmailSignup.tsx`) is currently a
  **placeholder only** -- it does not submit anywhere real yet. Wire it up
  the same way if you want real signups collected.

## Replacing the Logo

The owner shared a "2F" monogram + "2FITTY OUTFITS" wordmark concept as an
inline chat image, which is not saved anywhere as a usable file. Until the
real logo asset is provided, `components/Logo.tsx` renders a close
approximation using inline SVG + CSS only (no external image needed).

To swap in the real logo:

1. Drop the real logo file into `public/logo.png` or `public/logo.svg`.
2. Open `components/Logo.tsx` and replace the inline `<svg>`/text markup with
   a `next/image` (or `<img>`) tag, e.g.:

   ```tsx
   import Image from "next/image";
   <Image src="/logo.svg" alt="2Fitty Outfits" width={160} height={48} />
   ```
3. Remove the now-unused inline SVG monogram code.

The component is used in both `components/Header.tsx` and
`components/Footer.tsx`, so a single edit updates the logo site-wide.

## Adding / Editing Products

All product data lives in `lib/products.ts` as a plain array of objects
matching the `Product` type in `lib/types.ts`:

```ts
{
  id: "p11",
  name: "New Product Name",
  slug: "new-product-name",       // used for /product/[slug] and must be unique
  collection: "2Fitty Core",      // one of: 2Fitty Core, Fifty Series, After Hours, Signature Sets
  category: "Hoodies",            // one of: New Releases, Hoodies, Sweatshirts, Sweatpants, T-Shirts, Shorts, Matching Sets, Outerwear, Accessories
  price: 85,                      // CAD, plain number -- shown as "$85 CAD"
  description: "Full product description.",
  shortDescription: "Short one-line description.",
  colours: ["Black", "Grey"],
  sizes: ["S", "M", "L"],
  fit: "Relaxed fit.",
  materials: "[420 GSM cotton blend]",       // bracketed placeholders until confirmed
  careInstructions: "[Machine wash cold].",  // bracketed placeholders until confirmed
  availability: "In Stock",       // In Stock | Limited | Sold Out | Restocking | Pre-Order
  productStatus: "New Release",   // New Release | Limited | Coming Soon | Sold Out | Restocking | None
  featured: false,
  newRelease: true,
  images: ["https://picsum.photos/seed/new-product-name/800/1000"],
  sizeGuideInfo: "Relaxed fit. Select your regular size...",
}
```

Add a new object to the `products` array to add a product, edit an existing
object to update it, or remove an object to delete it. The shop page,
homepage New Releases grid, product detail pages, and related-products logic
all read from this same array automatically -- no other files need to
change.

Collection names (2Fitty Core, Fifty Series, After Hours, Signature Sets) are
defined once in `lib/products.ts` (`COLLECTIONS`) so they're easy to rename
later.

## Replacing Product Images

Every product currently uses placeholder images from `https://picsum.photos`
(seeded by slug, so they're stable across reloads). To use real photos:

1. Add your image files to `public/products/` (create the folder), e.g.
   `public/products/2fitty-core-heavyweight-hoodie-1.jpg`.
2. In `lib/products.ts`, update that product's `images` array to point at the
   local paths, e.g. `images: ["/products/2fitty-core-heavyweight-hoodie-1.jpg"]`.
3. Local images in `/public` work with `next/image` out of the box. If you
   instead use external image URLs, add the domain to
   `images.remotePatterns` in `next.config.mjs` (picsum.photos is already
   allowed there).

## Deploying to Netlify (Recommended)

This project includes a `netlify.toml` and is set up to use
`@netlify/plugin-nextjs`.

1. Install the plugin (already referenced in `netlify.toml`; Netlify installs
   it automatically during the build, but you can also add it locally):
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```
2. **Option A -- Connect a Git repo:** Push this project to GitHub/GitLab/
   Bitbucket, then in the Netlify dashboard choose "Add new site" → "Import
   an existing project" and select the repo. Netlify will detect
   `netlify.toml` and use `npm run build` automatically.
3. **Option B -- Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --build
   netlify deploy --build --prod
   ```
4. **Environment variables:** In the Netlify dashboard, go to
   Site configuration → Environment variables and add
   `NEXT_PUBLIC_FORMSPREE_ENDPOINT` with your real Formspree endpoint, then
   trigger a redeploy so the value is baked into the client bundle.

Vercel also works well for this project (it's a standard Next.js App Router
app with no special Netlify-only features) -- just import the repo at
vercel.com and set the same `NEXT_PUBLIC_FORMSPREE_ENDPOINT` environment
variable in the Vercel project settings.

## Admin Panel Setup

This project includes a lightweight admin panel so you can edit products and view purchase requests without touching code. It has two parts:

### 1. Editing products and images (Decap CMS)

Visit `/admin` on your deployed site to log in and edit product fields or upload images through a simple form-based UI. Behind the scenes this is [Decap CMS](https://decapcms.org) (config at `public/admin/config.yml`), which commits your edits directly to `content/products.json` and `content/settings.json` in this GitHub repo. Netlify then automatically rebuilds and redeploys the site (usually within a minute or two).

**One-time setup required in the Netlify dashboard (cannot be done from code):**
1. Deploy this repo to Netlify via a Git-connected site (see "Deploying to Netlify" below) -- Decap CMS will not work with a manual drag-and-drop deploy, since it needs to commit to the connected Git repo.
2. In the Netlify dashboard: **Site configuration → Identity → Enable Identity**.
3. Still under Identity, go to **Services → Git Gateway → Enable Git Gateway**. This lets Netlify Identity authenticate CMS users against your Git repo without you managing GitHub accounts for every admin.
4. Under **Identity → Invite users**, invite yourself (and anyone else who should be able to edit products) by email. You'll get an email to set a password.
5. Visit `https://yoursite.netlify.app/admin`, log in with that email/password, and you'll see the products collection ready to edit.

### 2. Viewing purchase requests (`/admin-requests`)

The Order Request form submits through **Netlify Forms** (Netlify's built-in form capture -- no database needed). Every submission is automatically saved and viewable in the Netlify dashboard under **Forms**. In addition, this project has a simple in-site page at `/admin-requests` that lists submissions in a table, gated behind the same Netlify Identity login as `/admin`.

**One-time setup required:**
1. Complete the Identity setup above first (admin-requests uses the same login).
2. Generate a Netlify **personal access token**: in the Netlify dashboard, go to your **User settings → Applications → Personal access tokens → New access token**. Copy it.
3. Find your **Site ID**: in the Netlify dashboard, go to **Site configuration → General → Site details**, copy the "Site ID" value.
4. In your Netlify site's **Environment variables**, add:
   - `NETLIFY_API_TOKEN` = the personal access token from step 2
   - `NETLIFY_SITE_ID` = the site ID from step 3
5. Redeploy. Visit `/admin-requests`, log in with your Identity account, and you'll see submitted purchase requests without needing to check email.

Both env vars are also documented in `.env.example`.

## Launch Checklist

Before taking this live, make sure to:

- [ ] Replace the placeholder logo (`components/Logo.tsx`) with the real
      2F monogram / wordmark file in `public/`.
- [ ] Replace placeholder product photos (`picsum.photos` URLs in
      `lib/products.ts`) with real product photography.
- [ ] Replace placeholder Lookbook photography (`picsum.photos` seeds in
      `app/lookbook/page.tsx` and `app/page.tsx`) with real campaign images.
- [ ] Confirm real fabric/manufacturing details and replace the bracketed
      placeholders in `lib/products.ts` (e.g. `[420 GSM cotton blend]`,
      `[Made in Canada]`, `[Imported]`).
- [ ] Set a real `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (in `.env.local` and in
      your hosting provider's environment variables) so order requests and
      contact messages actually reach an inbox.
- [ ] Wire up the homepage email signup (`components/EmailSignup.tsx`) to a
      real endpoint if you want to actually collect signups.
- [ ] Update the placeholder Instagram and TikTok links (in
      `components/Footer.tsx`, `components/SocialGallery.tsx`, and
      `app/contact/page.tsx`) with the real account URLs.
- [ ] Review and finalize the FAQ, Shipping Policy, and Returns and Exchanges
      pages (`app/faq`, `app/shipping-policy`, `app/return-policy`) to match
      your actual process -- each page has a "note to owner" reminder and
      bracketed placeholders at the bottom.
- [ ] Replace the placeholder contact email (`hello@2fittyoutfits.com`,
      referenced in `components/Footer.tsx` and `app/contact/page.tsx`) with
      the real inbox you want customers to use.
- [ ] Test the Order Request form end-to-end: submit a real request from the
      live site and confirm it arrives via Formspree (or your chosen
      fallback) before announcing the site is open for orders.

## Notes

- No real payments, checkout, accounts, or database are implemented by
  design -- every "Request to Purchase" / "Submit Purchase Request" action
  routes to the Order Request form, and the copy throughout the site makes
  clear that submitting a request does not guarantee the item or collect
  payment.
- The Request Bag (`context/OrderBagContext.tsx`, rendered by
  `components/OrderBagDrawer.tsx`) is a lightweight React Context backed by
  `localStorage` -- it is not a real shopping cart and never talks to a
  backend; it just prefills the Order Request form. Internal file/component
  names still say "OrderBag" to limit refactor risk, but all user-facing
  text says "Request Bag".
