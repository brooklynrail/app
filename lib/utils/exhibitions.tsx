import { readItems } from "@directus/sdk"
import directus from "../directus"
import { Exhibitions } from "../types"
import { getBaseUrl } from "../utils"

export const getExhibition = async (slug: string) => {
  const exhibition = await directus.request(
    readItems("exhibitions", {
      fields: [
        "id",
        "slug",
        "kicker",
        "title",
        "deck",
        "dedication",
        "summary",
        "start_date",
        "end_date",
        "opening_date",
        "status",
        "show_details",
        "location",
        "location_map",
        "opening_details",
        "section",
        "title_tag",
        "show_artists_list",
        {
          video_cover: ["id", "width", "height", "filename_disk", "caption"],
        },
        {
          cover_image: ["id", "width", "height", "filename_disk", "caption"],
        },
        "background_color_primary",
        "background_color_secondary",
        "background_color_primary_darkmode",
        "background_color_secondary_darkmode",
        "text_color_primary",
        "text_color_primary_darkmode",
        {
          featured_image: ["id", "width", "height", "filename_disk", "alt", "caption"],
        },
        {
          exhibition_images: [
            {
              directus_files_id: ["id", "width", "height", "filename_disk", "alt", "caption"],
            },
          ],
        },
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
          curators: [
            {
              people_id: [
                "id",
                "display_name",
                "bio",
                "website",
                "instagram",
                "related_links",
                {
                  portrait: ["id", "width", "height", "filename_disk", "alt", "caption"],
                },
              ],
            },
          ],
        },
      ],
      filter: {
        _and: [
          {
            slug: {
              _eq: slug,
            },
          },
          { status: { _eq: `published` } },
        ],
      },
    }),
  )

  return exhibition[0] as Exhibitions
}

const baseUrl = getBaseUrl()

export const getAllExhibitions = async (): Promise<Exhibitions[]> => {
  try {
    // Remove trailing slash to prevent routing issues
    const url = `${baseUrl}/api/exhibitions`

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add cache and revalidation options
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["exhibitions"],
      },
    })

    if (!res.ok) {
      // Log the full response for debugging
      const text = await res.text()
      console.error(`API error (${res.status}):`, text)
      console.error("Request URL:", url)
      throw new Error(`API returned ${res.status}`)
    }

    const data = await res.json()

    if (!Array.isArray(data)) {
      console.error("Invalid data structure received:", data)
      return []
    }

    return data
  } catch (error) {
    console.error("Failed to fetch exhibitions data:", error)
    // Return empty array instead of null to maintain consistent return type
    return []
  }
}
