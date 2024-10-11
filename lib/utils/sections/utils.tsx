import { readItems } from "@directus/sdk"
import { cache } from "react"
import directus from "../../directus"
import { Articles, Sections } from "../../types"

interface ArticlesBySectionProps {
  slug: string
  limit: number
  offset: number
}

export const getArticlesBySection = cache(async (props: ArticlesBySectionProps) => {
  const { slug, limit, offset } = props

  try {
    const articles = await directus.request(
      readItems("articles", {
        fields: [
          "id",
          "title",
          "slug",

          "excerpt",
          "sort",
          "kicker",
          "date_updated",
          "status",
          {
            section: ["id", "name", "slug"],
          },
          {
            issue: ["id", "title", "slug", "year", "month", "issue_number"],
          },
          {
            contributors: [{ contributors_id: ["id", "first_name", "last_name"] }],
          },
          {
            featured_image: ["id", "width", "height", "filename_disk", "caption"],
          },
        ],
        filter: {
          section: { slug: { _eq: slug } },
        },
        limit: limit,
        page: Math.floor(offset / limit) + 1,
        sort: ["sort"],
      }),
    )

    return articles as Articles[]
  } catch (error) {
    console.error("Error fetching Articles data:", error)
    return null
  }
})

interface SectionDataProps {
  slug: string
}

export const getSectionData = cache(async (props: SectionDataProps) => {
  const { slug } = props

  try {
    const sections = await directus.request(
      readItems("sections", {
        fields: ["id", "name", "description", "slug"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              slug: { _eq: slug },
              featured: { _eq: true },
            },
          ],
        },
      }),
    )

    return sections[0] as Sections
  } catch (error) {
    console.error("Error fetching section data:", error)
    return null
  }
})
