"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { APP_DICTS } from '@/utils/constants';
import Link from 'next/link';
import { createClient } from "@/utils/supabase/client";

export default function AccountSettingsPage() {
  const { lang } = useLanguage();
  const text = APP_DICTS.UI_TEXT.ACCOUNT;
  const navText = APP_DICTS.UI_TEXT.NAV;
  const supabase = createClient();

  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [displayName, setDisplayName] = useState(""); 
  const [notifications, setNotifications] = useState({
    news: false,
    magazine: false
  });
  const [loading, setLoading] = useState(true);

  // --- 【追加】パスワード変更用の状態管理 ---
  const [isChangingPw, setIsChangingPw] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setDisplayName(data.display_name || "");
          setNotifications({
            news: data.notify_news,
            magazine: data.notify_magazine
          });
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [supabase]);

  useEffect(() => {
    if (showSavedMessage) {
      const timer = setTimeout(() => setShowSavedMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSavedMessage]);

  // --- パスワード更新の実処理 ---
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert(text.PW_ERROR_MISMATCH[lang]);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      alert(error.message);
    } else {
      alert(text.PW_SUCCESS[lang]);
      setIsChangingPw(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      display_name: displayName,
      notify_news: notifications.news,
      notify_magazine: notifications.magazine,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      setShowSavedMessage(true);
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(text.DELETE_CONFIRM[lang]);
    if (confirmed) {
      console.log("Account deleted");
    }
  };

  if (loading) return <div className="text-white p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 relative">
      
      {showSavedMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-8 py-3 rounded-full shadow-2xl font-bold animate-bounce">
            {lang === 'ja' ? "設定を保存しました" : "Settings saved"}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black text-white">{text.TITLE[lang]}</h1>
        <Link 
          href="/settings" 
          className="text-sm text-slate-500 hover:text-blue-400 transition"
        >
          ← {navText.SETTINGS[lang]}
        </Link>
      </div>

      <div className="space-y-12 bg-slate-950 p-8 rounded-3xl border border-slate-900 shadow-2xl">
        
        <section className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3 text-slate-400">{text.DISPLAY_NAME[lang]}</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={30}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-3 text-slate-400">{text.PLAN[lang]}</label>
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 text-blue-400 text-sm font-black rounded-full border border-blue-600/20">
              {APP_DICTS.LICENSE.FREE}
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white">{text.NOTIFICATIONS[lang]}</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={notifications.news}
                onChange={(e) => setNotifications({...notifications, news: e.target.checked})}
                className="w-6 h-6 rounded border-slate-700 bg-slate-900 checked:bg-blue-600 appearance-none border transition cursor-pointer" 
              />
              <span className="text-slate-300 group-hover:text-white transition">{text.NOTIFY_NEWS[lang]}</span>
            </label>
            <label className="flex items-center gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={notifications.magazine}
                onChange={(e) => setNotifications({...notifications, magazine: e.target.checked})}
                className="w-6 h-6 rounded border-slate-700 bg-slate-900 checked:bg-blue-600 appearance-none border transition cursor-pointer" 
              />
              <span className="text-slate-300 group-hover:text-white transition">{text.NOTIFY_MAG[lang]}</span>
            </label>
          </div>
        </section>

        <hr className="border-slate-900" />

        <div className="space-y-6">
          {/* --- 【変更】パスワード変更ボタンと入力欄の出し分け --- */}
          {isChangingPw ? (
            <div className="bg-slate-900 p-6 rounded-2xl border border-blue-900/30 space-y-4">
              <input 
                type="password" 
                placeholder={text.PW_NEW[lang]} 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white"
              />
              <input 
                type="password" 
                placeholder={text.PW_CONFIRM[lang]} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white"
              />
              <div className="flex gap-2">
                <button onClick={handleUpdatePassword} className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg">{text.PW_UPDATE_BTN[lang]}</button>
                <button onClick={() => setIsChangingPw(false)} className="px-4 py-2 text-slate-400">Cancel</button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsChangingPw(true)}
              className="text-sm font-bold text-slate-500 hover:text-white transition border-b border-transparent hover:border-white"
            >
              {text.CHANGE_PW[lang]}
            </button>
          )}

          <button onClick={handleSave} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl">
            {text.SAVE[lang]}
          </button>

          <div className="text-center pt-4">
            <button onClick={handleDelete} className="text-sm font-bold text-red-900 hover:text-red-500 transition">
              {text.DELETE_ACCOUNT[lang]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}