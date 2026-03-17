import { Metadata } from 'next';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import ShareCardClient from "./ShareCardClient";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const card = await convex.query(api.shareCards.getShareCard, { slug: params.slug });
  
  if (!card) {
    return {
      title: "VAULTA | Not Found",
    };
  }

  const title = `VAULTA | ${card.type.toUpperCase()} SHARED`;
  const description = card.type === 'streak' 
    ? `I'm on a ${card.data.streak} week streak earning yield on Base!` 
    : `Check out my progress on VAULTA!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://vaulta.xyz/share/${params.slug}`,
      siteName: 'VAULTA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function SharePage({ params }: { params: { slug: string } }) {
  const card = await convex.query(api.shareCards.getShareCard, { slug: params.slug });

  return <ShareCardClient card={card} slug={params.slug} />;
}
