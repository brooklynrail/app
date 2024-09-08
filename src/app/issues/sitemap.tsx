import { MetadataRoute } from "next"
import { getIssues, getPermalink, PageType } from "../../../lib/utils"
import { Issues } from "../../../lib/types"
import { get } from "http"

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
  const allIssues = await getIssues()

  let issues: SiteLinksProps[] = []
  if (allIssues) {
    issues = allIssues.map((issue: Issues, i: number) => {
      const issueSlug = issue.slug
      const permalink = getPermalink({
        issueSlug: issueSlug,
        type: PageType.Issue,
      })
      const changeFrequency = i === 0 ? "weekly" : "monthly"
      const priority = i < 3 ? 1.0 : 0.9
      return {
        url: permalink,
        lastModified: issue.date_updated,
        changeFrequency: `${changeFrequency}` as const,
        priority: priority,
      }
    })
  }

  return [...issues]
}
