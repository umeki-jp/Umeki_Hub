import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const docsDirectory = path.join(process.cwd(), 'content/docs');

// 許可するHTMLタグ・属性の設定
const sanitizeConfig = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'img']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'width', 'height'],
    '*': ['class'],
  },
};

// 文字列または多言語オブジェクト（{ ja, en }）両方に対応してサニタイズ
function sanitizeField(field) {
  if (!field) return field;
  if (typeof field === 'string') return sanitizeHtml(field, sanitizeConfig);
  if (typeof field === 'object') {
    return Object.fromEntries(
      Object.entries(field).map(([lang, val]) => [
        lang,
        typeof val === 'string' ? sanitizeHtml(val, sanitizeConfig) : val,
      ])
    );
  }
  return field;
}

export function getDocData(id) {
  const fullPath = path.join(docsDirectory, `${id}.md`);

  // ファイルが存在しない場合のハンドリング
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Markdownの先頭にある設定（metaデータ）を解析
  const { data, content } = matter(fileContents);

  // Markdown本文をHTMLに変換後、サニタイズ
  const contentHtml = sanitizeHtml(marked(content), sanitizeConfig);

  return {
    id,
    contentHtml,
    ...data,
    // frontmatter の HTML フィールドもサニタイズ
    overviewHtml: sanitizeField(data.overviewHtml),
    usageHtml: sanitizeField(data.usageHtml),
  };
}