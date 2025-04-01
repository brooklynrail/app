import { getHomepageHeaderData } from "@/lib/utils/homepage"

export const revalidate = 3600 // 1 hour cache

export async function GET() {
  try {
    const homepageHeaderData = await getHomepageHeaderData()

    if (!homepageHeaderData) {
      return Response.json(
        {
          error: "Homepage header data not found",
          details: "Unable to fetch homepage header data",
        },
        { status: 404 },
      )
    }

    return Response.json(homepageHeaderData, { status: 200 })
  } catch (error) {
    console.error("❌ Error in homepage header API:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return Response.json(null, { status: 200 })
  }
}
