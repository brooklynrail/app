import { MetadataRoute } from "next"
import { getArticlePages, getIssues, getSpecialArticlePages } from "../../lib/utils"
import { Articles, Issues } from "../../lib/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlePages = await getArticlePages()
  const articles = articlePages.map((article: Articles) => {
    const year = article.issues[0].issues_id.year
    const month = article.issues[0].issues_id.month
    const section = article.sections[0].sections_id.slug
    const slug = article.slug

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/${section}/${slug}/`,
      lastModified: article.date_updated,
      changeFrequency: "weekly" as const,
      priority: 1,
    }
  })

  const specialArticlePages = await getSpecialArticlePages()
  const specialArticles = specialArticlePages.map((article: Articles) => {
    const slug = article.slug
    const issueSlug = article.issues && article.issues[0].issues_id.slug
    const section = article.sections && article.sections[0].sections_id.slug

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/special/${issueSlug}/${section}/${slug}/`,
      lastModified: article.date_updated,
      changeFrequency: "weekly" as const,
      priority: 1,
    }
  })

  const allIssues = await getIssues({ special_issue: false })
  const issues = allIssues.map((issue: Issues) => {
    const year = issue.year
    const month = issue.month < 10 ? String(`0${issue.month}`) : String(issue.month)
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/`,
      lastModified: issue.date_updated,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }
  })

  const allSpecialIssues = await getIssues({ special_issue: true })
  const specialIssues = allSpecialIssues.map((issue: Issues) => {
    const issueSlug = issue.slug
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/special/${issueSlug}/`,
      lastModified: issue.date_updated,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }
  })

  return [...articles, ...specialArticles, ...issues, ...specialIssues]
}
