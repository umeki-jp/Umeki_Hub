import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. セッション（ユーザー情報）を取得
  const { data: { user } } = await supabase.auth.getUser()

  // 2. ガードしたいパス（設定画面など）を定義
  const protectedPaths = ['/settings', '/profile']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // 3. 未ログインでガード対象にアクセスした場合、登録画面へ飛ばす
  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/register'
    // ログイン後に元のページに戻れるよう、クエリパラメータを付けても良いですが、まずはシンプルにリダイレクト
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}