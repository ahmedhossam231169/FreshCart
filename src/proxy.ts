import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // NextAuth names the session cookie "__Secure-next-auth.session-token" or
  // "next-auth.session-token" depending on NEXTAUTH_URL, so check both
  const secret = process.env.NEXTAUTH_SECRET;
  const token =
    (await getToken({ req, secret, secureCookie: true })) ??
    (await getToken({ req, secret, secureCookie: false }));
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