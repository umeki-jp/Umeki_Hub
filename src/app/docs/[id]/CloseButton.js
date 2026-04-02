"use client";
import { APP_DICTS } from '@/utils/constants';

export default function CloseButton({ lang, isTextMode = true }) {
  const t = APP_DICTS.UI_TEXT;
  const handleClose = () => {
    window.close();
  };

  // テキストモード（上部ナビ用）とボタンモード（下部用）を使い分け
  if (!isTextMode) {
    return (
      <button 
        onClick={handleClose} 
        className="text-sm text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors font-bold tracking-widest uppercase"
      >
        ✕ {t.COMMON.CLOSE[lang]}
      </button>
    );
  }

  return (
    <div className="mt-24 text-center pb-20 border-t border-slate-800 pt-10">
      <button 
        onClick={handleClose} 
        className="inline-flex items-center justify-center bg-slate-800 text-slate-200 border border-slate-700 font-bold py-4 px-12 rounded-full hover:bg-slate-700 hover:text-white transition-all shadow-xl active:scale-95"
      >
        <span className="mr-3 text-lg">✕</span>
        {t.COMMON.CLOSE[lang]}
      </button>
    </div>
  );
}