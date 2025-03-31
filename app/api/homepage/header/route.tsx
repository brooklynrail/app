import directus from "@/lib/directus"
import { Homepage } from "@/lib/types"
import { readSingleton } from "@directus/sdk"

export const revalidate = 3600 // 1 hour cache

export async function GET() {
  try {
    let homepageData
    try {
      homepageData = await directus.request(
        readSingleton("homepage", {
          fields: [
            "id",
            {
              banners: [
                {
                  collections_id: [
                    "id",
                    "type",
                    "kicker",
                    "title",
                    "description",
                    "links",
                    "limit",
                    "status",
                    "banner_type",
                  ],
                },
              ],
            },
            {
              video_covers: [{ directus_files_id: ["id", "width", "height", "filename_disk", "caption"] }],
            },
            {
              video_covers_stills: [{ directus_files_id: ["id", "width", "height", "filename_disk", "caption"] }],
            },
            "video_covers_vertical_position",
          ],
          filter: {
            _and: [
              {
                banners: {
                  collections_id: {
                    status: { _eq: `published` },
                  },
                },
              },
            ],
          },
        }),
      )
    } catch (error) {
      console.error("Error fetching homepage singleton:", error)
      homepageData = {} // Provide empty default if singleton not found
    }

    const homepage = homepageData as Homepage

    return Response.json(homepage, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in homepage API:", error)
    return Response.json({ error: "Failed to fetch homepage data", details: (error as Error).message }, { status: 500 })
  }
}
