import { getDocData } from '@/lib/markdown.js';
import Link from 'next/link';
import Image from 'next/image';
import { APP_DICTS } from '@/utils/constants';
import CloseButton from './CloseButton'; // 上記のコンポーネントをインポート

export default async function DocPage({ params }) {
  const { id } = await params;
  const docData = getDocData(id);

  // 現時点ではデフォルトを "ja" とする（URL等で管理する場合はここを動的に変更）
  const lang = "ja"; 
  const t = APP_DICTS.UI_TEXT;

  if (!docData) {
    return (
      <div className="text-center py-20 text-slate-400 bg-slate-950 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Document Not Found</h1>
        <CloseButton lang={lang} />
      </div>
    );
  }

  // 多言語対応データのための安全な取得ヘルパー
  const getTrans = (obj) => {
    if (!obj) return "";
    return typeof obj === 'object' ? (obj[lang] || obj['ja'] || "") : obj;
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-slate-200 min-h-screen bg-slate-950">
      {/* ナビゲーション */}

      <article className="space-y-20">
        {/* タイトルヘッダー */}
        <header className="border-b border-slate-800 pb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            {getTrans(docData.title)}
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            Last Update: {docData.date}
          </p>
        </header>

        {/* 01. 概要 */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white border-l-4 border-blue-600 pl-4 tracking-tight">
            01. {lang === "ja" ? "概要" : "Overview"}
          </h2>
          <div 
            className="prose prose-invert max-w-none text-slate-300 leading-relaxed pl-5"
            dangerouslySetInnerHTML={{ __html: getTrans(docData.overviewHtml) || docData.contentHtml }} 
          />
        </section>

        {/* 02. 基本的な使い方と注意事項 */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white border-l-4 border-blue-600 pl-4 tracking-tight">
            02. {lang === "ja" ? "基本的な使い方と注意事項" : "Basic Usage & Precautions"}
          </h2>
          <div 
            className="prose prose-invert max-w-none text-slate-300 leading-relaxed pl-5"
            dangerouslySetInnerHTML={{ __html: getTrans(docData.usageHtml) }} 
          />
        </section>

        {/* 03. 利用方法詳細 */}
        {docData.steps && docData.steps.length > 0 && (
          <section className="space-y-12">
            <h2 className="text-xl font-bold text-white border-l-4 border-blue-600 pl-4 tracking-tight">
              03. {lang === "ja" ? "利用方法詳細" : "Detailed Instructions"}
            </h2>
            
            <div className="space-y-24 pl-5">
              {docData.steps.map((step, index) => (
                <div key={index} className="space-y-8">
                  {/* 手順の見出し */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-blue-500 font-black text-lg shadow-xl">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                      {getTrans(step.title)}
                    </h3>
                  </div>

                  {/* 画像表示エリア */}
                  {step.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl group">
                      <Image 
                        src={`/assets/images/docs/${id}/${step.image}`} 
                        alt={`Step ${index + 1}`}
                        fill
                        className="object-contain p-2 md:p-6 transition-transform duration-700 group-hover:scale-[1.01]"
                        sizes="(max-w-768px) 100vw, 800px"
                      />
                    </div>
                  )}

                  {/* 手順の説明 */}
                  <div className="max-w-3xl">
                    <p className="text-slate-400 leading-loose text-base md:text-lg">
                      {getTrans(step.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* 閉じるボタン（クライアントコンポーネント） */}
      <CloseButton lang={lang} />
    </div>
  );
}