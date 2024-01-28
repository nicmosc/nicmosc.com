import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('next-auth.session-token')?.value;

  if (session == null && !request.url.includes('login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
