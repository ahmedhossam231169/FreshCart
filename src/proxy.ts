import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const authPages = (pathname: string) => pathname.startsWith("/auth");

  if (token && authPages(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }else if (!token && !authPages(req.nextUrl.pathname)) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}
export const config = {
  matcher: ["/cart", "/checkout", "/allorders","/auth/:path*"],
};