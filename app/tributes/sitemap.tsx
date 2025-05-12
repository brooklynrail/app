import { Tributes } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getAllTributes } from "@/lib/utils/tributes"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allTributes = await getAllTributes()

  let tributes: MetadataRoute.Sitemap = []
  if (allTributes) {
    tributes = allTributes.map((tribute: Tributes, i: number) => {
      const tributeSlug = tribute.slug
      const permalink = getPermalink({
        tributeSlug: tributeSlug,
        type: PageType.Tribute,
      })
      const changeFrequency = "monthly"
      const priority = i < 3 ? 1.0 : 0.9
      return {
        url: permalink,
        lastModified: tribute.date_updated,
        changeFrequency: `${changeFrequency}` as const,
        priority: priority,
      }
    })
  }

  return [...tributes]
}
