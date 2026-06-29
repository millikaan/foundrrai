import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://foundrr.az"),
  title: {
    default: "Foundrr — Fikrini yaz. Saytın hazır olsun.",
    template: "%s · Foundrr",
  },
  description:
    "Azərbaycan üçün AI sayt qurucusu. Bir cümlə yaz — dəqiqələr içində hazır sayt. Öz hesabına yayımla, tam sənin olsun.",
  keywords: [
    "AI sayt qurucu",
    "Azərbaycan",
    "veb sayt",
    "biznes sayt",
    "Foundrr",
  ],
  authors: [{ name: "Foundrr" }],
  openGraph: {
    title: "Foundrr — Fikrini yaz. Saytın hazır olsun.",
    description:
      "Azərbaycan üçün AI sayt qurucusu. Bir cümlə yaz — dəqiqələr içində hazır sayt.",
    locale: "az_AZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7fbfb" },
    { media: "(prefers-color-scheme: dark)", color: "#111820" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
