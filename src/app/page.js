"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // public/data/apps.json からアプリ一覧を取得
    fetch('/data/apps.json')
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(err => console.error("データ読み込みエラー:", err));
  }, []);

  return (
    <div className="space-y-10">
      {/* ヒーローセクション */}
      <section className="text-center py-12 bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white rounded-3xl shadow-2xl px-4">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Project Launcher</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          個人開発と業務システムの改善に取り組むプロジェクトのポータルサイト。シンプルで再現性のあるアプリを継続的に開発中。
        </p>
      </section>

      {/* アプリ一覧グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apps.map(app => (
          <div key={app.id} className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 rounded-full text-slate-500 uppercase tracking-widest">
                {app.category}
              </span>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest ${
                app.status === 'Stable' ? 'bg-green-100 text-green-700' : 
                app.status === 'Beta' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {app.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-slate-900">{app.title}</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed flex-grow">{app.description}</p>
            
            <div className="flex flex-col gap-3 mt-auto">
              {/* 利用URLがある場合のみ表示 */}
              {app.url ? (
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-center bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-sm"
                >
                  アプリを起動
                </a>
              ) : null}
              
              {/* ドキュメントパスがある場合のみ表示（Linkコンポーネントを使用） */}
              {app.docPath ? (
                <Link 
                  href={app.docPath} 
                  className="w-full text-center border border-slate-200 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  利用方法・ドキュメント
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}