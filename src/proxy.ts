import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
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
  }

  if (pathname === "/admin/login") {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, {
      password: process.env.IRON_SESSION_PASSWORD!,
      cookieName: "zand_admin_session",
    });

    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
