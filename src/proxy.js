import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;

  // Not Logged In
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = session.user.role;

  // Tenant Routes Protection
  if (pathname.startsWith("/dashboard/tenant") && role !== "tenant") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Owner Routes Protection
  if (pathname.startsWith("/dashboard/owner") && role !== "owner") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin Routes Protection
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/properties/:path", "/dashboard/:path*"],
};
