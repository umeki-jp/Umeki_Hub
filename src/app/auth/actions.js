'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signup(formData) {
  // ここに await を追加
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error.message)
    // エラー時はリダイレクトせず、ひとまずログ出力のみで確認
    return 
  }

  revalidatePath('/', 'layout')
  redirect('/auth/confirm') 
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  // ログイン後の戻り先URL（本番環境ではVercelのURLにする必要があります）
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google login error:', error.message)
    return
  }

  if (data.url) {
    redirect(data.url) // Googleのログインページへ飛ばす
  }
}

export async function login(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Login error:', error.message);
    // 実際にはエラーを表示する仕組みが必要
    return;
  }

  revalidatePath('/', 'layout');
  redirect('/'); // ログイン成功後にトップへ
}