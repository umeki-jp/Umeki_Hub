"use client";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import { APP_DICTS } from "../utils/constants";

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

  return (
    <body className="bg-slate-950 text-slate-200 min-h-screen flex flex-col font-sans antialiased">
      <header className="bg-slate-950 text-white border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition">
            Umeki_Apps
          </Link>
          <nav className="flex items-center gap-6 text-sm font-bold">
            <button
              type="button"
              onClick={() => changeLanguage(lang === "ja" ? "en" : "ja")}
              className="px-2 py-1 rounded-md border border-slate-600 text-slate-200 hover:text-white hover:border-slate-400 transition"
              aria-label={lang === "ja" ? "Switch language to English" : "言語を日本語に切り替え"}
            >
              {lang === "ja" ? "JA/EN" : "EN/JA"}
            </button>
            <Link href="/profile" className="hover:text-blue-400 transition">
              {t.NAV.PROFILE[lang]}
            </Link>
            <Link href="/settings" className="hover:text-blue-400 transition">
              {t.NAV.SETTINGS[lang]}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-center bg-transparent">
        <div className="w-full">
          {children}
        </div>
      </main>

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
    </body>
  );
}