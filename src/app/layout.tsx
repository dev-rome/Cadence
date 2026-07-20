import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence",
  description: "Incident response for small engineering teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} dark`}>
      <body className="bg-surface text-ink antialiased">{children}</body>
    </html>
  );
}
