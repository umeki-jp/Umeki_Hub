"use client";

import { useState } from 'react';
import { signup, login, signInWithGoogle } from '../auth/actions';
import { useLanguage } from '../../context/LanguageContext';
import Image from "next/image";


export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true); // ログインモードかどうかの状態
  const { lang } = useLanguage();

  // 多言語テキストの定義
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
        
        {/* 送信ボタン（アクションをモードで切り替え） */}
        <button 
          formAction={isLogin ? login : signup}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition shadow-lg"
        >
          {content.submit[lang]}
        </button>

        {/* 区切り線 */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-slate-500">{content.or[lang]}</span>
          </div>
        </div>

        {/* Googleボタン：保存いただいた画像を使用 */}
        <button
            formAction={signInWithGoogle}
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

        {/* モード切り替えボタン */}
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