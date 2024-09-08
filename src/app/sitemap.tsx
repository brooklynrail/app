import { MetadataRoute } from "next"
import { getArticlePages, getIssues } from "../../lib/utils"
import { Articles, Issues } from "../../lib/types"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 mins.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 3600 : 0

interface SiteLinksProps {
  url: string
  lastModified: string
  changeFrequency: "monthly" | "weekly"
  priority: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlePages = await getArticlePages()

  // // NOTE: This is returning articles with no issues.
  // // These are the articles that are part of the "Special Issues"
  // // This might be a BUG, or might be how the REST API is set up.
  // // remove all articles from specialArticlePages that have an empty issues array

  // const articlePagesFiltered = articlePages.filter((article: Articles) => article.issues && article.issues.length > 0)
  let articles: SiteLinksProps[] = []
  if (articlePages) {
    articles = articlePages
      .filter((article: Articles) => article.issue)
      .map((article: Articles) => {
        const year = article.issue.year
        const month = article.issue.month < 10 ? String(`0${article.issue.month}`) : String(article.issue.month)
        const section = article.section.slug
        const slug = article.slug

        return {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/${section}/${slug}/`,
          lastModified: article.date_updated,
          changeFrequency: "weekly" as const,
          priority: 1,
        }
      })
  }

  const allIssues = await getIssues()

  let issues: SiteLinksProps[] = []
  if (allIssues) {
    issues = allIssues.map((issue: Issues) => {
      const year = issue.year
      const month = issue.month < 10 ? String(`0${issue.month}`) : String(issue.month)
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/`,
        lastModified: issue.date_updated,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }
    })
  }

  return [...articles, ...issues]
}
