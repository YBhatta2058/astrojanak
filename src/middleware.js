import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token');
    const { pathname } = request.nextUrl;

    if (!token?.value) {
        if (pathname !== '/login' && pathname !== '/register') {
            return NextResponse.next();
        }
        return NextResponse.next();
    } else {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
}
