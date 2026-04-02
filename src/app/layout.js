import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Official Hub | Umeki_Apps",
  description: "日本を拠点に、個人開発と業務システムの改善に取り組むプロジェクトのポータルサイト。",
  openGraph: {
    title: "Official Hub | Umeki_Apps",
    description: "業務改善・危機管理Webアプリのポータルサイト",
    url: "https://umeki-hub.vercel.app",
    siteName: "Umeki_Apps",
    images: [
      {
        url: "/ogp.png",
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
    description: "業務改善・危機管理Webアプリのポータルサイト",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}