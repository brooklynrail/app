import { aggregate, readItems, readField } from "@directus/sdk"
import { cache } from "react"
import directus from "../../directus"
import { Events, EventsTypes } from "../../types"

export enum EventTypes {
  TheNewSocialEnvironment = "the-new-social-environment",
  CommonGround = "common-ground",
  CommunityListing = "community-listing",
  RailEvents = "rail-events",
  SponsoredListing = "sponsored-listing",
  TheaterOfWar = "theater-of-war",
  AbolitionistReadingNativePlantEmbroidery = "abolitionist-reading-native-plant-embroidery",
}

export const checkYearMonthDay = (start_date: string, year: string, month: string, day: string) => {
  const startDate = new Date(start_date)
  const eventYear = startDate.getFullYear().toString()
  const eventMonth = (startDate.getMonth() + 1).toString().padStart(2, "0")
  const eventDay = startDate.getDate().toString().padStart(2, "0")

  if (year !== eventYear || month !== eventMonth || day !== eventDay) {
    return false
  }
  return true
}

export const getEventTypes = cache(async () => {
  const data = await directus.request(readField("events", "type"))
  const types: Array<{ text: string; value: string }> = data.meta.options && data.meta.options.choices
  return types
})

export const getEventTypeText = (typeValue: string, eventTypes: EventsTypes[]) => {
  const type = eventTypes.find((eventType) => eventType.value === typeValue)
  return type ? type.text : typeValue // Return readable text or fallback to value
}

export const getUpcomingEvents = cache(async () => {
  const eventsDataAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
    `?fields[]=id` +
    `&fields[]=slug` +
    `&fields[]=type` +
    `&fields[]=kicker` +
    `&fields[]=title` +
    `&fields[]=deck` +
    `&fields[]=series` +
    `&fields[]=start_date` +
    `&fields[]=end_date` +
    `&sort=start_date` +
    `&filter[start_date][_gte]=$NOW(-1+days)` + // Now minus 1 day (timezone math applies, so it may not be exactly 24 hours)
    `&filter[status][_eq]=published`

  const res = await fetch(eventsDataAPI)
  if (!res.ok) {
    throw new Error("Failed to fetch events data")
  }
  const data = await res.json()
  const events = data.data
  return events as Events[]
})

export const getUpcomingEventsBanner = cache(async () => {
  const eventsDataAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
    `?fields[]=id` +
    `&fields[]=slug` +
    `&fields[]=title` +
    `&fields[]=series` +
    `&fields[]=people.people_id.portrait.id` +
    `&fields[]=people.people_id.portrait.caption` +
    `&fields[]=people.people_id.portrait.filename_disk` +
    `&fields[]=people.people_id.portrait.width` +
    `&fields[]=people.people_id.portrait.height` +
    `&fields[]=people.people_id.portrait.type` +
    `&fields[]=start_date` +
    `&sort=start_date` +
    `&limit=6` +
    `&filter[start_date][_gte]=$NOW(-1+days)` + // Now minus 1 day (timezone math applies, so it may not be exactly 24 hours)
    `&filter[status][_eq]=published`

  const res = await fetch(eventsDataAPI)
  if (!res.ok) {
    throw new Error("Failed to fetch events data")
  }
  const data = await res.json()
  const events = data.data
  return events as Events[]
})

interface PastEventsParams {
  limit: number
  offset: number
}

export async function getPastEvents(props: PastEventsParams) {
  const { limit, offset } = props
  try {
    const allEventsDataAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
      `?fields[]=id` +
      `&fields[]=slug` +
      `&fields[]=type` +
      `&fields[]=kicker` +
      `&fields[]=title` +
      `&fields[]=deck` +
      `&fields[]=series` +
      `&fields[]=start_date` +
      `&fields[]=end_date` +
      `&fields[]=youtube_id` +
      `&filter[start_date][_lte]=$NOW` +
      `&filter[type][_in]=the-new-social-environment,common-ground` +
      `&filter[youtube_id][_nempty]=true` +
      `&filter[status][_eq]=published` +
      `&page=${Math.floor(offset / limit) + 1}` +
      `&sort[]=-start_date` +
      `&limit=${limit}`

    const res = await fetch(allEventsDataAPI)
    if (!res.ok) {
      console.error(`Failed to fetch All Events data: ${res.statusText}`)
      return null
    }
    const data = await res.json()
    return data.data as Events[]
  } catch (error) {
    console.error("Error fetching All Events data:", error)
    return null
  }
}

export const getEvent = cache(async (slug: string) => {
  const event = await directus.request(
    readItems("events", {
      fields: [
        "id",
        "slug",
        "type",
        "kicker",
        "title",
        "deck",
        "summary",
        "type",
        "body_text",
        "body",
        "series",
        "start_date",
        "end_date",
        "youtube_id",
        "airtable_id",
        "status",
        {
          people: [
            {
              people_id: [
                "id",
                "display_name",
                "bio",
                "website",
                "instagram",
                "related_links",
                {
                  portrait: ["id", "width", "height", "filename_disk", "caption"],
                },
              ],
            },
          ],
        },
        {
          poets: [
            {
              people_id: [
                "id",
                "display_name",
                "bio",
                "website",
                "instagram",
                "related_links",
                {
                  portrait: ["id", "width", "height", "filename_disk", "caption"],
                },
              ],
            },
          ],
        },
      ],
      filter: {
        slug: {
          _eq: slug,
        },
      },
    }),
  )

  return event[0] as Events
})

export async function getPreviewEvent(id: string) {
  try {
    // Search for the event with the matching ID
    const preview = await directus.request(
      readItems("events", {
        version: "draft",
        fields: [
          "*",
          {
            people: [
              {
                people_id: [
                  "id",
                  "slug",
                  "bio",
                  "display_name",
                  {
                    portrait: ["id", "width", "height", "filename_disk", "caption"],
                  },
                ],
              },
            ],
          },
          {
            poets: [
              {
                people_id: [
                  "id",
                  "slug",
                  "bio",
                  "display_name",
                  {
                    portrait: ["id", "width", "height", "filename_disk", "caption"],
                  },
                ],
              },
            ],
          },
          { user_updated: ["id", "first_name", "last_name", "avatar"] },
        ],
        filter: {
          id: { _eq: id },
        },
      }),
    )
    return preview[0] as Events
  } catch (error) {
    console.error("error in getPreviewArticle", error)
    return null
  }
}

export async function getAllEvents() {
  try {
    let allEvents: Events[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const eventsDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
        `?fields[]=id` +
        `&fields[]=slug` +
        `&fields[]=start_date` +
        `&filter[status][_eq]=published` +
        `&page=${page}` +
        `&limit=100` +
        `&offset=${page * 100 - 100}`
      const res = await fetch(eventsDataAPI)
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch allEvents data")
      }
      const data = await res.json()
      allEvents = allEvents.concat(data.data)
      isMore = data.data.length === 100 // assumes there is another page of records
      page++
    }
    return allEvents as Events[]
  } catch (error) {
    console.error("Error fetching allEvents:", error)
    return null
  }
}

export const getTotalEventsCount = async () => {
  const totalCount = await directus.request(
    aggregate("events", {
      aggregate: { count: "*" },
    }),
  )
  const count = Number(totalCount[0].count)
  return count ? count : 0
}
