"use client"; // Contextを使用するため追加
import Link from "next/link";
import "./globals.css";
import { LanguageProvider, useLanguage } from "../context/LanguageContext"; // 追加
import { APP_DICTS } from "../utils/constants"; // 追加

// metadata は "use client" と共存できないため、
// 本来は layout.js から別ファイルに切り出すか、
// client component の外側（別のサーバーコンポーネント）で管理するのがNext.jsの定石ですが、
// 一旦エラーを消すために、Layout内部でLanguageProviderを動かします。

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-slate-950 text-slate-200 min-h-screen flex flex-col font-sans antialiased">
        <LanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}

// 実際の表示部分を切り分けることで、Providerの内側で hooks (useLanguage) を使えるようにします
function LayoutContent({ children }) {
  const { lang } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  return (
    <>
      {/* ヘッダー: 下部に境界線 */}
      <header className="bg-slate-950 text-white border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition">
            Umeki_Apps
          </Link>
          <nav className="flex gap-6 text-sm font-bold">
            <Link href="/profile" className="hover:text-blue-400 transition">
              {t.NAV.PROFILE[lang]}
            </Link>
            <Link href="/settings" className="hover:text-blue-400 transition">
              {t.NAV.SETTINGS[lang]}
            </Link>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow container mx-auto px-4 py-8 bg-transparent">
        {children}
      </main>

      {/* フッター: 上部に境界線 */}
      <footer className="bg-slate-950 border-t border-slate-800 p-10 mt-auto">
        <div className="container mx-auto text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-200 font-medium">
            <a href="https://buymeacoffee.com/u1344" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              {t.FOOTER.SUPPORT[lang]}
            </a>
            <Link href="/policy" className="hover:text-white transition">{t.FOOTER.POLICY[lang]}</Link>
            <Link href="/privacy" className="hover:text-white transition">{t.FOOTER.PRIVACY[lang]}</Link>
            <Link href="/contact" className="hover:text-white transition">{t.FOOTER.CONTACT[lang]}</Link>
          </div>
          <p className="text-[10px] text-slate-200 tracking-widest uppercase font-bold">
            &copy; {new Date().getFullYear()} Umeki / Official Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}