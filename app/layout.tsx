import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weavertek.com"),
  title: {
    default: "Weaver - Social Media Analytics & Management for Content Creators",
    template: "%s | Weaver",
  },
  description:
    "Unified social media analytics platform for content creators and marketers. Track performance across Instagram, TikTok, YouTube, Twitter, and more with actionable insights powered by official APIs.",
  keywords: [
    "social media analytics",
    "content creator tools",
    "social media management",
    "influencer analytics",
    "multi-platform analytics",
    "Instagram analytics",
    "TikTok analytics",
    "YouTube analytics",
    "Twitter analytics",
    "social media dashboard",
    "creator analytics",
    "marketing analytics",
  ],
  authors: [{ name: "Weaver" }],
  creator: "Weaver",
  publisher: "Weaver",
  applicationName: "Weaver",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weavertek.com",
    siteName: "Weaver",
    title: "Weaver - Social Media Analytics & Management for Content Creators",
    description:
      "Unified social media analytics platform for content creators and marketers. Track performance across Instagram, TikTok, YouTube, Twitter, and more with actionable insights.",
    images: [
      {
        url: "/assets/logos/weaver_logo_upscaled.png",
        width: 1200,
        height: 630,
        alt: "Weaver - Social Media Analytics Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aadiwrks",
    creator: "@aadiwrks",
    title: "Weaver - Social Media Analytics & Management for Content Creators",
    description:
      "Unified social media analytics platform for content creators and marketers. Track performance across Instagram, TikTok, YouTube, Twitter, and more.",
    images: ["/assets/logos/weaver_logo_upscaled.png"],
  },
  alternates: {
    canonical: "https://weavertek.com",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://weavertek.com/#organization",
        name: "Weaver",
        url: "https://weavertek.com",
        logo: {
          "@type": "ImageObject",
          url: "https://weavertek.com/assets/logos/weaver_logo_upscaled.png",
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://x.com/aadiwrks",
          "https://www.tiktok.com/@adi.works",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://weavertek.com/#website",
        url: "https://weavertek.com",
        name: "Weaver",
        description:
          "Unified social media analytics platform for content creators and marketers",
        publisher: {
          "@id": "https://weavertek.com/#organization",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://weavertek.com/#softwareapplication",
        name: "Weaver",
        url: "https://weavertek.com",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        description:
          "Unified social media analytics platform that tracks performance across Instagram, TikTok, YouTube, Twitter, and more with actionable insights powered by official APIs.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "1",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
