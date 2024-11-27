import { MetadataRoute } from "next"
import { getPermalink, PageType } from "../../../lib/utils"
import { Events, Issues } from "../../../lib/types"
import { getAllEvents } from "../../../lib/utils/events"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

interface SiteLinksProps {
  url: string
  lastModified: string
  changeFrequency: "daily" | "weekly"
  priority: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allEvents = await getAllEvents()

  let events: SiteLinksProps[] = []
  if (allEvents) {
    events = allEvents.map((event: Events, i: number) => {
      const eventDate = new Date(event.start_date)
      const eventyear = eventDate.getFullYear()
      const eventmonth = eventDate.getMonth() + 1
      const eventday = eventDate.getDate()

      const permalink = getPermalink({
        type: PageType.Event,
        eventYear: eventyear,
        eventMonth: eventmonth,
        eventDay: eventday,
        slug: event.slug,
      })
      const changeFrequency = i <= 30 ? "daily" : "weekly"
      const priority = i < 3 ? 1.0 : 0.9
      return {
        url: permalink,
        lastModified: event.date_updated,
        changeFrequency: `${changeFrequency}` as const,
        priority: priority,
      }
    })
  }

  return [...events]
}
