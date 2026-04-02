"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { APP_DICTS } from '../utils/constants';

export default function HomePage() {
  const [apps, setApps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  
  // Contextから現在の言語設定を取得
  const { lang } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  useEffect(() => {
    const cacheBuster = new Date().getTime();
    fetch(`/data/apps.json?t=${cacheBuster}`)
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(err => console.error("データ読み込みエラー:", err));
  }, []);

  // フィルタリングロジック
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesQuery = app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     app.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || app.categories.includes(selectedCategory);
      const matchesPlatform = selectedPlatforms.length === 0 || 
                              app.platforms.some(p => selectedPlatforms.includes(p));
      
      return matchesQuery && matchesCategory && matchesPlatform;
    });
  }, [apps, searchQuery, selectedCategory, selectedPlatforms]);

  // プラットフォームのチェックボックス切り替え
  const togglePlatform = (id) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-10 w-full">
      
      {/* 検索・フィルターセクション */}
      <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-300 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          {/* 検索窓 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              {lang === "ja" ? "検索" : "Search"}
            </label>
            <input 
              type="text"
              placeholder={t.COMMON.SEARCH_PLACEHOLDER[lang]}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* プラットフォーム選択 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              {t.COMMON.PLATFORMS_LABEL[lang]}
            </label>
            <div className="flex gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
              {Object.values(APP_DICTS.PLATFORMS).map(plat => (
                <label key={plat.id} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                    checked={selectedPlatforms.includes(plat.id)}
                    onChange={() => togglePlatform(plat.id)}
                  />
                  <span className="text-sm font-medium group-hover:text-white transition-colors">
                    {plat.label[lang]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* カテゴリ羅列 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
            {t.COMMON.CATEGORIES_LABEL[lang]}
          </label>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === "ALL" ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
            >
              {t.COMMON.ALL[lang]}
            </button>
            {Object.values(APP_DICTS.CATEGORIES).map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* アプリ一覧グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map(app => (
          <div key={app.id} className="group bg-slate-900 border border-slate-200 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-blue-500/10">
            <div className="flex flex-wrap gap-2 mb-4">
              {app.categories.map(catId => (
                <span key={catId} className="text-[9px] font-black px-2 py-0.5 bg-slate-800 rounded-md 2400 uppercase tracking-tighter border border-slate-700">
                  {APP_DICTS.CATEGORIES[catId]?.label[lang]}
                </span>
              ))}
            </div>
            
            <h3 className="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">{app.title}</h3>
            
            {/* プラットフォーム表示 */}
            <div className="flex gap-2 mb-4">
              {app.platforms.map(pId => (
                <span key={pId} className="text-[10px] text-blue-400 font-medium">
                  #{APP_DICTS.PLATFORMS[pId]?.label[lang]}
                </span>
              ))}
            </div>

            <p className="text-sm text-slate-200 mb-8 leading-relaxed flex-grow">{app.description[lang]}</p>
            
            <div className="flex flex-col gap-3 mt-auto">
              {/* 利用URLがある場合のみ表示 */}
              {app.url ? (
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-center bg-blue-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                >
                  {t.COMMON.LAUNCH_APP[lang]}
                </a>
              ) : null}
              
              {/* ドキュメントパスがある場合のみ表示 */}
              {app.docPath ? (
                <Link 
                  href={app.docPath} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center border border-slate-700 py-3 rounded-xl text-sm font-bold 200 hover:bg-slate-800 hover:text-white transition-all"
                >
                  {t.COMMON.DOCS[lang]}
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* 検索結果ゼロの表示 */}
      {filteredApps.length === 0 && (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
          <p className="text-slate-200">{t.COMMON.NO_RESULTS[lang]}</p>
        </div>
      )}
    </div>
  );
}