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
  title: "AnyBuy | Everything for Everyone - All-in-One Online Marketplace",
  description:
    "Discover millions of products, all in one place at AnyBuy. Enjoy fast delivery, secure payments, and unbeatable daily deals on Electronics, Fashion, Home, and more.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://anybuy.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/anybuy-icon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/images/anybuy-icon.png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "AnyBuy - Your Everything Marketplace",
    description:
      "Shop millions of products at AnyBuy. Enjoy fast delivery, secure checkout, and daily deals on Electronics, Fashion, Home, and more.",
    url: "/",
    siteName: "AnyBuy",
    images: [
      {
        url: "/images/anybuy-og.png",
        width: 1200,
        height: 630,
        alt: "AnyBuy - Your Everything Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnyBuy - Your Everything Marketplace",
    description:
      "Shop millions of products at AnyBuy. Enjoy fast delivery, secure checkout, and daily deals on Electronics, Fashion, Home, and more.",
    images: ["/images/anybuy-og.png"],
  },
};

import { AuthProvider } from "@/lib/auth/AuthContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
