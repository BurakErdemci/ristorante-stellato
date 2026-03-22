import { auth } from "@/auth";
import { NextResponse } from "next/server";

const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || "admin";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;

  // /admin/* direkt erişimi engelle → ana sayfaya yönlendir
  // (API rotaları hariç — NextAuth bunları kullanıyor)
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Gizli admin rotası
  if (pathname.startsWith(`/${ADMIN_ROUTE}`)) {
    const isLoginPage = pathname === `/${ADMIN_ROUTE}/login`;

    // Login sayfası
    if (isLoginPage) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(`/${ADMIN_ROUTE}`, req.url));
      }
      // Gizli URL'i fiziksel /admin/login sayfasına yönlendir (internal rewrite)
      return NextResponse.rewrite(new URL("/admin/login", req.url));
    }

    // Giriş yapmamışsa login'e gönder
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/${ADMIN_ROUTE}/login`, req.url));
    }

    // Giriş yapmışsa → fiziksel /admin sayfasına internal rewrite
    const adminPath = pathname.replace(`/${ADMIN_ROUTE}`, "/admin");
    return NextResponse.rewrite(new URL(adminPath, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    // Gizli admin rotası — env'den okunamadığı için geniş matcher kullanıyoruz
    // Static dosyalar ve API auth rotaları hariç
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
