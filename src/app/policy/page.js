"use client";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { APP_DICTS } from "../../utils/constants";

export default function PolicyPage() {
  const { lang } = useLanguage();
  const t = APP_DICTS.UI_TEXT;

  // サイトポリシー専用の翻訳データ
  const policyT = {
    TITLE: { ja: "サイトポリシー", en: "Site Policy" },
    CONCEPT_TITLE: { ja: "コンセプト", en: "Concept" },
    CONCEPT_TEXT: { 
      ja: "当サイト「Umeki_Apps」は、日本を拠点に、個人開発と業務システムの改善に取り組むプロジェクトのポータルサイトです。", 
      en: "Umeki_Apps is a portal site for projects based in Japan, focusing on independent development and the improvement of business systems." 
    },
    DISCLAIMER_TITLE: { ja: "免責事項", en: "Disclaimer" },
    DISCLAIMER_LIST1: { 
      ja: "当サイトで提供するソフトウェアおよび情報の利用により生じた、いかなる損害についても開発者は一切の責任を負いません。", 
      en: "The developer assumes no responsibility for any damages resulting from the use of the software and information provided on this site." 
    },
    DISCLAIMER_LIST2: { 
      ja: "各アプリケーションの動作や正確性については細心の注意を払っておりますが、恒久的なサポートや完全性を保証するものではありません。", 
      en: "While every effort is made to ensure the operation and accuracy of each application, permanent support and completeness are not guaranteed." 
    },
    DISCLAIMER_LIST3: { 
      ja: "当サイトからリンクされた外部サイトの内容やサービスについても、一切の関与および責任を負いかねます。", 
      en: "The developer is not involved in and assumes no responsibility for the content or services of external sites linked from this site." 
    },
    IP_TITLE: { ja: "知的財産権", en: "Intellectual Property Rights" },
    IP_TEXT: { 
      ja: "当サイトに掲載されているコンテンツ、および提供されるソフトウェアの著作権は、特段の記載がない限り開発者（U1344）に帰属します。無断での二次配布や商用利用はご遠慮ください。", 
      en: "The copyrights for the content on this site and the software provided belong to the developer (U1344) unless otherwise stated. Please refrain from unauthorized secondary distribution or commercial use." 
    },
    CHANGE_TITLE: { ja: "ポリシーの変更", en: "Policy Changes" },
    CHANGE_TEXT: { 
      ja: "本ポリシーは、必要に応じて予告なく変更することがあります。変更後のポリシーは、当サイトに掲載した時点から効力を生じるものとします。", 
      en: "This policy may be changed as necessary without notice. The updated policy becomes effective from the moment it is posted on this site." 
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-slate-200">
      <h1 className="text-3xl font-black mb-8 border-b border-slate-200 pb-4 text-white tracking-tight">
        {policyT.TITLE[lang]}
      </h1>
      
      <div className="space-y-10 leading-relaxed text-sm">
        <section>
          <h2 className="text-xl font-bold mb-3 text-white">{policyT.CONCEPT_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {policyT.CONCEPT_TEXT[lang]}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white">{policyT.DISCLAIMER_TITLE[lang]}</h2>
          <ul className="list-disc ml-5 space-y-3 text-slate-200">
            <li>{policyT.DISCLAIMER_LIST1[lang]}</li>
            <li>{policyT.DISCLAIMER_LIST2[lang]}</li>
            <li>{policyT.DISCLAIMER_LIST3[lang]}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white">{policyT.IP_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {policyT.IP_TEXT[lang]}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white">{policyT.CHANGE_TITLE[lang]}</h2>
          <p className="text-slate-200">
            {policyT.CHANGE_TEXT[lang]}
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