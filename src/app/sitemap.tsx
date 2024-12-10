import { MetadataRoute } from "next"
import { getPermalink, PageType } from "../../lib/utils"
import { Articles } from "../../lib/types"
import { getArticlePages } from "../../lib/utils/articles"

interface SiteLinksProps {
  url: string
  lastModified: string
  changeFrequency: "monthly" | "weekly" | "daily"
  priority: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlePages = await getArticlePages()

  let articles: SiteLinksProps[] = []
  if (articlePages) {
    articles = articlePages
      .filter((article: Articles) => article.issue)
      .map((article: Articles, i: number) => {
        const year = article.issue.year
        const month = article.issue.month < 10 ? String(`0${article.issue.month}`) : String(article.issue.month)
        const section = article.section.slug
        const slug = article.slug

        const permalink = getPermalink({
          year: Number(year),
          month: Number(month),
          section: section,
          slug: slug,
          type: PageType.Article,
        })

        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth() + 1

        // if the year and month are within the last 3 months, set the change frequency to weekly
        const changeFrequency = year === currentYear && Number(month) >= currentMonth - 3 ? "daily" : "monthly"
        const priority = year === currentYear && Number(month) >= currentMonth - 3 ? 1.0 : 0.8

        return {
          url: permalink,
          lastModified: article.date_updated,
          changeFrequency: `${changeFrequency}` as const,
          priority: priority,
        }
      })
  }

  return [...articles]
}
