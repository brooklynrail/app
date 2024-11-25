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
    const articlesAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
      `?fields[]=id` +
      `&fields[]=slug` +
      `&fields[]=title` +
      `&fields[]=excerpt` +
      `&fields[]=kicker` +
      `&fields[]=body_text` +
      `&fields[]=featured` +
      `&fields[]=status` +
      `&fields[]=hide_bylines_downstream` +
      `&fields[]=section.id` +
      `&fields[]=section.name` +
      `&fields[]=section.slug` +
      `&fields[]=issue.id` +
      `&fields[]=issue.title` +
      `&fields[]=issue.year` +
      `&fields[]=issue.month` +
      `&fields[]=issue.slug` +
      `&fields[]=contributors.contributors_id.id` +
      `&fields[]=contributors.contributors_id.first_name` +
      `&fields[]=contributors.contributors_id.last_name` +
      `&fields[]=featured_image.id` +
      `&fields[]=featured_image.width` +
      `&fields[]=featured_image.height` +
      `&fields[]=featured_image.filename_disk` +
      `&fields[]=featured_image.caption` +
      `&fields[]=featured_image.alt` +
      `&fields[]=featured_artwork.id` +
      `&fields[]=featured_artwork.width` +
      `&fields[]=featured_artwork.height` +
      `&fields[]=featured_artwork.filename_disk` +
      `&fields[]=featured_artwork.caption` +
      `&fields[]=featured_artwork.alt` +
      `&filter[status][_eq]=published` +
      `&filter[section][slug][_eq]=${slug}` +
      `&limit=${limit}` +
      `&page=${Math.floor(offset / limit) + 1}` +
      `&sort[]=-issue.published` +
      `&sort[]=sort`

    const response = await fetch(articlesAPI)
    const articlesData = await response.json()

    return articlesData.data as Articles[]
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
        fields: ["id", "name", "description", "slug", "sponsor"],
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

// Group articles by issue
export const groupByIssue = (articles: Articles[]) => {
  return articles.reduce((acc: Record<string, Articles[]>, article) => {
    const issueId = article.issue.id // or any unique identifier for the issue
    if (!acc[issueId]) {
      acc[issueId] = []
    }
    acc[issueId].push(article)
    return acc
  }, {})
}
