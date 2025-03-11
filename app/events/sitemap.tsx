import { Events } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getAllEvents } from "@/lib/utils/events"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allEvents = await getAllEvents()

  let events: MetadataRoute.Sitemap = []
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
