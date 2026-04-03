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
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['h.umeki@ymail.ne.jp'], // ←必ずResendに登録した自分のアドレスにする
      subject: `【Portal】お問い合わせ：${name}様より`,
      reply_to: email,
      html: `<p>${message}</p>`,
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