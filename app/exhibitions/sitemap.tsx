import { MetadataRoute } from "next"
import { Exhibitions } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getAllExhibitions } from "@/lib/utils/exhibitions"

interface SiteLinksProps {
  url: string
  lastModified: string
  changeFrequency: "daily" | "weekly"
  priority: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allExhibitions = await getAllExhibitions()

  let exhibitions: SiteLinksProps[] = []
  if (allExhibitions) {
    exhibitions = allExhibitions.map((exhibition: Exhibitions, i: number) => {
      const permalink = getPermalink({
        type: PageType.Exhibition,
        slug: exhibition.slug,
      })

      const changeFrequency = i <= 30 ? "daily" : "weekly"
      const priority = i < 3 ? 1.0 : 0.9

      return {
        url: permalink,
        lastModified: exhibition.date_updated,
        changeFrequency: `${changeFrequency}` as const,
        priority: priority,
      }
    })
  }

  return [...exhibitions]
}
