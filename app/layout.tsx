import type { Metadata } from "next";
import { Geist_Mono, Newsreader, Outfit } from "next/font/google";
import "./styles.css";

const sans = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const title = Newsreader({ subsets: ["latin"], variable: "--font-title", display: "swap" });

export const metadata: Metadata = {
  title: "Digital Ghana — Open public infrastructure",
  description: "A public catalogue of small, composable open-source infrastructure built for Ghana.",
  metadataBase: new URL("https://digitalghana.dev"),
  openGraph: {
    title: "Digital Ghana",
    description: "Open digital building blocks for Ghana.",
    url: "https://digitalghana.dev",
    siteName: "Digital Ghana",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${title.variable}`}>
      <body>{children}</body>
    </html>
  );
}
