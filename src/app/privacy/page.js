"use client";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">プライバシーポリシー</h1>
      
      <div className="space-y-8 text-slate-700 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-bold mb-3 text-slate-900">個人情報の収集について</h2>
          <p>
            当サイトでは、お問い合わせフォームの利用やサービスの提供にあたり、氏名やメールアドレス等の個人情報をご入力いただく場合があります。
            これらの情報は、質問に対する回答や必要な情報を電子メール等でご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-slate-900">広告・解析ツールの利用</h2>
          <p>
            当サイトでは、サービスの改善を目的として、Cookie（クッキー）を利用したアクセス解析ツール（Google Analytics等）を使用する場合があります。
            これらは匿名で収集されており、個人を特定するものではありません。ブラウザの設定によりCookieを無効にすることで収集を拒否することが可能です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-slate-900">決済情報の取り扱い</h2>
          <p>
            有料サービスをご利用いただく際の決済は、外部決済サービス（Stripe）を通じて行われます。
            当サイトのサーバー上でクレジットカード番号等の機密性の高い決済情報を保存・蓄積することはありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-slate-900">第三者への開示・提供の禁止</h2>
          <p>
            当サイトは、お預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>ご本人の同意がある場合</li>
            <li>法令に基づき開示することが必要である場合</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-slate-900">お問い合わせ</h2>
          <p>
            個人情報の取り扱いに関するお問い合わせは、当サイトの「お問い合わせフォーム」よりご連絡ください。
          </p>
        </section>
      </div>

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