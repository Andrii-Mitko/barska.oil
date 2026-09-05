import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!sessionCookie || sessionCookie !== sessionSecret) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Не авторизовано" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
