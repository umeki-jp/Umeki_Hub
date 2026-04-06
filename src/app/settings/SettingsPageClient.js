"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { APP_DICTS } from "../../utils/constants";

export default function SettingsPageClient({ user, profileName }) {

  const { lang, changeLanguage } = useLanguage();
  const t = APP_DICTS.UI_TEXT;
  const a = APP_DICTS.UI_TEXT.ACCOUNT;
  const router = useRouter();

  // 未ログイン時はログイン画面へ遷移
  const handleAccountClick = (e) => {
    if (!user) {
      e.preventDefault();
      router.push("/register");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 border-b border-slate-200 pb-4 text-white">
        {t.NAV.SETTINGS[lang]}
      </h1>

      <div className="space-y-6">
        {/* アカウントステータス枠 */}
        <section className="bg-slate-900 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-slate-200">
            {lang === "ja" ? "アカウントステータス" : "Account Status"}
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                {user
                  ? lang === "ja"
                    ? `ログイン中: ${profileName || user.email}`
                    : `Logged in as: ${profileName || user.email}`
                  : lang === "ja"
                  ? "現在、ゲストユーザーとして利用中です。"
                  : "You are currently using as a guest user."}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${user ? "bg-green-900/30 text-green-400" : "bg-slate-800 text-slate-400"}`}
            >
              {user ? "Active" : "Guest"}
            </span>
          </div>
          {/* 未ログイン時はログイン/アカウント作成ボタン、ログイン時はログアウトボタンを表示 */}
          {!user ? (
            <div className="mt-4">
              <Link
                href="/register"
                className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3 rounded-xl font-bold transition"
              >
                {lang === "ja" ? "ログイン / アカウント作成" : "Login / Create Account"}
              </Link>
            </div>
          ) : (
            <form action="/auth/signout" method="post" className="mt-4">
              <button className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3 rounded-xl font-bold transition">
                {lang === "ja" ? "ログアウト" : "Sign Out"}
              </button>
            </form>
          )}
        </section>

        {/* アカウント情報編集枠（常に表示） */}
        <section className="bg-slate-900 border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-slate-200">
            {a.TITLE[lang]}
        </h2>

        <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            {/* 表示名 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            <span className="text-sm text-slate-400 sm:w-[120px] w-full shrink-0 pt-2 sm:pt-0">
                {a.DISPLAY_NAME[lang]}
            </span>

            <input
                type="text"
                value={
                user
                    ? profileName || user.email
                    : lang === "ja"
                    ? "未ログイン"
                    : "Not logged in"
                }
                disabled
                readOnly
                className="flex-1 w-full bg-slate-800 text-slate-300 rounded-md px-3 py-2 border border-slate-700 cursor-not-allowed min-w-0"
            />
            </div>

            {/* プラン */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            <span className="text-sm text-slate-400 sm:w-[120px] w-full shrink-0 pt-2 sm:pt-0">
                {a.PLAN[lang]}
            </span>

            <input
                type="text"
                value={user ? "free" : "-"}
                disabled
                readOnly
                className="flex-1 w-full bg-slate-800 text-slate-300 rounded-md px-3 py-2 border border-slate-700 cursor-not-allowed min-w-0"
            />
            </div>

            </div>
        </div>

        <Link
            href="/settings/account"
            className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3 rounded-xl font-bold transition"
            onClick={handleAccountClick}
        >
            {lang === "ja"
            ? "アカウント情報を編集・登録"
            : "Edit Account Information"}
        </Link>
        </section>

        {/* アプリ設定（言語切り替え実装） */}
        <section className="bg-slate-900 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-slate-200">
            {lang === "ja" ? "一般設定" : "General Settings"}
          </h2>
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
              ? "この画面は将来の拡張用です。Portal_LinkMaster始め各アプリとの連携や、プランのライセンス管理の入口となります。"
              : "This screen is for future expansion. It will serve as the entry point for linking with various apps including Portal_LinkMaster and managing plan licenses."}
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
