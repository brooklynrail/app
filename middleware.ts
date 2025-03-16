import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Match all sitemap paths
export const config = {
  matcher: [
    "/sitemap.xml",
    "/contributors/sitemap.xml",
    "/events/sitemap.xml",
    "/exhibitions/sitemap.xml",
    "/issues/sitemap.xml",
  ],
}

export function middleware(request: NextRequest) {
  try {
    // Only apply these headers for GET requests to sitemap routes
    if (request.method === "GET" && request.nextUrl.pathname.endsWith("sitemap.xml")) {
      const response = NextResponse.next()

      // Add caching headers
      response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200")
      response.headers.set("Content-Encoding", "gzip")
      response.headers.set("Content-Type", "application/xml")

      return response
    }

    // For all other requests, just pass through
    return NextResponse.next()
  } catch (error) {
    console.error("Sitemap middleware error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      path: request.nextUrl.pathname,
      method: request.method,
    })
    return new NextResponse("Error generating sitemap", { status: 500 })
  }
}
