"use client";
import { useState } from 'react';
import Link from "next/link";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここに送信ロジック（FormspreeやAPIなど）を追加予定
    setStatus("sending");
    
    // 現時点ではシミュレーションのみ
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <div className="text-6xl">✉️</div>
        <h2 className="text-2xl font-bold">お問い合わせありがとうございます</h2>
        <p className="text-slate-600">メッセージは正常に送信されました。内容を確認し、必要に応じて折り返しご連絡いたします。</p>
        <button 
          onClick={() => setStatus("")}
          className="text-blue-600 hover:underline font-medium"
        >
          フォームに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-slate-500">
          アプリへのご要望、不具合報告、その他ビジネスに関するお問い合わせはこちらからお送りください。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">お名前</label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">メールアドレス</label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">お問い合わせ内容</label>
          <textarea
            id="message"
            required
            rows="5"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            placeholder="メッセージを入力してください..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg ${
            status === "sending" ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-95"
          }`}
        >
          {status === "sending" ? "送信中..." : "メッセージを送信する"}
        </button>
      </form>

      <div className="mt-12 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-slate-900 text-white font-medium py-3 px-8 rounded-full hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md"
        >
          ダッシュボードに戻る
        </Link>
      </div>
    </div>
  );
}