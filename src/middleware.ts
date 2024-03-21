import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('Authorization')?.value;

  // if(!token && request.nextUrl.pathname.startsWith("/getLogin")){
  //   const res = NextResponse.redirect((request.url));
  //   res.cookies.set('Authorization', 'TestAuth');
  //   return res
  // }

  if(!token && !request.nextUrl.pathname.startsWith("/login")){
    return NextResponse.redirect(new URL("/login", request.url))
  }
  else if (token && request.nextUrl.pathname.startsWith("/login")){
    return NextResponse.redirect(new URL("/", request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/setting/:path*", "/pin/edit/:path*", "/collection/edit/:path*", "/report", "/login"] //+ "/getLogin"
};
