"use client";
import { useState } from 'react';
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { APP_DICTS } from "../../utils/constants";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const { lang } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  // お問い合わせ専用の翻訳データ
  const contactT = {
    TITLE: { ja: "お問い合わせ", en: "Contact" },
    SUBTITLE: { 
      ja: "アプリへのご要望、不具合報告、その他ビジネスに関するお問い合わせはこちらからお送りください。", 
      en: "Please send your requests for the apps, bug reports, or other business inquiries here." 
    },
    LABEL_NAME: { ja: "お名前", en: "Name" },
    LABEL_EMAIL: { ja: "メールアドレス", en: "Email Address" },
    LABEL_MESSAGE: { ja: "お問い合わせ内容", en: "Message" },
    PLACEHOLDER_MESSAGE: { ja: "メッセージを入力してください...", en: "Enter your message here..." },
    BTN_SEND: { ja: "メッセージを送信する", en: "Send Message" },
    BTN_SENDING: { ja: "送信中...", en: "Sending..." },
    SUCCESS_TITLE: { ja: "お問い合わせありがとうございます", en: "Thank you for contacting us" },
    SUCCESS_TEXT: { 
      ja: "メッセージは正常に送信されました。内容を確認し、必要に応じて折り返しご連絡いたします。", 
      en: "Your message has been sent successfully. We will review it and get back to you if necessary." 
    },
    BTN_BACK_FORM: { ja: "フォームに戻る", en: "Back to form" }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // シミュレーション
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 text-slate-200">
        <div className="text-6xl mb-4">✉️</div>
        <h2 className="text-3xl font-black text-white tracking-tight">
          {contactT.SUCCESS_TITLE[lang]}
        </h2>
        <p className="text-slate-200 leading-relaxed">
          {contactT.SUCCESS_TEXT[lang]}
        </p>
        <button 
          onClick={() => setStatus("")}
          className="text-blue-400 hover:text-blue-300 font-bold transition-colors underline underline-offset-4"
        >
          {contactT.BTN_BACK_FORM[lang]}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-slate-200">
      <div className="mb-10 text-center space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">
          {contactT.TITLE[lang]}
        </h1>
        <p className="text-slate-200 max-w-md mx-auto text-sm leading-relaxed">
          {contactT.SUBTITLE[lang]}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 border border-slate-200 p-8 rounded-2xl shadow-2xl">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-bold text-slate-200 uppercase tracking-widest ml-1">
            {contactT.LABEL_NAME[lang]}
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full bg-slate-800 border border-slate-400 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-slate-600"
            placeholder="Your Name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold text-slate-200 uppercase tracking-widest ml-1">
            {contactT.LABEL_EMAIL[lang]}
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full bg-slate-800 border border-slate-400 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-slate-600"
            placeholder="example@mail.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-bold text-slate-200 uppercase tracking-widest ml-1">
            {contactT.LABEL_MESSAGE[lang]}
          </label>
          <textarea
            id="message"
            required
            rows="5"
            className="w-full bg-slate-800 border border-slate-400 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none placeholder-slate-600"
            placeholder={contactT.PLACEHOLDER_MESSAGE[lang]}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg ${
            status === "sending" 
              ? "bg-slate-700 cursor-not-allowed text-slate-200" 
              : "bg-blue-600 hover:bg-blue-500 active:transform active:scale-95 shadow-blue-900/20"
          }`}
        >
          {status === "sending" ? contactT.BTN_SENDING[lang] : contactT.BTN_SEND[lang]}
        </button>
      </form>

      <div className="mt-16 text-center pb-10">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-slate-200 text-slate-900 font-bold py-3 px-10 rounded-full hover:bg-white transition-all shadow-lg"
        >
          {t.COMMON.BACK_TO_DASHBOARD[lang]}
        </Link>
      </div>
    </div>
  );
}