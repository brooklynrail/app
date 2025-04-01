import { getHomepageCollectionData } from "@/lib/utils/homepage"

export async function GET() {
  try {
    const homepageCollectionsData = await getHomepageCollectionData()

    if (!homepageCollectionsData) {
      return Response.json(
        {
          error: "Homepage collections data not found",
          details: "Unable to fetch homepage collections data",
        },
        { status: 404 },
      )
    }

    return Response.json(homepageCollectionsData, { status: 200 })
  } catch (error) {
    console.error("❌ Error in homepage collections API:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return Response.json(null, { status: 200 })
  }
}
