import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found | 2Fitty Outfits" };
  }
  return {
    title: `${product.name} | 2Fitty Outfits`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | 2Fitty Outfits`,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return <ProductDetailClient product={product} related={related} />;
}
