import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { searchParams, origin } = new URL(req.url)
  console.log(req.url, 'callback url');
  // const code = searchParams.get('code')
  // if (code) {
  //   await supabase.auth.exchangeCodeForSession(code)
  // }

  return NextResponse.redirect(origin)
}