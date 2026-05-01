import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  if (url.pathname.startsWith('/admin/login') || url.pathname.startsWith('/api/admin/login')) {
    return NextResponse.next();
  }

  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
    const token = req.cookies.get('admin_token');
    
    if (token && token.value === 'secure_admin_session') {
      return NextResponse.next();
    }

    if (url.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
