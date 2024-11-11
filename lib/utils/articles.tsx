import directus from "../directus"
import { readItems, readSingleton } from "@directus/sdk"
import { Articles, Issues, OGArticle, Sections } from "../types"
import nlp from "compromise"
import { cache } from "react"

export const extractPeopleFromArticle = cache(async (text: string) => {
  const doc = nlp(text)
  const people = doc.people().out("array")
  return people
})

export const checkYearMonthSection = (
  section: Sections,
  issue: Issues,
  year: string,
  month: string,
  sectionSlug: string,
) => {
  const articleYear = issue.year.toString()
  const articleMonth = issue.month.toString().padStart(2, "0")
  const articleSection = section.slug

  if (year !== articleYear || month !== articleMonth || sectionSlug !== articleSection) {
    return false
  }
  return true
}

export async function getArticleOGData(slug: string, status?: string) {
  const articleAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
    `?fields[]=slug` +
    `&fields[]=title` +
    `&fields[]=deck` +
    `&fields[]=excerpt` +
    `&fields[]=kicker` +
    `&fields[]=title_tag` +
    `&fields[]=featured_image.filename_disk` +
    `&fields[]=issue.title` +
    `&fields[]=section.name` +
    `&filter[slug][_eq]=${slug}` +
    `&filter[status][_eq]=${status}`

  try {
    const res = await fetch(articleAPI)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error(`Failed to fetch Article data: ${res.statusText}`)
      return null
    }

    const { data } = await res.json()

    const og_article = transformArticle(data[0] as Articles)
    return og_article
  } catch (error) {
    console.error(error)
    return null
  }
}

const transformArticle = (data: Articles) => {
  // Build a new article object with the type of OGArticle
  const article = {} as OGArticle
  article.title = data.title
  article.excerpt = data.excerpt
  article.deck = data.deck ? data.deck : null
  article.issue = data.issue.title
  article.section = data.section.name
  article.image = data.featured_image
    ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${data.featured_image.filename_disk}`
    : null

  return article
}

// =================================================================================================
interface CurrentIssueSectionProps {
  issueSlug: string
  sectionSlug: string
}
export const getCurrentIssueSection = cache(async (props: CurrentIssueSectionProps) => {
  const { issueSlug, sectionSlug } = props
  try {
    const articles = await directus.request(
      readItems("articles", {
        fields: [
          "title",
          "featured",
          "excerpt",
          "slug",
          "hide_title",
          { section: ["id", "name", "slug"] },
          { issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"] },
          { contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }] },
          { images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }] },
          { user_updated: ["id", "first_name", "last_name", "avatar"] },
        ],
        filter: {
          _and: [
            {
              issue: {
                slug: { _eq: issueSlug },
              },
              section: {
                slug: { _eq: sectionSlug },
              },
              status: { _eq: `published` },
            },
          ],
        },
      }),
    )
    return articles as Articles[]
  } catch (error) {
    console.error("Error fetching CurrentIssueData data:", error)
    return null
  }
})

// =================================================================================================
// Used in sitemap.tsx
export const getArticlePages = cache(async () => {
  try {
    let articlePages: Articles[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const articleDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
        `?fields[]=slug` +
        `&fields[]=section.slug` +
        `&fields[]=issue.year` +
        `&fields[]=issue.month` +
        `&fields[]=issue.slug` +
        `&fields[]=issue.special_issue` +
        `&fields[]=issue.status` +
        `&filter[status][_eq]=published` +
        `&filter[slug][_nempty]=true` +
        `&filter[issue][_nnull]=true` +
        `&sort[]=-date_updated` +
        `&page=${page}` +
        `&limit=100` +
        `&offset=${page * 100 - 100}`
      const res = await fetch(articleDataAPI)
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch getArticlePages data")
      }
      const data = await res.json()
      articlePages = articlePages.concat(data.data)
      isMore = data.data.length === 100 // assumes there is another page of records
      page++
    }
    return articlePages as Articles[]
  } catch (error) {
    console.error("Error in getArticlePages", error)
    return null
  }
})
