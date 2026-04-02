"use client";
import Image from 'next/image';
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* 自己紹介セクション */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">開発者プロフィール</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm border-2 border-slate-900">
            <Image 
              src="/assets/images/profile-logo.png" 
              alt="Umeki Hub Logo" 
              width={128} 
              height={128} 
              className="object-cover" 
            />
          </div>
          <div className="flex-grow space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Umeki</h3>
            <p className="text-slate-600 leading-relaxed">
              個人開発者として、業務可視化・危機管理・属人化排除をテーマに<br />シンプルで再現性のある Webアプリを開発しています。
            </p>
            <div className="flex items-center gap-4">
              {/* GitHub アイコン */}
              <a 
                href="https://github.com/umeki-jp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-70 transition-opacity"
              >
                <Image 
                  src="/assets/images/GitHub_Invertocat_Black_Clearspace.png" 
                  alt="GitHub" 
                  width={30} 
                  height={30} 
                  className="object-contain"
                />
              </a>

              {/* X (Twitter) アイコン */}
              <a 
                href="https://x.com/ume1344" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-70 transition-opacity"
              >
                <Image 
                  src="/assets/images/x-logo-black.png" 
                  alt="X (Twitter)" 
                  width={20} 
                  height={20} 
                  className="object-contain"
                />
              </a>
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
                <th className="py-4 font-semibold text-slate-700 w-1/4 sm:w-1/5 whitespace-nowrap align-top">事業者の名称</th>
                <td className="py-4 text-slate-600">Umeki_Apps 運営</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">代表者または責任者</th>
                <td className="py-4 text-slate-600">梅木　久義 (Hisayoshi Umeki)</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">所在地</th>
                <td className="py-4 text-slate-600">請求により遅滞なく提供いたします</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">お問い合わせ先</th>
                <td className="py-4 text-slate-600">
                  <p>メール：support@example.com (仮)</p>
                  <p className="mt-1 text-xs text-slate-400">※お問い合わせフォームからも受付しております
                    <a href="/contact" className="text-blue-600 ml-1 hover:underline">こちら</a>
                  </p>
                </td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">販売価格</th>
                <td className="py-4 text-slate-600">各プロジェクト（Stripe決済画面）に表示される金額に基づきます</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">代金の支払時期・方法</th>
                <td className="py-4 text-slate-600">クレジットカード決済（Stripe）。お支払いはご利用のカード会社の請求日に準じます。</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">商品引渡し時期</th>
                <td className="py-4 text-slate-600">決済完了後、即時利用可能となります。</td>
              </tr>
              <tr>
                <th className="py-4 font-semibold text-slate-700">返品・キャンセル</th>
                <td className="py-4 text-slate-600">デジタルコンテンツの性質上、決済完了後の返金・返品は原則としてお受けできません。<br />
                  ただし、サービス提供に不具合がある場合は、個別に対応いたします。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

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