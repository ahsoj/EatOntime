import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface User {
  role: string;
  uid: number;
}

export function middleware(request: NextRequest) {
  let cookie: any = request.cookies.get("token")?.value;
  let _user: User | null = cookie ? JSON.parse(cookie) : null;

  if (
    (request.nextUrl.pathname.startsWith("/signin") && _user !== null) ||
    (request.nextUrl.pathname.startsWith("/register") && _user !== null)
  ) {
    return NextResponse.redirect(
      new URL(`/${_user.role}/${_user.uid}`, request.url)
    );
  }

  if (request.nextUrl.pathname.startsWith("/home") && _user !== null) {
    return NextResponse.redirect(
      new URL(
        `/${_user.role}/${_user.uid}${
          _user.role === "merchant" ? "/dashboard" : ""
        }`,
        request.url
      )
    );
  }
  if (request.nextUrl.pathname.startsWith("/home") && _user === null) {
    return NextResponse.redirect(new URL(`/signin`, request.url));
  }
}

export const config = {
  matcher: ["/home/:path*"],
};
