import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const docsDirectory = path.join(process.cwd(), 'content/docs');

export function getDocData(id) {
  const fullPath = path.join(docsDirectory, `${id}.md`);
  
  // ファイルが存在しない場合のハンドリング
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Markdownの先頭にある設定（metaデータ）を解析
  const { data, content } = matter(fileContents);

  // Markdown本文をHTMLに変換
  const contentHtml = marked(content);

  return {
    id,
    contentHtml,
    ...data,
  };
}