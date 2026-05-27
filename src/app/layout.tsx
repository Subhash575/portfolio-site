import type { Metadata } from "next";
import { Inter, Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PersonJsonLd } from "@/components/JsonLd";

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontHeading = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontMono = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Subhash Rana | Full Stack Developer",
    template: "%s | Subhash Rana",
  },
  description:
    "Full Stack Developer building scalable web apps. Open to new opportunities.",
  metadataBase: new URL("https://subhashrana.dev"),
  openGraph: {
    title: "Subhash Rana | Full Stack Developer",
    description:
      "Full Stack Developer portfolio — projects, experience, and contact.",
    url: "https://subhashrana.dev",
    siteName: "Subhash Rana",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhash Rana | Full Stack Developer",
    description: "Full Stack Developer portfolio.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontHeading.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-surface text-primary">
        <ThemeProvider>
          <Navbar />
          <div className="grow">{children}</div>
          <Footer />
        </ThemeProvider>
        <PersonJsonLd />
      </body>
    </html>
  );
}
