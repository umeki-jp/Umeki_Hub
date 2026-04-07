'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signup(formData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirm_password') // 確認用パスワードを取得
  const displayName = formData.get('display_name')

  // 1. 名前の入力チェック
  if (!displayName || displayName.trim().length === 0) {
    redirect(`/register?error=${encodeURIComponent("Please enter your name")}`)
  }
  // 2. 名前の文字数制限（30文字に統一）
  if (displayName.length > 30) {
    redirect(`/register?error=${encodeURIComponent("Name must be 30 characters or less")}`)
  }
  // 3. パスワードの最小文字数
  if (!password || password.length < 8) {
    redirect(`/register?error=${encodeURIComponent("Password must be at least 8 characters")}`)
  }
  // 4. パスワード一致確認（追加）
  if (password !== confirmPassword) {
    redirect(`/register?error=${encodeURIComponent("Passwords do not match")}`)
  }

  // 名前(displayName)をメタデータとしてSupabaseへ渡す
  const { error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        display_name: displayName,
      }
    }
  })
  
  if (error) {
    console.error('Signup error:', error.message)
    redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/auth/confirm') 
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google login error:', error.message)
    redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function login(formData) {
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login error:', error.message);
    redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout');
  redirect('/'); 
}