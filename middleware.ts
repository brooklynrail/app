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
    const response = NextResponse.next()

    // Add caching headers
    response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200")

    // Add compression
    response.headers.set("Content-Encoding", "gzip")

    // Add content type
    response.headers.set("Content-Type", "application/xml")

    return response
  } catch (error) {
    console.error("Sitemap middleware error:", error)
    return new NextResponse("Error generating sitemap", { status: 500 })
  }
}
