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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
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
  }, [apps, searchQuery, selectedCategory, selectedPlatforms, lang]);

  // プラットフォームのチェックボックス切り替え
  const togglePlatform = (id) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  const clearSelectedPlatforms = () => {
    setSelectedPlatforms([]);
  };

  return (
    <div className="w-full relative flex flex-col">
      
      {/* 検索・フィルターセクションの固定ラッパー */}
      <div className="sticky top-[64px] z-40 bg-slate-950 pt-4 pb-4 -mt-6 -mx-4 px-4 sm:mx-0 sm:px-0">

        {/* 折りたたみトグルバー */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setIsSearchOpen(prev => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all text-sm font-semibold text-slate-200"
          >
            {/* 検索アイコン */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            {lang === "ja" ? "検索・フィルター" : "Search & Filter"}
            {/* アクティブフィルター数バッジ */}
            {(searchQuery || selectedCategory !== "ALL" || selectedPlatforms.length > 0) && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black">
                {filteredApps.length}
              </span>
            )}
            {/* 展開アイコン */}
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 transition-transform duration-200 ${isSearchOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* 検索クエリのインライン表示（折りたたみ時） */}
          {!isSearchOpen && searchQuery && (
            <span className="text-xs text-slate-400 truncate max-w-[200px]">
              &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* 展開パネル */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {/* 検索窓 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                {lang === "ja" ? "検索" : "Search"}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder={t.COMMON.SEARCH_PLACEHOLDER[lang]}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearchQuery}
                    aria-label={lang === "ja" ? "検索をクリア" : "Clear search"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-all"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* プラットフォーム選択 */}
            <div className="hidden md:block space-y-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                {t.COMMON.PLATFORMS_LABEL[lang]}
              </label>
              <div className="flex min-h-[50px] items-center justify-between gap-4 bg-slate-800 px-3 py-3 rounded-xl border border-slate-700">
                <div className="flex gap-4">
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
                {selectedPlatforms.length > 0 && (
                  <button
                    type="button"
                    onClick={clearSelectedPlatforms}
                    aria-label={lang === "ja" ? "プラットフォーム選択をクリア" : "Clear platform filters"}
                    className="inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-full border border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-all text-sm"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* カテゴリ羅列 */}
          <div className="hidden md:block space-y-2">
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
        </div>

        {/* 検索とグリッドの間の装飾的な区切り線 */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-70 mt-4 mb-2"></div>
      </div>

      {/* アプリ一覧グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 pt-4 pb-20">
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

            <p className="hidden md:block text-sm text-slate-200 mb-8 leading-relaxed flex-grow">{app.description[lang]}</p>
            {/* モバイル時はdescriptionが非表示なため、カードの高さを確保しつつ余白を詰める */}
            <div className="block md:hidden flex-grow mb-2"></div>
            
            <div className="flex flex-row md:flex-col gap-2 md:gap-3 mt-auto">
              {/* 利用URLがある場合のみ表示 */}
              {app.url ? (
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 w-full flex items-center justify-center bg-blue-600 text-white py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
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
                  className="flex-1 w-full flex items-center justify-center border border-slate-700 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold hover:bg-slate-800 hover:text-white transition-all"
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