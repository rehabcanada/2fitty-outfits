import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { OrderBagProvider } from "@/context/OrderBagContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderBagDrawer from "@/components/OrderBagDrawer";
import HiddenNetlifyForms from "@/components/HiddenNetlifyForms";

// Brand suite typography: bold/condensed heading font + clean sans body
// copy. This intentionally does NOT use next/font/google (which fetches
// font files from Google Fonts at build time) -- that fetch is unreliable
// in network-restricted build environments and isn't required: the brand
// suite explicitly allows a bold-900 system fallback stack as an
// alternative to Anton/Archivo Black. The actual font stacks are defined
// once in globals.css via the --font-heading / --font-body CSS variables.

export const metadata: Metadata = {
  metadataBase: new URL("https://2fittyoutfits.example.com"),
  title: {
    default: "2Fitty Outfits | Original Streetwear and Matching Sets",
    template: "%s | 2Fitty Outfits",
  },
  description:
    "Shop original hoodies, sweatpants, T-shirts, shorts and matching sets designed by 2Fitty Outfits.",
  openGraph: {
    title: "2Fitty Outfits | Original Streetwear and Matching Sets",
    description:
      "Shop original hoodies, sweatpants, T-shirts, shorts and matching sets designed by 2Fitty Outfits.",
    // Placeholder OG image -- replace with a real branded image before launch.
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-brand-black font-sans text-white antialiased">
        {/*
          Netlify Identity widget -- powers login for the Decap CMS admin at
          /admin (via Git Gateway) and for the owner-only /admin-requests
          page. Loading it globally means netlifyIdentity.currentUser() is
          available anywhere in the app.

          NOTE (dashboard-only step, cannot be done from code): Identity
          must be enabled for this site under Site settings -> Identity in
          the Netlify dashboard before this widget can authenticate anyone,
          and Git Gateway must be enabled under Identity -> Services for
          Decap CMS to be able to commit content changes. See README.
        */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-init" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
        {/*
          Hidden static form used purely so Netlify's build-time HTML scan
          can detect the "order-request" form's field shape (Netlify Forms
          requires a plain <form data-netlify> somewhere in the built static
          HTML -- it can't detect forms submitted only via client-side JS).
          The real, visible form (components/OrderRequestForm.tsx) submits
          to this same form name via fetch(). See that file for details.
        */}
        <HiddenNetlifyForms />
        <OrderBagProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <OrderBagDrawer />
        </OrderBagProvider>
      </body>
    </html>
  );
}
