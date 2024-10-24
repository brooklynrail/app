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
