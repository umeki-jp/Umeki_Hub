"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { APP_DICTS } from '@/utils/constants';
import Link from 'next/link';
import { createClient } from "@/utils/supabase/client";
import { requestAccountDeletion, cancelAccountDeletion } from '@/app/auth/actions';

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
  const [showPassword, setShowPassword] = useState(false);

  // --- 【追加】退会申請用の状態管理 ---
  const [isDeleted, setIsDeleted] = useState(false);
  const [deletionRequestedAt, setDeletionRequestedAt] = useState(null);

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
          setDisplayName(data.display_name || user.user_metadata?.display_name || "");
          setNotifications({
            news: data.notify_news || false,
            magazine: data.notify_magazine || false
          });
          setIsDeleted(data.is_deleted || false);
          setDeletionRequestedAt(data.deletion_requested_at || null);
        } else {
          setDisplayName(user.user_metadata?.display_name || "");
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

    // Supabase Authのメタデータにも名前を同期する
    await supabase.auth.updateUser({
      data: { display_name: displayName }
    });

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

  const handleDelete = async () => {
    const confirmMessage = lang === 'ja'
      ? "アカウントの削除申請を行いますか？\n（30日間はデータの復元が可能ですが、その後完全に消去されます）"
      : "Are you sure you want to request account deletion?\n(Your data can be restored within 30 days, after which it will be permanently deleted.)";
      
    const confirmed = window.confirm(confirmMessage);
    if (confirmed) {
      try {
        setLoading(true);
        const result = await requestAccountDeletion();
        if (result?.success) {
          window.location.href = '/';
        }
      } catch (error) {
        setLoading(false);
        // 万が一 NEXT_REDIRECT が飛んできても握りつぶす
        if (!error.message.includes('NEXT_REDIRECT')) {
          alert(lang === 'ja' ? "削除申請に失敗しました: " + error.message : "Failed to request deletion: " + error.message);
        }
      }
    }
  };

  const handleCancelDeletion = async () => {
    try {
      setLoading(true);
      const result = await cancelAccountDeletion();
      if (result?.success) {
        setIsDeleted(false);
        setDeletionRequestedAt(null);
        alert(lang === 'ja' ? 'アカウント削除申請を取り消しました。' : 'Account deletion request has been canceled.');
      }
    } catch (error) {
      alert(lang === 'ja' ? 'キャンセルに失敗しました: ' + error.message : 'Failed to cancel: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDeletionStatusText = () => {
    if (!deletionRequestedAt) return "";
    const reqDate = new Date(deletionRequestedAt);
    const deletionDate = new Date(reqDate.setDate(reqDate.getDate() + 30));
    const today = new Date();
    
    const diffTime = deletionDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // YYYY年MM月DD日 または YYYY/MM/DD の形式に合わせる
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const localeDate = deletionDate.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', options);

    if (diffDays <= 0) {
      return lang === 'ja' 
        ? `完全削除の処理中です。`
        : `Permanent deletion is in progress.`;
    }

    return lang === 'ja' 
      ? `${localeDate}（あと約 ${diffDays} 日）に完全に削除されます。`
      : `Your account will be permanently deleted on ${localeDate} (in about ${diffDays} days).`;
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

      {isDeleted && (
        <div className="mb-8 p-6 bg-red-950/40 border border-red-500 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <h2 className="text-xl font-bold text-red-500 mb-2">
            {lang === 'ja' ? 'アカウント削除申請中' : 'Account Deletion Requested'}
          </h2>
          <p className="text-red-200 text-sm mb-6">
            {getDeletionStatusText()}
          </p>
          <button 
            onClick={handleCancelDeletion}
            className="inline-block mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition transform hover:scale-105 shadow-md shadow-blue-600/50 border border-blue-600/50"
          >
            {lang === 'ja' ? '削除申請を取り消す' : 'Cancel Deletion Request'}
          </button>
        </div>
      )}

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
          {/* --- パスワード変更ボタンと入力欄の出し分け --- */}
          {isChangingPw ? (
            <div className="bg-slate-900 p-6 rounded-2xl border border-blue-900/30 space-y-4">
              
              {/* 新しいパスワード入力欄 */}
              <div className="space-y-2">
                <div className="relative flex items-center w-full">
                  <input 
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={text.PW_NEW[lang]} 
                    value={newPassword}
                    minLength={8}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 pr-20 transition"
                  />
                  <button 
                    type="button"
                    style={{ right: '8px' }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute px-3 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  >
                    {showPassword 
                      ? (lang === 'ja' ? '非表示' : 'Hide') 
                      : (lang === 'ja' ? '表示' : 'Show')
                    }
                  </button>
                </div>
                <p className="text-xs text-slate-500 italic">
                  {lang === 'ja' ? '※8文字以上の英数字を推奨します' : '*Minimum 8 characters required'}
                </p>
              </div>

              {/* 確認用パスワード入力欄 */}
              <div className="space-y-2">
                <div className="relative flex items-center w-full">
                  <input 
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={text.PW_CONFIRM[lang]} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-slate-950 border rounded-lg px-4 py-2 text-white outline-none transition pr-20 ${
                      confirmPassword && newPassword !== confirmPassword ? 'border-red-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  <button 
                    type="button"
                    style={{ right: '8px' }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute px-3 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  >
                    {showPassword 
                      ? (lang === 'ja' ? '非表示' : 'Hide') 
                      : (lang === 'ja' ? '表示' : 'Show')
                    }
                  </button>
                </div>
                {/* 一致していない場合の警告 */}
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 font-bold">
                    {lang === 'ja' ? 'パスワードが一致しません' : 'Passwords do not match'}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={handleUpdatePassword} className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition">{text.PW_UPDATE_BTN[lang]}</button>
                <button onClick={() => setIsChangingPw(false)} className="px-4 py-2 text-slate-400 hover:text-white transition">Cancel</button>
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

          {/* 削除申請中なら削除ボタンは「申請中」と表示して無効化 */}
          <div className="text-center pt-4 space-y-2">
            {!isDeleted ? (
              <button onClick={handleDelete} className="text-sm font-bold text-red-900 hover:text-red-500 transition">
                {text.DELETE_ACCOUNT[lang]}
              </button>
            ) : (
              <span className="text-sm font-bold text-slate-600 cursor-not-allowed">
                {lang === 'ja' ? '削除申請中' : 'Deletion Requested'}
              </span>
            )}
            <p className="text-xs text-slate-500 font-medium">
              {lang === 'ja'
                ? "※ 30日間はデータの復元が可能です。その後、すべてのデータが完全に消去されます"
                : "* Data recovery is possible for 30 days. After that, all data will be permanently deleted."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}