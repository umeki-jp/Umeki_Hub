"use client";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* 自己紹介セクション */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">開発者プロフィール</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center text-white text-4xl shadow-inner">
            U
          </div>
          <div className="flex-grow space-y-4">
            <h3 className="text-xl font-bold text-slate-800">U1344 (Umeki)</h3>
            <p className="text-slate-600 leading-relaxed">
              日本を拠点に、個人開発と業務システムの改善に取り組んでいます。
              危機管理・業務設計の経験を活かし、シンプルで再現性のあるアプリを継続的に開発中。
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/umeki-jp" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">GitHub</a>
              <a href="https://x.com/ume1344" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">X (Twitter)</a>
            </div>
          </div>
        </div>
      </section>

      {/* 特定商取引法に基づく表記セクション */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-slate-800">特定商取引法に基づく表記</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <tbody className="divide-y divide-slate-200">
              <tr>
                <th className="py-4 font-semibold text-slate-700 w-1/3">事業者の名称</th>
                <td className="py-4 text-slate-600">Umeki_Hub 運営事務局</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">代表者または責任者</th>
                <td className="py-4 text-slate-600">梅木 (Hisayoshi Umeki)</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">所在地</th>
                <td className="py-4 text-slate-600">請求により遅滞なく提供いたします</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">お問い合わせ先</th>
                <td className="py-4 text-slate-600">
                  <p>メール：support@example.com (仮)</p>
                  <p className="mt-1 text-xs text-slate-400">※お問い合わせフォームからも受付しております</p>
                </td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">販売価格</th>
                <td className="py-4 text-slate-600">各プロジェクト（Stripe決済画面）に表示される金額に基づきます</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">代金の支払時期・方法</th>
                <td className="py-4 text-slate-600">クレジットカード決済（Stripe）。支払時期は各カード会社の規定によります。</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">商品引渡し時期</th>
                <td className="py-4 text-slate-600">決済完了後、即時利用可能となります。</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">返品・キャンセル</th>
                <td className="py-4 text-slate-600">デジタルコンテンツの性質上、決済完了後の返金・返品は原則としてお受けできません。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}