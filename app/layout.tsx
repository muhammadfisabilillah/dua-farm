import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DUA FARM - Peternakan Unggas Terpercaya",
  description:
    "Solusi unggas berkualitas dari kandang langsung ke rumah atau UMKM Anda: ayam, joper, dan bibit segar, terstandarisi & higienis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-body bg-farm-cream antialiased">{children}</body>
    </html>
  );
}
