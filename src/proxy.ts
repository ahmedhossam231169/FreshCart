import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // On HTTPS (production) NextAuth stores the session in "__Secure-next-auth.session-token"
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: req.nextUrl.protocol === "https:",
  });
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