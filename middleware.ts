import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Continue to the requested page
  return NextResponse.next()
}

// Optional: Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Skip static files and api routes that don't use Prisma
    "/((?!_next/static|_next/image|favicon.ico|api/test-prisma).*)",
  ],
}
