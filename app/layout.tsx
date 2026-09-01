import type { Metadata } from "next";
import { Geist_Mono, Newsreader, Outfit } from "next/font/google";
import "./styles.css";

const sans = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const title = Newsreader({ subsets: ["latin"], variable: "--font-title", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Digital Ghana — Open public infrastructure", template: "%s · Digital Ghana" },
  description: "A public catalogue of small, composable open-source infrastructure built for Ghana.",
  metadataBase: new URL("https://digitalghana.dev"),
  applicationName: "Digital Ghana",
  keywords: ["Digital Ghana", "Ghana open source", "digital public infrastructure", "Ghana APIs", "public-interest technology"],
  authors: [{ name: "Digital Ghana", url: "https://digitalghana.dev" }],
  creator: "Digital Ghana",
  publisher: "Digital Ghana",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Digital Ghana",
    description: "Open digital building blocks for Ghana.",
    url: "https://digitalghana.dev",
    siteName: "Digital Ghana",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Digital Ghana open public infrastructure portfolio" }],
  },
  twitter: { card: "summary_large_image", title: "Digital Ghana — Open public infrastructure", description: "Open digital building blocks for Ghana.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${title.variable}`}>
      <body>{children}</body>
    </html>
  );
}
