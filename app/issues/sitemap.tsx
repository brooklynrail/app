import { Issues } from "@/lib/types"
import { getIssues, getPermalink, PageType } from "@/lib/utils"
import { MetadataRoute } from "next"

// revalidate every 30 days
export const revalidate = 2592000 // 30 days

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allIssues = await getIssues()

  let issues: MetadataRoute.Sitemap = []
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
