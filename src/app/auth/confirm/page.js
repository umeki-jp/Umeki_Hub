"use client";

import { useLanguage } from '@/context/LanguageContext';
import { APP_DICTS } from '@/utils/constants';
import Link from 'next/link';

export default function ConfirmPage() {
  const { lang } = useLanguage();
  const text = APP_DICTS.UI_TEXT.AUTH;
  const commonText = APP_DICTS.UI_TEXT.COMMON;

  return (
    <div className="max-w-md mx-auto py-24 px-6 text-center">
      <div className="mb-8 flex justify-center">
        {/* メール送信をイメージさせるアイコン（簡易版） */}
        <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center">
          <span className="text-4xl">✉️</span>
        </div>
      </div>

      <h1 className="text-3xl font-black mb-6 text-white">
        {text.CONFIRM_TITLE[lang]}
      </h1>
      
      <p className="text-slate-400 leading-relaxed mb-10">
        {text.CONFIRM_MSG[lang]}
      </p>

      <div className="space-y-4">
        <Link 
          href="/register" 
          className="block w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-800 transition"
        >
          {text.BACK_TO_LOGIN[lang]}
        </Link>
        
        <Link 
          href="/" 
          className="block text-sm text-slate-500 hover:text-blue-400 transition"
        >
          {commonText.BACK_TO_DASHBOARD[lang]}
        </Link>
      </div>
    </div>
  );
}