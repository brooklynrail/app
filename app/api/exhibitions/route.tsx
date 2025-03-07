import directus from "@/lib/directus"
import { readItems } from "@directus/sdk"

export async function GET() {
  try {
    const exhibitions = await directus.request(
      readItems("exhibitions", {
        fields: [
          "id",
          "slug",
          "title",
          "start_date",
          "end_date",
          "status",
          "opening_date",
          "opening_details",
          "show_artists_list",
          "kicker",
          {
            artists: [
              {
                people_id: [
                  "id",
                  "display_name",
                  "bio",
                  "website",
                  "instagram",
                  "related_links",
                  {
                    portrait: ["id", "width", "height", "filename_disk", "alt", "caption", "modified_on"],
                  },
                ],
              },
            ],
          },
          {
            featured_image: ["id", "width", "height", "filename_disk", "alt", "caption"],
          },
        ],
        filter: {
          _and: [{ status: { _eq: `published` } }],
        },
      }),
    )

    const cleanedData = JSON.parse(JSON.stringify(exhibitions))

    return Response.json(cleanedData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching exhibitions data:", error)
    return Response.json({ error: "Failed to fetch exhibitions data" }, { status: 500 })
  }
}
