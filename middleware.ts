import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect archive, insights, and all simulation models
  const protectedPaths = [
    '/archive', 
    '/insights',
    '/geometric-brownian-motion',
    '/monte-carlo',
    '/volatility-lab',
    '/value-at-risk',
    '/stress-testing',
    '/correlation-matrix',
    '/discounted-cash-flow',
    '/compound-interest',
    '/portfolio-optimization'
  ]
  const isProtected = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/archive/:path*', 
    '/insights/:path*',
    '/geometric-brownian-motion/:path*',
    '/monte-carlo/:path*',
    '/volatility-lab/:path*',
    '/value-at-risk/:path*',
    '/stress-testing/:path*',
    '/correlation-matrix/:path*',
    '/discounted-cash-flow/:path*',
    '/compound-interest/:path*',
    '/portfolio-optimization/:path*'
  ],
}
