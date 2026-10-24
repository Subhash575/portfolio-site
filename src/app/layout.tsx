import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PersonJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/data";

const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontHand = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "600",
});

const fontCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
});

const title = `${siteConfig.name} | Full-stack engineer building AI agents`;

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontHand.variable} ${fontCode.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
        <PersonJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
