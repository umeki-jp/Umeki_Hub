# Umeki_Hub

日本を拠点に、個人開発と業務システムの改善に取り組むプロジェクトのポータルサイトです。
危機管理・業務設計の経験を活かし、シンプルで再現性のあるアプリケーションを継続的に公開します。

## 🚀 技術スタック
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 (with Typography plugin)
- **Content**: Markdown (gray-matter + marked)
- **Deployment**: Vercel

## 📂 フォルダ構造
- `src/app/`: ページのルーティングとUI
- `public/data/`: `apps.json` (アプリ一覧データベース)
- `public/assets/docs/`: 手順書用画像
- `content/docs/`: Markdown形式の利用方法・ドキュメント
- `src/lib/`: Markdown解析などの共通ロジック

## 📝 サービス追加の手順（備忘録）

新しいアプリやプロジェクトをポータルに追加する際は、以下のステップで行います。

### ステップ1: JSONへの登録
`public/data/apps.json` を開き、新しいオブジェクトを追加します。
- `id`: 重複しないID（例: `My_New_App`）
- `docPath`: `/docs/` + ID（例: `/docs/My_New_App`）
- `url`: アプリ自体の公開URL（未完成なら空文字）

### ステップ2: ドキュメントの作成
`content/docs/` フォルダ内に `(ID名).md` ファイルを作成します。
※ファイル名はIDと**大文字小文字・アンダースコア含め完全に一致**させてください。

```markdown
---
title: "アプリ名 利用方法"
date: "2026-XX-XX"
---
## 概要
ここに説明文を書く。画像は `/assets/docs/` に置いて参照可能。