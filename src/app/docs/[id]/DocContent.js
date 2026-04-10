"use client";
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import CloseButton from './CloseButton';

export default function DocContent({ id, docData }) {
  const languageState = useLanguage();
  const lang = languageState?.lang || 'ja';

  const getTrans = (obj) => {
    if (!obj) return '';
    return typeof obj === 'object' ? (obj[lang] || obj.ja || '') : obj;
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-slate-200 min-h-screen bg-slate-950">
      <article className="space-y-20">
        <header className="border-b border-slate-200 pb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            {getTrans(docData.title)}
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            Last Update: {docData.date}
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white border-l-4 border-blue-600 pl-4 tracking-tight">
            01. {lang === 'ja' ? '概要' : 'Overview'}
          </h2>
          <div
            className="prose prose-invert max-w-none text-slate-300 leading-relaxed pl-5"
            dangerouslySetInnerHTML={{ __html: getTrans(docData.overviewHtml) || docData.contentHtml }}
          />
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white border-l-4 border-blue-600 pl-4 tracking-tight">
            02. {lang === 'ja' ? '基本的な使い方と注意事項' : 'Basic Usage & Precautions'}
          </h2>
          <div
            className="prose prose-invert max-w-none text-slate-300 leading-relaxed pl-5"
            dangerouslySetInnerHTML={{ __html: getTrans(docData.usageHtml) }}
          />
        </section>

        {docData.steps && docData.steps.length > 0 && (
          <section className="space-y-12">
            <h2 className="text-xl font-bold text-white border-l-4 border-blue-600 pl-4 tracking-tight">
              03. {lang === 'ja' ? '利用方法詳細' : 'Detailed Instructions'}
            </h2>

            <div className="space-y-24 pl-5">
              {docData.steps.map((step, index) => (
                <div key={index} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-blue-500 font-black text-lg shadow-xl">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                      {getTrans(step.title)}
                    </h3>
                  </div>

                  {step.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl group">
                      <Image
                        src={`/assets/images/docs/${id}/${step.image}`}
                        alt={`Step ${index + 1}`}
                        fill
                        className="object-contain p-1 md:p-2 transition-transform duration-700 group-hover:scale-[1.01]"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  )}

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

      <CloseButton lang={lang} />
    </div>
  );
}
