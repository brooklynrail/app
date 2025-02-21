import { readItems } from "@directus/sdk"
import { cache } from "react"
import directus from "../directus"
import { Pages } from "../types"

export const getPageData = cache(async (slug: string) => {
  try {
    const pageData = await directus.request(
      readItems("pages", {
        fields: [
          "*",
          "title",
          "slug",
          "status",
          "body_text",
          "summary",
          "board",
          "staff",
          "quotes",
          "supporters",
          "footnotes",
          {
            images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }],
          },
        ],
        filter: { status: { _eq: "published" }, slug: { _eq: slug } },
      }),
    )

    return pageData[0] as Pages
  } catch (error) {
    console.error("Error fetching page data:", error)
    return null
  }
})

export const getAllPages = cache(async () => {
  try {
    const pagesData = await directus.request(
      readItems("pages", {
        fields: [
          "*",
          "title",
          "slug",
          "status",
          "body_text",
          "summary",
          "board",
          "staff",
          "quotes",
          "supporters",
          "footnotes",
          {
            images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }],
          },
        ],
        filter: { status: { _eq: "published" } },
      }),
    )

    return pagesData as Pages[]
  } catch (error) {
    console.error("Error fetching all pages data:", error)
    return null
  }
})
