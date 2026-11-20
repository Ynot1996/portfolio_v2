import { NextRequest, NextResponse } from "next/server";
import { authToken, DASH_COOKIE } from "./app/lib/dashAuth";

// Protects the owner-only /dashboard. The login page stays reachable so the
// owner can authenticate; everything else under /dashboard requires a valid
// cookie derived from DASHBOARD_PASSWORD.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/dashboard/login")) return NextResponse.next();

  const password = process.env.DASHBOARD_PASSWORD;
  const redirect = (reason: string) => {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.search = `?e=${reason}`;
    return NextResponse.redirect(url);
  };

  if (!password) return redirect("noconf");

  const cookie = req.cookies.get(DASH_COOKIE)?.value;
  const expected = await authToken(password);
  if (!cookie || cookie !== expected) return redirect("1");

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
