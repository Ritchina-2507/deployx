import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeployX — Ship projects faster",
  description: "A Vercel-inspired deployment platform built for a portfolio project."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}