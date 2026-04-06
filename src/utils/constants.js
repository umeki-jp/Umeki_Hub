// アプリケーション全体で使用する共通辞書（i18n対応版）
export const APP_DICTS = {
  // カテゴリ定義
  CATEGORIES: {
    WORK: { id: "WORK", label: { ja: "仕事", en: "Work" } },
    BUSINESS: { id: "BUSINESS", label: { ja: "ビジネス", en: "Business" } },
    LIFE: { id: "LIFE", label: { ja: "生活", en: "Life" } },
    HEALTH: { id: "HEALTH", label: { ja: "健康", en: "Health" } },
    FINANCE: { id: "FINANCE", label: { ja: "お金・資産", en: "Finance" } },
    EDUCATION: { id: "EDUCATION", label: { ja: "教育・学習", en: "Education" } },
    CREATIVE: { id: "CREATIVE", label: { ja: "クリエイティブ", en: "Creative" } },
    COMMUNICATION: { id: "COMMUNICATION", label: { ja: "コミュニケーション", en: "Communication" } },
    TOOL: { id: "TOOL", label: { ja: "ツール", en: "Tool" } },
    DATA: { id: "DATA", label: { ja: "データ管理", en: "Data" } },
    GAME: { id: "GAME", label: { ja: "ゲーム", en: "Game" } },
    ENTERTAINMENT: { id: "ENTERTAINMENT", label: { ja: "エンタメ", en: "Entertainment" } }
  },

  // プラットフォーム定義
  PLATFORMS: {
    WEB: { id: "WEB", label: { ja: "Web App", en: "Web App" } },
    DESKTOP: { id: "DESKTOP", label: { ja: "Desktop", en: "Desktop" } },
    MOBILE: { id: "MOBILE", label: { ja: "Mobile App", en: "Mobile App" } }
  },

  // ライセンス形態
  LICENSE: {
    FREE: "Free",
    FREEMIUM: "Free / Pro",
    PRO: "Pro",
    INTERNAL: "Internal"
  },

  // --- 追加：ページ共通のUI文言 ---
  UI_TEXT: {
    NAV: {
      DASHBOARD: { ja: "ダッシュボード", en: "Dashboard" },
      PROFILE: { ja: "Profile", en: "Profile" },
      SETTINGS: { ja: "Settings", en: "Settings" },
      LOGIN: { ja: "Login", en: "Login" },
      LOGOUT: { ja: "Logput", en: "Logout" }
    },
    COMMON: {
      SEARCH_PLACEHOLDER: { ja: "キーワードで検索...", en: "Search by keyword..." },
      CATEGORIES_LABEL: { ja: "カテゴリー", en: "Categories" },
      PLATFORMS_LABEL: { ja: "プラットフォーム", en: "Platforms" },
      ALL: { ja: "すべて", en: "All" },
      LAUNCH_APP: { ja: "アプリを起動", en: "Launch App" },
      DOCS: { ja: "ドキュメント", en: "Documentation" },
      BACK_TO_DASHBOARD: { ja: "ダッシュボードに戻る", en: "Back to Dashboard" },
      CLOSE: { ja: "このページを閉じる", en: "Close this page" },
      NO_RESULTS: { ja: "条件に一致するアプリは見つかりませんでした。", en: "No apps match your criteria." }
    },
    FOOTER: {
      SUPPORT: { ja: "☕ 開発支援", en: "☕ Support" },
      POLICY: { ja: "サイトポリシー", en: "Site Policy" },
      PRIVACY: { ja: "プライバシーポリシー", en: "Privacy Policy" },
      CONTACT: { ja: "お問い合わせ", en: "Contact" }
    }
  }
};

// ヘルパー関数
export const CATEGORY_OPTIONS = Object.values(APP_DICTS.CATEGORIES);
export const PLATFORM_OPTIONS = Object.values(APP_DICTS.PLATFORMS);