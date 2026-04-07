# 認証・ユーザー情報 入力規則定義書

## 1. ユーザープロファイル (`profiles` テーブル)

| 項目名 | 論理名 | DB型 / 制約 | バックエンド (Actions) | フロントエンド (UI) |
| :--- | :--- | :--- | :--- | :--- |
| `id` | ユーザーID | `uuid (PK, auth.users引用)` | (自動取得) | (非表示) |
| `display_name` | 名前 | `text` | 1〜20文字 / 記号不可 | `maxLength: 30`, 必須 |
| `updated_at` | 更新日時 | `timestamp with time zone` | `new Date()` | (非表示) |
| `is_deleted` | 削除申請フラグ | `boolean DEFAULT false` | `true` (削除申請時) | (非表示) |
| `deletion_requested_at` | 削除申請日時 | `timestamp with time zone` | `new Date()` (申請時) | (非表示) |

## 2. アカウント削除ポリシー（論理削除）
- ユーザー画面からのアカウント削除は「完全削除」ではなく「削除申請（論理削除）」として扱う。
- プロフィールテーブルの `is_deleted` を `true` にし、`deletion_requested_at` にタイムスタンプを保存する。
- 30日間は復元サポート期間とする。30日経過後、バッチ処理等により物理削除を実行する。

## 3. 認証情報 (Supabase Auth)

| 項目 | ルール | バリデーション場所 | エラーメッセージ |
| :--- | :--- | :--- | :--- |
| **メールアドレス** | 有効な形式であること | Client / Server | "正しくない形式です" |
| **メールアドレス** | 重複していないこと | Database (Unique) | "既に登録されています" |
| **パスワード** | 8文字以上 | Client / Server | "8文字以上で入力してください" |
| **パスワード** | 一致確認 | Client | "パスワードが一致しません" |

## 3. 実装状況チェックリスト

- [ ] DB側：profilesテーブルの文字数制限設定
- [ ] Server側：actions.js での文字数・形式バリデーション追加
- [ ] Client側：inputタグへの `required`, `minLength`, `maxLength` 追加