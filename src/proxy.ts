import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
  // 1. Create an initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Setup Supabase Client (Handles Token Refresh automatically)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Check Session (Securely validates with Supabase Auth Server)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. PROTECTION LOGIC

  // A. Protect Admin Routes
  // If user tries to go to /admin AND is not logged in -> Kick to Login
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // B. Prevent Double Login
  // If user goes to /login AND is already logged in -> Send to Dashboard
  if (request.nextUrl.pathname.startsWith('/login') && user) {
     return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  // OPTIMIZED MATCHER:
  // Only run this logic on Admin routes and the Login page.
  // This ensures your public site (Home, About, etc.) stays lightning fast.
  matcher: [
    '/admin/:path*', 
    '/login',
  ],
};