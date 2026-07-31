import type { NextRequest } from 'next/server';
import { authMiddleware } from './shared/middleware/authMiddleware';

export default function proxy(request: NextRequest) {
  return authMiddleware(request);
}

// Map Next.js proxy matcher rules to optimize execution speeds
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
