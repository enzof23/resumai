import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  const pathname = req.nextUrl.pathname;

  const onConnexionRoute = pathname.startsWith("/connexion");
  const alreadyAuthenticated = session && onConnexionRoute;

  if (alreadyAuthenticated) {
    // User is trying to access "/connexion" but is already authenticated
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
