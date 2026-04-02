"use client";
import Image from 'next/image';
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { APP_DICTS } from "../../utils/constants";

export default function ProfilePage() {
  const { lang } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  // プロフィール専用の翻訳データ
  const profileT = {
    TITLE: { ja: "開発者プロフィール", en: "Developer Profile" },
    BIO: { 
      ja: "個人開発者として、業務可視化・危機管理・属人化排除をテーマに、シンプルで再現性のある Webアプリを開発しています。", 
      en: "As an independent developer, I build simple and reproducible web applications focused on business visualization, crisis management, and the elimination of individual dependency." 
    },
    LEGAL_TITLE: { ja: "特定商取引法に基づく表記", en: "Legal Notice (Act on Specified Commercial Transactions)" },
    LEGAL: {
      NAME_LABEL: { ja: "事業者の名称", en: "Provider Name" },
      NAME_VALUE: { ja: "Umeki_Apps 運営", en: "Umeki_Apps Operations" },
      OWNER_LABEL: { ja: "代表者または責任者", en: "Representative" },
      OWNER_VALUE: { ja: "梅木 久義 (Hisayoshi Umeki)", en: "Hisayoshi Umeki" },
      ADDRESS_LABEL: { ja: "所在地", en: "Address" },
      ADDRESS_VALUE: { ja: "請求により遅滞なく提供いたします", en: "Provided promptly upon request" },
      CONTACT_LABEL: { ja: "お問い合わせ先", en: "Contact" },
      CONTACT_FORM: { ja: "※お問い合わせフォームからも受付しております", en: "*Contact form is also available" },
      PRICE_LABEL: { ja: "販売価格", en: "Price" },
      PRICE_VALUE: { ja: "各プロジェクト（Stripe決済画面）に表示される金額に基づきます", en: "Based on the amount displayed on each project's Stripe checkout page" },
      PAYMENT_LABEL: { ja: "代金の支払時期・方法", en: "Payment Method / Timing" },
      PAYMENT_VALUE: { ja: "クレジットカード決済（Stripe）。お支払いはご利用のカード会社の請求日に準じます。", en: "Credit Card (Stripe). Payment timing follows your card issuer's billing cycle." },
      DELIVERY_LABEL: { ja: "商品引渡し時期", en: "Delivery Timing" },
      DELIVERY_VALUE: { ja: "決済完了後、即時利用可能となります。", en: "Available immediately after payment completion." },
      RETURN_LABEL: { ja: "返品・キャンセル", en: "Returns / Cancellations" },
      RETURN_VALUE: { 
        ja: "デジタルコンテンツの性質上、決済完了後の返金・返品は原則としてお受けできません。ただし、サービス提供に不具合がある場合は、個別に対応いたします。", 
        en: "Due to the nature of digital content, returns or refunds are generally not accepted after payment. We will handle service malfunctions individually." 
      },
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 text-slate-200">
      {/* 自己紹介セクション */}
      <section className="bg-slate-900 border border-slate-200 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 border-b border-slate-200 pb-2 text-white">
          {profileT.TITLE[lang]}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 shrink-0 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg border-2 border-slate-700">
            <Image 
              src="/assets/images/profile-logo.png" 
              alt="Umeki Hub Logo" 
              width={128} 
              height={128} 
              className="object-cover" 
            />
          </div>
          <div className="flex-grow space-y-4 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Umeki</h3>
            <p className="text-slate-200 leading-relaxed">
              {profileT.BIO[lang]}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <a 
                href="https://github.com/umeki-jp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-70 transition-opacity bg-white p-1 rounded-md"
              >
                <Image 
                  src="/assets/images/GitHub_Invertocat_Black_Clearspace.png" 
                  alt="GitHub" 
                  width={24} 
                  height={24} 
                  className="object-contain"
                />
              </a>
              <a 
                href="https://x.com/ume1344" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-70 transition-opacity bg-white p-1 rounded-md"
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
      <section className="bg-slate-900 border border-slate-200 rounded-2xl p-8 shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-white border-b border-slate-200 pb-2">
          {profileT.LEGAL_TITLE[lang]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <tbody className="divide-y divide-slate-800">
              {[
                [profileT.LEGAL.NAME_LABEL[lang], profileT.LEGAL.NAME_VALUE[lang]],
                [profileT.LEGAL.OWNER_LABEL[lang], profileT.LEGAL.OWNER_VALUE[lang]],
                [profileT.LEGAL.ADDRESS_LABEL[lang], profileT.LEGAL.ADDRESS_VALUE[lang]],
                [profileT.LEGAL.CONTACT_LABEL[lang], (
                  <div key="contact">
                    <p>Email: support@example.com</p>
                    <p className="mt-1 text-xs text-slate-200">
                      {profileT.LEGAL.CONTACT_FORM[lang]}
                      <Link href="/contact" className="text-blue-400 ml-1 hover:underline">
                        {lang === "ja" ? "こちら" : "Here"}
                      </Link>
                    </p>
                  </div>
                )],
                [profileT.LEGAL.PRICE_LABEL[lang], profileT.LEGAL.PRICE_VALUE[lang]],
                [profileT.LEGAL.PAYMENT_LABEL[lang], profileT.LEGAL.PAYMENT_VALUE[lang]],
                [profileT.LEGAL.DELIVERY_LABEL[lang], profileT.LEGAL.DELIVERY_VALUE[lang]],
                [profileT.LEGAL.RETURN_LABEL[lang], profileT.LEGAL.RETURN_VALUE[lang]],
              ].map(([label, value], idx) => (
                <tr key={idx}>
                  <th className="py-4 pr-6 font-semibold text-slate-200 w-1/3 whitespace-nowrap align-top">
                    {label}
                  </th>
                  <td className="py-4 text-slate-200">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-12 text-center pb-10">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-slate-200 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          {t.COMMON.BACK_TO_DASHBOARD[lang]}
        </Link>
      </div>
    </div>
  );
}