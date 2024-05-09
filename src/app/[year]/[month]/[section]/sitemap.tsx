import { MetadataRoute } from "next"
import { getIssues, getSectionsByIssueId } from "../../../../../lib/utils"
import { Issues, Sections } from "../../../../../lib/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const issues = await getIssues({ special_issue: false })

  const paths = issues.map(async (issue: Issues) => {
    const currentSections = await getSectionsByIssueId(issue.id)

    return currentSections.map((section: Sections) => {
      const year = issue.year
      const month = issue.month < 10 ? `0${String(issue.month)}` : String(issue.month)
      return {
        url: process.env.NEXT_PUBLIC_BASE_URL
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/${section.slug}/`
          : `https://brooklynrail.org/${year}/${month}/${section.slug}/`,
        lastModified: issue.date_updated,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }
    })
  })

  return await Promise.all(paths).then((results) => results.flat())
}
