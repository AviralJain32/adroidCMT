// import {NextRequest, NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'
// export {default} from "next-auth/middleware"
// import { getToken } from 'next-auth/jwt'

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {

//     const token =await getToken({req:request})
//     const url=request.nextUrl
    
//     if(token && 
//         (
//             url.pathname.startsWith("/sign-in") ||
//             url.pathname.startsWith("/sign-up") ||
//             url.pathname.startsWith("/verify") 
//         )
//         // || url.pathname===("/")  
//     ){
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
//     if(!token && url.pathname.startsWith("/create-conference")){
//         return NextResponse.redirect(new URL("/sign-in",request.url))
//     }
//     if(!token && url.pathname.startsWith("/dashboard")){
//         return NextResponse.redirect(new URL("/sign-in",request.url))
//     }
//     if(!token && url.pathname.startsWith("/submit-paper")){
//         return NextResponse.redirect(new URL("/sign-in",request.url))
//     }
//   return NextResponse.next()           
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/sign-in","/sign-up","/","/dashboard/:path*","/verify/:path*","/create-conference","/submit-paper/:path*"]

// }


import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

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
    const protectedRoutes = ['/create-conference', '/dashboard', '/submit-paper'];

    // Check if the current path is one of the protected routes
    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
      // Redirect to the sign-in page with the current URL as the callbackUrl
      const callbackUrl = encodeURIComponent(request.url); // Encode the original URL
      return NextResponse.redirect(
        new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url)
      );
    }
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
  ],
};
