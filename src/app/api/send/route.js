// src/app/api/send/route.js

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, honeymoon } = body;

    console.log("--- API Request Received ---");
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);

    if (honeymoon) {
      console.log("Honeymoon trap triggered");
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
    // 1. 送り主は「固定」にする（信頼性のため）
    from: 'Contact Form <onboarding@resend.dev>',
    
    // 2. 宛先は「自分のアドレス」にする（確実に受け取るため）
    to: ['h.umeki@ymail.ne.jp'], 

    // 3. 返信先を「ユーザーのアドレス」にする
    // これにより、届いたメールにそのまま返信すればユーザーに届きます
    reply_to: email, 

    subject: `【Portal】お問い合わせ：${name}様より`,
    html: `
        <h2>新しいお問い合わせ</h2>
        <hr />
        <p><strong>送信者名:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>内容:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr />
        <p>※このメールに返信すると、直接送信者に届きます。</p>
    `,
    });

    if (error) {
      // ここが重要！Resendからの具体的なエラーをターミナルに出す
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });

  } catch (error) {
    // 予期せぬエラー（ネットワークエラー等）をターミナルに出す
    console.error("Critical Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}