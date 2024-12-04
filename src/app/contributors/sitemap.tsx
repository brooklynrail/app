import { MetadataRoute } from "next"
import { getAllContributors } from "../../../lib/utils/people"
import { Contributors } from "../../../lib/types"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let allContributors = await getAllContributors()
  if (!allContributors || allContributors.length == 0) {
    return notFound()
  }
  // filter out contributors with no articles
  allContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)
  const contributors = allContributors.map((contributor: Contributors) => {
    const slug = contributor.slug

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contributor/${slug}/`,
      lastModified: contributor.date_updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }
  })

  return [...contributors]
}
