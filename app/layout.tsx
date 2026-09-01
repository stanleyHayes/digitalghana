import type { Metadata } from "next";
import "./styles.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
