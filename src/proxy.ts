import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow setup and login pages without authentication
  if (pathname === "/admin/login" || pathname === "/admin/setup") {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, {
      password: process.env.IRON_SESSION_PASSWORD!,
      cookieName: "zand_admin_session",
    });

    // If already logged in, redirect from login to dashboard
    if (session.isLoggedIn && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }

  // All other admin routes require authentication
  if (pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, {
      password: process.env.IRON_SESSION_PASSWORD!,
      cookieName: "zand_admin_session",
    });

    if (!session.isLoggedIn) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
