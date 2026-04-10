# 05_project_log.md (今の状態)

## TODOリスト
- [x] パスワード変更画面のバリデーション強化 → 完了（2026-04-10）
- [ ] `ai-context/` フォルダの各プロジェクトへの適用

## 開発ログ
- **2026-04-10**: profilesテーブルのdisplay_nameを30文字へ拡張。パスワード周りのUI/UX改善（一致確認・表示切替ボタン）。

- **2026-04-10**: セキュリティ・パフォーマンス・品質の包括的改善を実施。詳細は以下。

---

### 2026-04-10 — セキュリティ・品質改善セッション

#### 🔴 重大（セキュリティ）

**1. XSS脆弱性の修正 `src/lib/markdown.js` / `src/app/docs/[id]/DocContent.js`**
- `dangerouslySetInnerHTML` でレンダリングするHTMLにサニタイズ処理がなく、XSS攻撃が可能な状態だった
- `sanitize-html` パッケージを導入し、`markdown.js` のサーバーサイドでサニタイズ処理を追加
- `marked()` で変換したMarkdown本文、frontmatterの `overviewHtml` / `usageHtml`（多言語オブジェクト対応）すべてに適用
- クライアントバンドルに影響しないサーバーサイド処理として実装

**2. コンタクトフォームAPIの修正 `src/app/api/send/route.js`**
- 宛先メールアドレスがソースコードにハードコードされていた → `CONTACT_TO_EMAIL` 環境変数に移動
- `name` / `email` / `message` の入力バリデーションが未実装だった → 型・形式・文字数チェックを追加
- HTMLメール本文に変数を直接展開していた → `escapeHtml()` 関数でXSS対策
- Resendのエラー詳細をクライアントに返却していた → 汎用メッセージに置換
- 不要な `console.log` を削除（`console.error` は維持）
- `.env.local` / `.env.example` に `CONTACT_TO_EMAIL` を追加

**3. ミドルウェア `src/middleware.js`**
- セッション取得後にルート保護が未実装の状態（コメントで意図的に無効化済み）
- 設計方針を確認し、現状（全ページ公開）を維持することを確定

---

#### 🟠 高優先度（パフォーマンス・認証）

**4. Supabaseクライアントのメモ化 `src/app/ClientLayout.js` / `src/app/settings/account/page.js`**
- `createClient()` がコンポーネント本体で直接呼ばれており、レンダリング毎に新インスタンスが生成されていた
- `useMemo(() => createClient(), [])` に変更し不要な再生成を防止

**5. キャッシュバスター削除 `src/app/page.js`**
- `apps.json` のfetchに `?t=Date.now()` を付与しており、毎回ブラウザキャッシュを無効化していた
- キャッシュバスターを削除し、ブラウザキャッシュが正常に機能するよう修正

**6. パスワード複雑性チェック強化 `src/app/auth/actions.js` / `src/app/register/page.js` / `src/app/settings/account/page.js`**
- 長さ（8文字以上）のみのチェックだった
- 大文字・数字・記号をそれぞれ1文字以上含む正規表現バリデーションをサーバー・クライアント両方に追加
- パスワード入力欄のヒント文言を要件に合わせて更新（日英両対応）

---

#### 🟡 中優先度（コード品質・UX・アクセシビリティ）

**7. `<PasswordInput>` コンポーネント新規作成 `src/app/components/PasswordInput.js`**
- `register/page.js` と `settings/account/page.js` でパスワード表示切替ボタンのコードが完全重複していた
- 共通コンポーネントとして切り出し、両ページで `<PasswordInput>` を利用するよう置換
- Props: `name` / `value` / `onChange` / `showHint` / `compareValue`（不一致警告）など

**8. `<ConfirmModal>` コンポーネント新規作成 `src/app/components/ConfirmModal.js`**
- アカウント削除確認に `window.confirm()` を使用しており、デザインと一致していなかった
- デザインシステムに合ったカスタムモーダルを実装し `settings/account/page.js` に適用
- `danger` prop で確認ボタンを赤色に変更可能、`aria-modal` / `role="dialog"` でアクセシビリティ対応

**9. スケルトンUIの追加 `src/app/settings/account/page.js`**
- ローディング中に `"Loading..."` テキストのみ表示されていた
- `animate-pulse` を使ったスケルトンUIに置換し、レイアウトシフトを軽減

**10. ハニーポットのアクセシビリティ修正 `src/app/contact/page.js`**
- スクリーンリーダー向けに `aria-hidden="true"` が未設定だった → 追加

**11. `HEADER_HEIGHT` 定数化 `src/utils/constants.js`**
- `h-[64px]` / `top-[64px]` が `ClientLayout.js` と `page.js` に重複ハードコードされていた
- `constants.js` に `HEADER_HEIGHT = 64` を追加し、インラインスタイルで参照するよう変更

**12. Image `sizes` 属性の構文ミス修正 `src/app/docs/[id]/DocContent.js`**
- `sizes="(max-w-768px) 100vw, 800px"` → `sizes="(max-width: 768px) 100vw, 800px"` に修正
