import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { PageTransitionProvider } from "@/components/PageTransition";

const poppins = Poppins({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ecoh - Selamatkan Bumi Dari Lautan Sampah",
  description: "ecoh adalah website peduli lingkungan dengan menghadirkan berbagai game lingkungan yang menarik agar anak - anak bisa lebih perhatian terhadap lingkungan",
};

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageTransitionProvider>{children}</PageTransitionProvider></body>
    </html>
  );
}
