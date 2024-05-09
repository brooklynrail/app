import { MetadataRoute } from "next"
import { getArticlePages } from "../../../../../lib/utils"
import { Articles } from "../../../../../lib/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlePages = await getArticlePages()

  const paths = articlePages.map((article: Articles) => {
    const year = article.issues[0].issues_id.year
    const month = article.issues[0].issues_id.month
    const section = article.sections[0].sections_id.slug

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/${section}/`,
      lastModified: article.date_updated,
      changeFrequency: "weekly" as const,
      priority: 1,
    }
  })

  return [...paths]
}
