import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Umeki_Hub | Official Portal",
  description: "日本を拠点に、個人開発と業務システムの改善に取り組むプロジェクトのポータルサイト。シンプルで再現性のあるアプリを継続的に開発中。",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
        {/* ヘッダー: Next.jsのLinkコンポーネントを使用 */}
        <header className="bg-slate-900 text-white shadow-md p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 hover:opacity-80 transition">
              🌏 Umeki_Hub
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-400 transition">Dashboard</Link>
              <Link href="/profile" className="hover:text-blue-400 transition">Profile</Link>
              <Link href="/settings" className="hover:text-blue-400 transition">Settings</Link>
            </nav>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>

        {/* フッター: 外部サイトは <a>、内部リンクは <Link> を使い分け */}
        <footer className="bg-slate-100 border-t border-slate-200 p-8 mt-10">
          <div className="container mx-auto text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
              <a 
                href="https://buymeacoffee.com/u1344" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-600 transition"
              >
                ☕ 開発支援
              </a>
              <Link href="/policy" className="hover:text-blue-600 transition">サイトポリシー</Link>
              <Link href="/privacy" className="hover:text-blue-600 transition">プライバシーポリシー</Link>
              <Link href="/contact" className="hover:text-blue-600 transition">お問い合わせ</Link>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} U1344 / Umeki_Hub. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}