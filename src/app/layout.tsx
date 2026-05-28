import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Provider";

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WEBX Solution — High-Performance Web Development & Digital Automation",
  description:
    "WEBX Solution builds premium, high-converting websites and digital automation systems for businesses. Get a stunning online presence that drives real results.",
  keywords: [
    "web development",
    "website design",
    "digital automation",
    "WEBX Solution",
    "business website",
    "web agency",
  ],
  authors: [{ name: "WEBX Solution" }],
  creator: "WEBX Solution",
  publisher: "WEBX Solution",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WEBX Solution",
    title: "WEBX Solution — High-Performance Web Development & Digital Automation",
    description:
      "We build premium, high-converting websites and digital automation systems for businesses. Get a stunning online presence that drives real results.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WEBX Solution — High-Performance Web Development & Digital Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEBX Solution — High-Performance Web Development",
    description:
      "Premium websites & digital automation for businesses. Get a stunning online presence that drives real results.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://portfolio-website-roan-five-25.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#050505]">
      <body className={`${rajdhani.variable} ${jetbrains.variable} font-sans bg-[#050505] text-[#E0E0E0] antialiased selection:bg-[#00FFAA] selection:text-[#050505] overflow-x-hidden line-numbers`}>
        <Providers>
          <div className="fixed inset-0 pointer-events-none z-[-1] crt-overlay"></div>
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
