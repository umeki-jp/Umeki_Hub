import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// HTMLメール内のXSSを防ぐためエスケープ
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// メールアドレスの簡易バリデーション
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, honeymoon } = body;

    // スパム対策：ハニーポット
    if (honeymoon) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // 入力バリデーション
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: "名前を入力してください" }, { status: 400 });
    }
    if (name.trim().length > 100) {
      return NextResponse.json({ error: "名前が長すぎます" }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "有効なメールアドレスを入力してください" }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: "メッセージを入力してください" }, { status: 400 });
    }
    if (message.trim().length > 5000) {
      return NextResponse.json({ error: "メッセージが長すぎます（5000文字以内）" }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      console.error("CONTACT_TO_EMAIL is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      // 送り主は固定（信頼性のため）
      from: 'Contact Form <onboarding@resend.dev>',
      // 宛先は環境変数から取得
      to: [toEmail],
      // 返信先をユーザーのアドレスに設定
      reply_to: email,
      subject: `【Portal】お問い合わせ：${escapeHtml(name)}様より`,
      html: `
        <h2>新しいお問い合わせ</h2>
        <hr />
        <p><strong>送信者名:</strong> ${escapeHtml(name)}</p>
        <p><strong>メールアドレス:</strong> ${escapeHtml(email)}</p>
        <p><strong>内容:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        <hr />
        <p>※このメールに返信すると、直接送信者に届きます。</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("Critical Server Error:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}