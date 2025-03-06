import { MetadataRoute } from "next"
import { Issues } from "@/lib/types"
import { getIssues, getPermalink, PageType } from "@/lib/utils"

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
