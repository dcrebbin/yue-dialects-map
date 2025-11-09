import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { PostHogProvider } from "./components/PostHogProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "Yue Map | 粵地圖",
  description: "Cantonese dialects map",
  applicationName: "Yue Map",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Yue Map",
  },
  icons: [
    { rel: "icon", url: "/images/favicon.png" },
    { rel: "apple-touch-icon", url: "/images/favicon.png" },
  ],
  openGraph: {
    images: ["/images/og-image-yue.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
