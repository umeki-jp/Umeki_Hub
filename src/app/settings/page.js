"use client";
import Link from 'next/link';
import { useLanguage } from "../../context/LanguageContext";
import { APP_DICTS } from "../../utils/constants";

export default function SettingsPage() {
  const { lang, changeLanguage } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 border-b border-slate-200 pb-4 text-white">
        {t.NAV.SETTINGS[lang]}
      </h1>

      <div className="space-y-6">
        {/* 将来のログイン・アカウント連携用セクション */}
        <section className="bg-slate-900 border border-slate-200 rounded-2xl p-6 shadow-sm opacity-60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-200">Account Status</h2>
              <p className="text-sm text-slate-200">
                {lang === "ja" ? "現在、ゲストユーザーとして利用中です。" : "You are currently using as a guest user."}
              </p>
            </div>
            <span className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-bold rounded-full">
              Coming Soon
            </span>
          </div>
          <button 
            disabled 
            className="w-full bg-slate-800 text-slate-200 py-3 rounded-xl font-bold cursor-not-allowed"
          >
            {lang === "ja" ? "ログイン / アカウント作成（準備中）" : "Login / Create Account (Coming Soon)"}
          </button>
        </section>

        {/* アプリ設定（言語切り替え実装） */}
        <section className="bg-slate-900 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-slate-200">General Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-200">
              <span className="text-sm text-slate-200">{lang === "ja" ? "表示モード" : "Display Mode"}</span>
              <span className="text-xs font-mono text-slate-200">System Default</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-200">{t.COMMON.PLATFORMS_LABEL[lang] === "プラットフォーム" ? "言語" : "Language"}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => changeLanguage("ja")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition ${lang === "ja" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200 hover:text-white"}`}
                >
                  日本語
                </button>
                <button 
                  onClick={() => changeLanguage("en")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition ${lang === "en" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200 hover:text-white"}`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 開発者向け情報 */}
        <section className="p-4 bg-blue-950/20 border border-blue-900/30 rounded-xl">
          <p className="text-xs text-blue-400 leading-relaxed">
            <strong>Info:</strong> {lang === "ja" 
              ? "この画面は将来の拡張用です。Portal_LinkMasterとの連携や、J-CIRCONの有料プラン（拡張BCPなど）のライセンス管理機能を統合する際の入口となります。" 
              : "This screen is for future expansion. It will be the entry point for integration with Portal_LinkMaster and license management for J-CIRCON."}
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-slate-200 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-white transition-colors shadow-sm hover:shadow-md"
        >
          {t.COMMON.BACK_TO_DASHBOARD[lang]}
        </Link>
      </div>
    </div>
  );
}