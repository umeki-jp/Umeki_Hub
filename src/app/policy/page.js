"use client";

export default function PolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">サイトポリシー</h1>
      
      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold mb-3 text-slate-900">コンセプト</h2>
          <p>
            当サイト「Official Portal」は、日本を拠点に、個人開発と業務システムの改善に取り組むプロジェクトのポータルサイトです。
            
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-slate-900">免責事項</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>当サイトで提供するソフトウェアおよび情報の利用により生じた、いかなる損害についても開発者は一切の責任を負いません。</li>
            <li>各アプリケーションの動作や正確性については細心の注意を払っておりますが、恒久的なサポートや完全性を保証するものではありません。</li>
            <li>当サイトからリンクされた外部サイトの内容やサービスについても、一切の関与および責任を負いかねます。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-slate-900">知的財産権</h2>
          <p>
            当サイトに掲載されているコンテンツ、および提供されるソフトウェアの著作権は、特段の記載がない限り開発者（U1344）に帰属します。
            無断での二次配布や商用利用はご遠慮ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-slate-900">ポリシーの変更</h2>
          <p>
            本ポリシーは、必要に応じて予告なく変更することがあります。変更後のポリシーは、当サイトに掲載した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}