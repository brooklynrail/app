import { MetadataRoute } from "next"
import { getAllContributors } from "../../../lib/utils"
import { Contributors } from "../../../lib/types"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 mins.
export const revalidate = process.env.VERCEL_ENV === "production" ? 3600 : 0

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
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }
  })

  return [...contributors]
}
