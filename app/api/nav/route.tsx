import directus from "@/lib/directus"
import { readSingleton } from "@directus/sdk"

export async function GET() {
  try {
    try {
      const navData = await directus.request(
        readSingleton("homepage", {
          fields: [
            "id",
            {
              banners: [
                {
                  collections_id: ["id", "type", "kicker", "title", "description", "links", "limit", "banner_type"],
                },
              ],
            },
            {
              collections: [
                {
                  collections_id: [
                    "id",
                    "type",
                    "kicker",
                    "title",
                    "limit",
                    "links",
                    "banner_type",
                    {
                      section: ["slug", "featured"],
                    },
                    {
                      tribute: ["slug"],
                    },
                  ],
                },
              ],
            },
          ],
        }),
      )

      const cleanedData = JSON.parse(JSON.stringify(navData))

      // Add cache-control header
      return Response.json(cleanedData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error("Error fetching Nav data:", error)
      return Response.json({ error: "Navigation data not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    return Response.json({ error: "Failed to fetch navigation data" }, { status: 500 })
  }
}
