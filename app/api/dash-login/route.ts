import { NextRequest, NextResponse } from "next/server";
import { authToken, DASH_COOKIE } from "../../lib/dashAuth";

// POST: check the submitted password against DASHBOARD_PASSWORD and, on success,
// set the auth cookie. GET: sign out (clear the cookie).
export async function POST(req: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;
  const form = await req.formData();
  const input = String(form.get("password") ?? "");
  const origin = req.nextUrl.origin;

  if (!password || input !== password) {
    return NextResponse.redirect(`${origin}/dashboard/login?e=1`, { status: 303 });
  }

  const res = NextResponse.redirect(`${origin}/dashboard`, { status: 303 });
  res.cookies.set(DASH_COOKIE, await authToken(password), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(`${req.nextUrl.origin}/`, { status: 303 });
  res.cookies.set(DASH_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
