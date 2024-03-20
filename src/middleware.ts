import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const jwt = request.cookies.get('myCookieName')?.value;
  // if(!jwt){
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }
  // else{
  //   //이미 로그인 한 상태에서 login 접속시
  //   if (request.nextUrl.pathname.startsWith("/login")) {
  //     return NextResponse.redirect(new URL("/", request.url))
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  //matcher: ["/profile/setting/path:*", "/pin/edit/path:*", "/collection/edit/path:*", "/report"]
  matcher:["/matcherTest"]
};
