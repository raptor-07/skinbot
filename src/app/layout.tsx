import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Allura } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: "400", subsets: ["latin"] });
const allura = Allura({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chroma Skin",
  description: "Home for your skin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={allura.className}>{children}</body>
    </html>
  );
}
