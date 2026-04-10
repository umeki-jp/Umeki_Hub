"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * パスワード入力フィールド（表示/非表示切替・ヒント・不一致警告付き）
 *
 * Props:
 *   name         - input の name 属性
 *   value        - 入力値
 *   onChange     - onChange ハンドラ
 *   placeholder  - プレースホルダー（省略可）
 *   compareValue - 不一致チェック対象の値（省略時は警告なし）
 *   showHint     - パスワード要件ヒントを表示するか（default: false）
 *   autoComplete - autocomplete 属性（default: "new-password"）
 *   required     - required 属性（default: false）
 *   minLength    - minLength 属性（default: 8）
 */
export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  compareValue,
  showHint = false,
  autoComplete = 'new-password',
  required = false,
  minLength = 8,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { lang } = useLanguage();

  const hasMismatch =
    compareValue !== undefined &&
    value !== '' &&
    compareValue !== '' &&
    value !== compareValue;

  return (
    <div className="space-y-1">
      <div className="relative flex items-center w-full">
        <input
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-white outline-none transition pr-20
            ${hasMismatch ? 'border-red-500' : 'border-slate-800 focus:border-blue-500'}`}
        />
        <button
          type="button"
          style={{ right: '8px' }}
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute px-3 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
        >
          {showPassword
            ? (lang === 'ja' ? '非表示' : 'Hide')
            : (lang === 'ja' ? '表示' : 'Show')}
        </button>
      </div>

      {showHint && (
        <p className="text-xs text-slate-500 italic">
          {lang === 'ja'
            ? '※8文字以上・大文字・数字・記号（例: !@#$）を含めてください'
            : '*Min 8 chars, include uppercase, number, and special character (e.g. !@#$)'}
        </p>
      )}

      {hasMismatch && (
        <p className="text-xs text-red-500 font-bold">
          {lang === 'ja' ? 'パスワードが一致しません' : 'Passwords do not match'}
        </p>
      )}
    </div>
  );
}
