import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from "next-auth";
// import { authOptions } from './app/api/auth/[...nextauth]/options';
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // const session = await getServerSession(authOptions);
  

  // If the user is logged in and tries to access sign-in, sign-up, or verify routes, redirect to dashboard
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is not logged in and trying to access protected routes
  if (!token) {
    const protectedRoutes = [
      '/create-conference',
      '/dashboard',
      '/submit-paper',
    ];

    // Check if the current path is one of the protected routes
    if (protectedRoutes.some(route => url.pathname.startsWith(route))) {
      // Redirect to the sign-in page with the current URL as the callbackUrl
      const callbackUrl = encodeURIComponent(request.url); // Encode the original URL
      return NextResponse.redirect(
        new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url),
      );
    }
  }


  //writing middleware for video calling authentication
  const meetingRoutes = [
    '/room',
  ];
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
  console.log(request.cookies.has("meet-config"))

  if(request.cookies.has("meet-owner")){
    return NextResponse.next();
  }
  if(!request.cookies.has("meet-config") && meetingRoutes.some(route => url.pathname.startsWith(route))){
    return NextResponse.redirect(new URL('/verifymeetcredentials', request.url));
  }


  // Allow request to proceed if all checks pass
  return NextResponse.next();
}

// Specify the routes for middleware to apply
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
    '/create-conference',
    '/submit-paper/:path*',
    '/room/:path*'
  ],
};
