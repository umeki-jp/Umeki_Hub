import { getDocData } from '@/lib/markdown.js';
import CloseButton from './CloseButton';
import DocContent from './DocContent';

export default async function DocPage({ params }) {
  const { id } = await params;
  const docData = getDocData(id);

  if (!docData) {
    return (
      <div className="text-center py-20 text-slate-400 bg-slate-950 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Document Not Found</h1>
        <CloseButton />
      </div>
    );
  }

  return <DocContent id={id} docData={docData} />;
}