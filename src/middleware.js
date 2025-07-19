import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const email = request.cookies.get("email")?.value;

  const protectedRoutes = ["/predict", "/community", "/me"];
  const authRoutes = ["/sign-in", "/sign-up"];
  const otpRoute = "/otp";

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const redirectUrl = new URL("/sign-in", request.url);
      redirectUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname === otpRoute) {
    if (!email) {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  }

  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/auth/success")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
