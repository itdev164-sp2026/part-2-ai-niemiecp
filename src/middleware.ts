import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Refresh the auth session
  const { supabase, response } = await createClient(request);

  // Get the current user using getUser() for session validation
  const { data: { user } } = await supabase.auth.getUser();

  // Protect /projects route - redirect to login if not authenticated
  if (request.nextUrl.pathname.startsWith("/projects")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login and auth pages
     */
    "/((?!_next/static|_next/image|favicon.ico|login).*)",
  ],
};
