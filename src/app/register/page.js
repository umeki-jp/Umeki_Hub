
"use client";

import { useState, Suspense } from 'react';
import { signup, login, signInWithGoogle } from '../auth/actions';
import { useLanguage } from '../../context/LanguageContext';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import PasswordInput from '../components/PasswordInput';

function RegisterPageInner() {
  const [isLogin, setIsLogin] = useState(true); 
  const { lang } = useLanguage();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
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
  const passwordComplexity = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  const handleSubmit = (e) => {
    // 新規登録モードの時だけバリデーションを実行
    if (!isLogin) {
      if (password.length < 8) {
        e.preventDefault();
        alert(lang === 'ja' ? "パスワードは8文字以上必要です" : "Password must be at least 8 characters");
        return;
      }
      if (!passwordComplexity.test(password)) {
        e.preventDefault();
        alert(lang === 'ja'
          ? "パスワードには大文字・数字・記号をそれぞれ1文字以上含めてください"
          : "Password must contain at least one uppercase letter, number, and special character");
        return;
      }
      if (password !== confirmPassword) {
        e.preventDefault();
        alert(lang === 'ja' ? "パスワードが一致しません" : "Passwords do not match");
        return;
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-3xl font-black mb-8 text-white">{content.title[lang]}</h1>
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl animate-in fade-in slide-in-from-top-2">
          <p className="text-red-500 text-sm font-bold text-center">
            {error === 'Invalid login credentials' 
              ? (lang === 'ja' ? 'メールアドレスまたはパスワードが正しくありません。' : error)
              : error === 'User already registered'
              ? (lang === 'ja' ? 'このメールアドレスは既に登録されています。' : error)
              : error}
          </p>
        </div>
      )}
      <form 
        className="space-y-4" 
        onSubmit={handleSubmit}
        action={isLogin ? login : signup}
        >
        {!isLogin && (
            <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">
                {lang === 'ja' ? '名前' : 'Name'}
            </label>
            <input 
                name="display_name" 
                type="text" 
                required 
                maxLength={30} 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
            </div>
        )}
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-300">Email</label>
          <input 
            name="email" 
            type="email" 
            required 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
        {/* パスワード入力（1回目） */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-300">
            {lang === 'ja' ? 'パスワード (8文字以上)' : 'Password (8+ characters)'}
          </label>
          <PasswordInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showHint={!isLogin}
            required
            minLength={8}
          />
        </div>

        {/* パスワード確認（2回目：新規登録時のみ表示） */}
        {!isLogin && (
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300">
              {lang === 'ja' ? 'パスワード（確認用）' : 'Confirm Password'}
            </label>
            <PasswordInput
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              compareValue={password}
              required
            />
          </div>
        )}
        <button 
        type="submit"
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

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterPageInner />
    </Suspense>
  );
}