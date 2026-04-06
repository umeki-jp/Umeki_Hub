"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from "../../context/LanguageContext";
import { APP_DICTS } from "../../utils/constants";
import { createClient } from "../../utils/supabase/client";

export default function SettingsPage() {
  const { lang, changeLanguage } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 border-b border-slate-200 pb-4 text-white">
        {t.NAV.SETTINGS[lang]}
      </h1>

      <div className="space-y-6">
        {/* 将来のログイン・アカウント連携用セクション */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-200">Account Status</h2>
              <p className="text-sm text-slate-400">
                {user 
                  ? (lang === "ja" ? `ログイン中: ${user.email}` : `Logged in as: ${user.email}`)
                  : (lang === "ja" ? "現在、ゲストユーザーとして利用中です。" : "You are currently using as a guest user.")
                }
              </p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${user ? 'bg-green-900/30 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
              {user ? 'Active' : 'Guest'}
            </span>
          </div>
          
          {user ? (
            <form action="/auth/signout" method="post">
              <button className="w-full bg-slate-800 hover:bg-red-900/30 hover:text-red-400 text-slate-200 py-3 rounded-xl font-bold transition">
                {lang === "ja" ? "ログアウト" : "Sign Out"}
              </button>
            </form>
          ) : (
            <Link 
              href="/register" 
              className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3 rounded-xl font-bold transition"
            >
              {lang === "ja" ? "ログイン / アカウント作成" : "Login / Create Account"}
            </Link>
          )}
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