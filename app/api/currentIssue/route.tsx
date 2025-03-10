import directus from "@/lib/directus"
import { readSingleton } from "@directus/sdk"

export async function GET() {
  try {
    const settings = await directus.request(
      readSingleton("global_settings", {
        fields: [
          {
            current_issue: [
              "id",
              "title",
              "slug",
              "summary",
              "special_issue",
              { cover_1: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_2: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_3: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_4: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_5: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_6: ["id", "width", "height", "filename_disk", "caption"] },
            ],
          },
        ],
      }),
    )

    if (!settings.current_issue) {
      return new Response("There is no current issue set", {
        status: 500,
      })
    }

    // Clean the data before sending
    const cleanedData = JSON.parse(JSON.stringify(settings.current_issue))

    return Response.json(cleanedData, {
      headers: {
        ContentType: "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error fetching CurrentIssueData data:", error)
    return Response.json({ error: "Failed to fetch current issue" }, { status: 500 })
  }
}
