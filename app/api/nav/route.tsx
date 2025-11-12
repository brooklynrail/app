import { getNavData } from "@/lib/utils/homepage"

export const dynamic = "force-dynamic"
export const revalidate = 31536000 // 1 year

export async function GET() {
  try {
    // This awaits the Directus call - even if it's slow, it completes
    const navData = await getNavData()

    if (!navData) {
      return Response.json(
        {
          error: "Navigation data not found",
          details: "Unable to fetch navigation data from Directus",
        },
        { status: 404 },
      )
    }

    return Response.json(navData, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("❌ Error in nav API:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })

    return Response.json(
      {
        error: "Failed to fetch navigation data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
