import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// async を追加
export async function createClient() {
  // await を追加
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // ミドルウェアで処理するため無視
          }
        },
      },
    }
  )
}