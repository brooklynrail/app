import { MetadataRoute } from "next"
import { getAllContributors } from "../../../lib/utils"
import { Contributors } from "../../../lib/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let allContributors = await getAllContributors()
  // filter out contributors with no articles
  allContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)
  const contributors = allContributors.map((contributor: Contributors) => {
    const slug = contributor.slug

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contributor/${slug}/`,
      lastModified: contributor.date_updated,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }
  })

  return [...contributors]
}
