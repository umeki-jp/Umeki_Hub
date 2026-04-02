import { getDocData } from '@/lib/markdown.js';
import Link from 'next/link';

// async を追加し、params を await する（Next.js 15対策）
export default async function DocPage({ params }) {
  const { id } = await params; // ここで await を入れる
  const docData = getDocData(id);

  if (!docData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">ドキュメントが見つかりません</h1>
        <p className="text-slate-500 mb-4">探しているID: {id}</p>
        <Link href="/" className="text-blue-600 hover:underline">ダッシュボードに戻る</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <nav className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1">
          ← ダッシュボードへ戻る
        </Link>
      </nav>

      <article className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <header className="mb-10 border-b pb-8">
          <h1 className="text-3xl font-extrabold mb-2">{docData.title}</h1>
          <p className="text-slate-400 text-sm">最終更新: {docData.date}</p>
        </header>

        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: docData.contentHtml }} 
        />
      </article>

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