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

  // --- ページ共通のUI文言 ---
  UI_TEXT: {
    NAV: {
      DASHBOARD: { ja: "ダッシュボード", en: "Dashboard" },
      PROFILE: { ja: "開発者", en: "Profile" },
      SETTINGS: { ja: "設定", en: "Settings" },
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
    },
    AUTH: {
      CONFIRM_TITLE: { ja: "メールをご確認ください", en: "Check your email" },
      CONFIRM_MSG: { ja: "承認用メールを送信しました。メール内のリンクをクリックして登録を完了させてください。", en: "A confirmation link has been sent to your email address. Please click the link to complete your registration." },
      BACK_TO_LOGIN: { ja: "ログイン画面に戻る", en: "Back to Login" },
    },
    ACCOUNT: {
      TITLE: { ja: "アカウント情報", en: "Account Information" },
      DISPLAY_NAME: { ja: "表示名", en: "Display Name" },
      AVATAR: { ja: "アイコン画像", en: "Profile Image" },
      PLAN: { ja: "現在のプラン", en: "Current Plan" },
      NOTIFICATIONS: { ja: "通知設定", en: "Notifications" },
      NOTIFY_NEWS: { ja: "お知らせを受け取る", en: "Receive news" },
      NOTIFY_MAG: { ja: "メールマガジンを購読する", en: "Subscribe to newsletter" },
      SAVE: { ja: "設定を保存", en: "Save Changes" },
      CHANGE_PW: { ja: "パスワードを変更", en: "Change Password" },
      DELETE_ACCOUNT: { ja: "アカウントを削除", en: "Delete Account" },
      DELETE_CONFIRM: { ja: "本当にアカウントを削除しますか？この操作は取り消せません。", en: "Are you sure you want to delete your account? This action cannot be undone." },
      PW_NEW: { ja: "新しいパスワード", en: "New Password" },
      PW_CONFIRM: { ja: "新しいパスワード（確認）", en: "Confirm New Password" },
      PW_UPDATE_BTN: { ja: "パスワードを更新", en: "Update Password" },
      PW_ERROR_MISMATCH: { ja: "パスワードが一致しません", en: "Passwords do not match" },
      PW_SUCCESS: { ja: "パスワードを更新しました", en: "Password updated successfully" },
    }
  }
};

// ヘルパー関数
export const CATEGORY_OPTIONS = Object.values(APP_DICTS.CATEGORIES);
export const PLATFORM_OPTIONS = Object.values(APP_DICTS.PLATFORMS);