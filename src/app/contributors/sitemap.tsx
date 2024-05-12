import { MetadataRoute } from "next"
import { getAllContributors } from "../../../lib/utils"
import { Contributors } from "../../../lib/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allContributors = await getAllContributors()
  const contributors = allContributors.map((contributor: Contributors) => {
    const slug = contributor.slug

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/`,
      lastModified: contributor.date_updated,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }
  })

  return [...contributors]
}
