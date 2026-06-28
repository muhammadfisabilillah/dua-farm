import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Kita gunakan font Inter dari Google
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DUA FARM",
  description: "Pusat peternakan unggas terpercaya DUA FARM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}