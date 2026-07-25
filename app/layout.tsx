import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Multi-Agent AI Automation Demo Platform | Elixr Co.",
  description: "Portfolio of production-style AI agents with visual n8n-style automation workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} bg-[#0B0F17] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
