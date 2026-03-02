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
  title: "SYS.INIT // WEBCRAFTERS",
  description: "Automated high-performance web systems.",
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
