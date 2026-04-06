"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import { APP_DICTS } from "../utils/constants";
import { createClient } from "../utils/supabase/client";

export default function ClientLayout({ children }) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}

function LayoutContent({ children }) {
  const { lang, changeLanguage } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  // --- 認証状態の管理を追加 ---
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };
  checkUser();

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  // -------------------------

  return (
    <body className="bg-slate-950 text-slate-200 min-h-screen flex flex-col font-sans antialiased">
      <header className="h-[64px] bg-slate-950 text-white border-b border-slate-800 px-4 sticky top-0 z-50 flex items-center">
        <div className="container mx-auto flex justify-between items-center px-4 w-full">
          <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition">
            Umeki_Apps
          </Link>
          <nav className="flex items-center gap-6 text-sm font-bold">
            {/* 言語切替ボタン */}
            <button
              type="button"
              onClick={() => changeLanguage(lang === "ja" ? "en" : "ja")}
              className="px-2 py-1 rounded-md border border-slate-600 text-slate-200 hover:text-white hover:border-slate-400 transition"
            >
              {lang === "ja" ? "JA/EN" : "EN/JA"}
            </button>

            {/* Profile（開発者情報：既存の役割） */}
            <Link href="/profile" className="hover:text-blue-400 transition">
              {t.NAV.PROFILE[lang]}
            </Link>

            {/* Settings（ログイン状態の表示と設定へのリンク） */}
            <Link href="/settings" className="flex items-center gap-2 hover:text-blue-400 transition">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-400">{t.NAV.SETTINGS[lang]}</span>
                </div>
              ) : (
                <span>{t.NAV.SETTINGS[lang]}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 pt-6 pb-8 md:pb-28 flex flex-col bg-transparent z-10">
        <div className="w-full">
          {children}
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6 px-4 mt-auto w-full md:fixed md:bottom-0 md:left-0 md:z-40">
        <div className="container mx-auto text-center space-y-4">
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
    </body>
  );
}