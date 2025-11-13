import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Codex | Character Playbook",
  description:
    "Dive into an animated guide for Prismfall's legendary heroes. Explore deep-dive character profiles, strategy guides, and community fan art.",
  openGraph: {
    title: "Agentic Codex | Character Playbook",
    description:
      "Animated cards, strategy breakdowns, and community fan art for Prismfall heroes.",
    url: "https://agentic-77624a6d.vercel.app",
    siteName: "Agentic Codex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Aurora Vale commands shimmering light.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Codex | Character Playbook",
    description: "Prismfall hero spotlights, guides, and fan art.",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
