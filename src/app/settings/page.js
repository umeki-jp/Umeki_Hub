"use client";
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Settings</h1>

      <div className="space-y-6">
        {/* 将来のログイン・アカウント連携用セクション */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm opacity-60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Account Status</h2>
              <p className="text-sm text-slate-500">現在、ゲストユーザーとして利用中です。</p>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-400 text-xs font-bold rounded-full">
              Coming Soon
            </span>
          </div>
          <button 
            disabled 
            className="w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-bold cursor-not-allowed"
          >
            ログイン / アカウント作成（準備中）
          </button>
        </section>

        {/* アプリ設定（将来用） */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-slate-800">General Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-sm text-slate-600">表示モード</span>
              <span className="text-xs font-mono text-slate-400">System Default</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600">言語 / Language</span>
              <span className="text-xs font-mono text-slate-400">日本語</span>
            </div>
          </div>
        </section>

        {/* 開発者向け情報 */}
        <section className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs text-blue-600 leading-relaxed">
            <strong>Info:</strong> この画面は将来の拡張用です。Portal_LinkMasterとの連携や、J-CIRCONの有料プラン（拡張BCPなど）のライセンス管理機能を統合する際の入口となります。
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600">
          ← ダッシュボードへ戻る
        </Link>
      </div>
    </div>
  );
}