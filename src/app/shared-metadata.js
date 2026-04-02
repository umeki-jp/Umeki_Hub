// src/app/shared-metadata.js
export const baseMetadata = {
  title: "Official Hub | Umeki_Apps",
  description: "業務効率・リスク管理Webアプリのポータルサイト",
  openGraph: {
    title: "Official Hub | Umeki_Apps",
    description: "業務効率・リスク管理Webアプリのポータルサイト",
    url: "https://umeki-hub.vercel.app",
    siteName: "Umeki_Apps",
    images: [
      {
        url: "/ogp.png", // public/ogp.png を参照
        width: 1200,
        height: 630,
        alt: "Umeki_Apps Official Hub",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Hub | Umeki_Apps",
    description: "業務効率・リスク管理Webアプリのポータルサイト",
    images: ["/ogp.png"],
  },
};