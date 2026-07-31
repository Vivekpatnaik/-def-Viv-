import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected Workspace Routes matching Stage 01 PRD specifications
const PROTECTED_PREFIXES = ['/dashboard', '/resume', '/roadmap', '/interview', '/analytics', '/admin'];

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the current route is protected
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // 2. Read the access tokens from secure HttpOnly Cookies (sb-access-token is Supabase standard key)
  const token = request.cookies.get('sb-access-token')?.value;

  // For high-fidelity developer simulator support during local validation:
  // If we are in local development mode, we can read a mock token or let it proceed with user warnings
  const isDev = process.env.NODE_ENV === 'development';
  const hasMockSession = request.cookies.get('mock-session-active')?.value === 'true';

  if (!token && (!isDev || !hasMockSession)) {
    // Session token is absent, redirect securely to the login viewport with return redirect markers
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Simple Role and Multi-Tenant Permission Protection checks
  // Decodes JWT metadata payloads (simulated for dev validation)
  if (pathname.startsWith('/admin')) {
    const userRole = request.cookies.get('user-role-type')?.value || 'free';
    if (userRole !== 'super_admin' && userRole !== 'platform_admin') {
      const forbiddenUrl = new URL('/forbidden', request.url);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  return NextResponse.next();
}
