"use client";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { APP_DICTS } from "../../utils/constants";

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  // プライバシーポリシー専用の翻訳データ
  const privacyT = {
    TITLE: { ja: "プライバシーポリシー", en: "Privacy Policy" },
    SECTION1_TITLE: { ja: "個人情報の収集について", en: "Collection of Personal Information" },
    SECTION1_TEXT: { 
      ja: "当サイトでは、お問い合わせフォームの利用やサービスの提供にあたり、氏名やメールアドレス等の個人情報をご入力いただく場合があります。これらの情報は、質問に対する回答や必要な情報を電子メール等でご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。", 
      en: "On this site, we may ask you to enter personal information such as your name and email address when using the contact form or providing services. This information is used only for responding to inquiries or providing necessary information via email and will not be used for any other purpose." 
    },
    SECTION2_TITLE: { ja: "広告・解析ツールの利用", en: "Use of Advertising and Analytics Tools" },
    SECTION2_TEXT: { 
      ja: "当サイトでは、サービスの改善を目的として、Cookie（クッキー）を利用したアクセス解析ツール（Google Analytics等）を使用する場合があります。これらは匿名で収集されており、個人を特定するものではありません。ブラウザの設定によりCookieを無効にすることで収集を拒否することが可能です。", 
      en: "This site may use access analysis tools (such as Google Analytics) that utilize cookies for the purpose of improving our services. Data is collected anonymously and does not identify individuals. You can refuse collection by disabling cookies in your browser settings." 
    },
    SECTION3_TITLE: { ja: "決済情報の取り扱い", en: "Handling of Payment Information" },
    SECTION3_TEXT: { 
      ja: "有料サービスをご利用いただく際の決済は、外部決済サービス（Stripe）を通じて行われます。当サイトのサーバー上でクレジットカード番号等の機密性の高い決済情報を保存・蓄積することはありません。", 
      en: "Payments for paid services are processed through an external payment service (Stripe). We do not store or accumulate highly sensitive payment information, such as credit card numbers, on our servers." 
    },
    SECTION4_TITLE: { ja: "第三者への開示・提供の禁止", en: "Prohibition of Disclosure to Third Parties" },
    SECTION4_TEXT: { 
      ja: "当サイトは、お預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。", 
      en: "We manage the personal information entrusted to us appropriately and will not disclose it to third parties except in the following cases:" 
    },
    SECTION4_LIST1: { ja: "ご本人の同意がある場合", en: "With the consent of the individual" },
    SECTION4_LIST2: { ja: "法令に基づき開示することが必要である場合", en: "When disclosure is required by law" },
    SECTION5_TITLE: { ja: "お問い合わせ", en: "Contact Us" },
    SECTION5_TEXT: { 
      ja: "個人情報の取り扱いに関するお問い合わせは、当サイトの「お問い合わせフォーム」よりご連絡ください。", 
      en: "For inquiries regarding the handling of personal information, please contact us via the contact form on this site." 
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-slate-200">
      <h1 className="text-3xl font-black mb-8 border-b border-slate-200 pb-4 text-white tracking-tight">
        {privacyT.TITLE[lang]}
      </h1>
      
      <div className="space-y-10 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-bold mb-3 text-white">{privacyT.SECTION1_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {privacyT.SECTION1_TEXT[lang]}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-white">{privacyT.SECTION2_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {privacyT.SECTION2_TEXT[lang]}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-white">{privacyT.SECTION3_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {privacyT.SECTION3_TEXT[lang]}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-white">{privacyT.SECTION4_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {privacyT.SECTION4_TEXT[lang]}
          </p>
          <ul className="list-disc ml-5 mt-3 space-y-2 text-slate-200">
            <li>{privacyT.SECTION4_LIST1[lang]}</li>
            <li>{privacyT.SECTION4_LIST2[lang]}</li>
          </ul>
        </section>

        <section className="p-6 bg-slate-900 border border-slate-200 rounded-2xl">
          <h2 className="text-lg font-bold mb-3 text-white">{privacyT.SECTION5_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {privacyT.SECTION5_TEXT[lang]}
          </p>
        </section>
      </div>

      <div className="mt-16 text-center pb-10">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-slate-200 text-slate-900 font-bold py-3 px-10 rounded-full hover:bg-white transition-all shadow-lg"
        >
          {t.COMMON.BACK_TO_DASHBOARD[lang]}
        </Link>
      </div>
    </div>
  );
}