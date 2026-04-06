"use client";

import { useState } from 'react';
import { signup, login, signInWithGoogle } from '../auth/actions';
import { useLanguage } from '../../context/LanguageContext';
import Image from "next/image";
// --- 【修正箇所1】useSearchParams をインポート ---
import { useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const { lang } = useLanguage();
  
  // --- 【修正箇所1】URLからエラーメッセージを取得 ---
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const content = {
    title: { ja: isLogin ? "ログイン" : "アカウント作成", en: isLogin ? "Sign In" : "Create Account" },
    submit: { ja: isLogin ? "ログイン" : "新規登録", en: isLogin ? "Sign In" : "Sign Up" },
    switchText: { 
      ja: isLogin ? "アカウントをお持ちでないですか？" : "既にアカウントをお持ちですか？", 
      en: isLogin ? "Don't have an account?" : "Already have an account?" 
    },
    switchBtn: { ja: isLogin ? "新規登録" : "ログイン", en: isLogin ? "Sign Up" : "Sign In" },
    or: { ja: "または", en: "Or continue with" }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-3xl font-black mb-8 text-white">{content.title[lang]}</h1>
      
      {/* --- 【修正箇所2】エラーがある場合のみ赤いボックスを表示 --- */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl animate-in fade-in slide-in-from-top-2">
          <p className="text-red-500 text-sm font-bold text-center">
            {/* Supabaseの英語エラーを簡易的に日本語化（必要に応じて増やしてください） */}
            {error === 'Invalid login credentials' 
              ? (lang === 'ja' ? 'メールアドレスまたはパスワードが正しくありません。' : error)
              : error === 'User already registered'
              ? (lang === 'ja' ? 'このメールアドレスは既に登録されています。' : error)
              : error}
          </p>
        </div>
      )}
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-300">Email</label>
          <input 
            name="email" 
            type="email" 
            required 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-300">Password</label>
          <input 
            name="password" 
            type="password" 
            required 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
        
        <button 
          formAction={isLogin ? login : signup}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition shadow-lg"
        >
          {content.submit[lang]}
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-slate-500">{content.or[lang]}</span>
          </div>
        </div>

        <button
          formAction={signInWithGoogle}
          formNoValidate
          className="w-full transition flex items-center justify-center p-0 overflow-hidden rounded-md border border-transparent hover:opacity-90"
        >
          <Image
            src={isLogin
              ? "/assets/images/web_light_sq_SI@3x.png"
              : "/assets/images/web_light_sq_SU@3x.png"
            }
            alt="Google"
            width={400} 
            height={100}
            className="w-full h-auto object-contain"
          />
        </button>

        <div className="mt-8 text-center text-sm">
          <p className="text-slate-400 mb-2">{content.switchText[lang]}</p>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 font-bold hover:underline"
          >
            {content.switchBtn[lang]}
          </button>
        </div>
      </form>
    </div>
  );
}