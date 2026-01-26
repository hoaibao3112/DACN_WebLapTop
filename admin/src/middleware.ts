import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip login page itself
    if (pathname === '/login') {
        return NextResponse.next();
    }

    // Check for access token in cookies
    // Note: Client-side logic will also check localStorage, 
    // but middleware needs cookies or headers.
    // For now, let's keep it simple and rely on client-side redirect 
    // if localStorage is empty, or use a dummy cookie check if implemented.

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
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
