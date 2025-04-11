import { readField, readItems } from "@directus/sdk"
import { DateTime } from "luxon"
import { unstable_cache } from "next/cache"
import { cache } from "react"
import { stripHtml } from "string-strip-html"
import directus from "../directus"
import { Events, EventsTypes } from "../types"
import { getPermalink, PageType } from "../utils"

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
  console.log("🔄 Fetching event types")
  try {
    console.log("📡 Requesting event types from Directus")
    console.log("🔍 Directus URL:", process.env.NEXT_PUBLIC_DIRECTUS_URL)

    // Log the request details
    const requestDetails = readField("events", "type")
    console.log("🔍 Request details:", JSON.stringify(requestDetails))

    const data = await directus.request(readField("events", "type"))
    console.log("📦 Raw response:", JSON.stringify(data))

    if (!data || !data.meta || !data.meta.options || !data.meta.options.choices) {
      console.error("❌ Invalid response format from event types API:", JSON.stringify(data))
      return null
    }

    const types: Array<{ text: string; value: string }> = data.meta.options.choices
    console.log(`✅ Successfully fetched ${types.length} event types:`, JSON.stringify(types))
    return types
  } catch (error) {
    console.error("❌ Error fetching event types:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
    return null
  }
})

export const getEventTypeText = (typeValue: string, eventTypes: EventsTypes[]) => {
  const type = eventTypes.find((eventType) => eventType.value === typeValue)
  return type ? type.text : typeValue // Return readable text or fallback to value
}

export const getUpcomingEvents = unstable_cache(
  async () => {
    console.log("🔄 Fetching upcoming events")
    try {
      const eventsDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
        `?fields[]=id` +
        `&fields[]=slug` +
        `&fields[]=type` +
        `&fields[]=kicker` +
        `&fields[]=title` +
        `&fields[]=deck` +
        `&fields[]=summary` +
        `&fields[]=series` +
        `&fields[]=start_date` +
        `&fields[]=end_date` +
        `&fields[]=all_day` +
        `&fields[]=youtube_id` +
        `&fields[]=location` +
        `&fields[]=related_exhibitions` +
        `&fields[]=featured_image.id` +
        `&fields[]=featured_image.caption` +
        `&fields[]=featured_image.alt` +
        `&fields[]=featured_image.filename_disk` +
        `&fields[]=featured_image.width` +
        `&fields[]=featured_image.height` +
        `&fields[]=featured_image.type` +
        `&fields[]=featured_image.modified_on` +
        `&fields[]=people.people_id.portrait.id` +
        `&fields[]=people.people_id.portrait.caption` +
        `&fields[]=people.people_id.portrait.filename_disk` +
        `&fields[]=people.people_id.portrait.width` +
        `&fields[]=people.people_id.portrait.height` +
        `&fields[]=people.people_id.portrait.alt` +
        `&fields[]=people.people_id.portrait.modified_on` +
        `&sort=start_date` +
        `&filter[end_date][_gte]=$NOW(-1+days)` + // Now minus 1 day (timezone math applies, so it may not be exactly 24 hours)
        `&filter[youtube_id][_empty]=true` +
        `&filter[status][_eq]=published`

      console.log(`📡 Fetching from: ${eventsDataAPI}`)
      const res = await fetch(eventsDataAPI)
      if (!res.ok) {
        console.error(`❌ Failed to fetch upcoming events: ${res.status} ${res.statusText}`)
        console.error(`❌ Response headers:`, JSON.stringify(Object.fromEntries(res.headers.entries())))
        throw new Error(`Failed to fetch events data: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      if (!data || !data.data) {
        console.error("❌ Invalid response format from events API:", JSON.stringify(data))
        throw new Error("Invalid response format from events API")
      }

      console.log(`✅ Successfully fetched ${data.data.length} upcoming events`)
      return data.data
    } catch (error) {
      console.error("❌ Error getting upcoming events:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        url: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events`,
      })
      return null
    }
  },
  ["events"],
  { revalidate: 3600, tags: ["events"] },
)

export const getUpcomingNSE = unstable_cache(
  async () => {
    try {
      const eventsDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
        `?fields[]=id` +
        `&fields[]=slug` +
        `&fields[]=type` +
        `&fields[]=kicker` +
        `&fields[]=title` +
        `&fields[]=deck` +
        `&fields[]=summary` +
        `&fields[]=series` +
        `&fields[]=start_date` +
        `&fields[]=end_date` +
        `&fields[]=all_day` +
        `&fields[]=youtube_id` +
        `&fields[]=featured_image.id` +
        `&fields[]=featured_image.caption` +
        `&fields[]=featured_image.alt` +
        `&fields[]=featured_image.filename_disk` +
        `&fields[]=featured_image.width` +
        `&fields[]=featured_image.height` +
        `&fields[]=featured_image.type` +
        `&fields[]=featured_image.modified_on` +
        `&fields[]=people.people_id.portrait.id` +
        `&fields[]=people.people_id.portrait.caption` +
        `&fields[]=people.people_id.portrait.filename_disk` +
        `&fields[]=people.people_id.portrait.width` +
        `&fields[]=people.people_id.portrait.height` +
        `&fields[]=people.people_id.portrait.alt` +
        `&fields[]=people.people_id.portrait.modified_on` +
        `&sort=start_date` +
        `&filter[type][_neq]=irl` +
        `&filter[end_date][_gte]=$NOW(-1+days)` + // Now minus 1 day (timezone math applies, so it may not be exactly 24 hours)
        `&filter[youtube_id][_empty]=true` +
        `&filter[status][_eq]=published`

      const res = await fetch(eventsDataAPI)
      if (!res.ok) {
        console.error(`Failed to fetch upcoming NSE events: ${res.status} ${res.statusText}`)
        throw new Error(`Failed to fetch NSE events data: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      if (!data || !data.data) {
        console.error("Invalid response format from NSE events API:", data)
        throw new Error("Invalid response format from NSE events API")
      }

      return data.data
    } catch (error) {
      console.error("❌ Error getting upcoming NSE events:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        url: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events`,
      })

      return null
    }
  },
  ["events"],
  { revalidate: 3600, tags: ["events"] },
)

interface PastEventsParams {
  limit: number
  offset: number
}

export const getPastEvents = unstable_cache(
  async (props: PastEventsParams) => {
    const { limit, offset } = props
    console.log(`🔄 Fetching past events (limit: ${limit}, offset: ${offset})`)
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
        `&fields[]=all_day` +
        `&fields[]=end_date` +
        `&fields[]=youtube_id` +
        `&filter[start_date][_lte]=$NOW` +
        `&filter[type][_in]=the-new-social-environment,common-ground` +
        `&filter[youtube_id][_nempty]=true` +
        `&filter[status][_eq]=published` +
        `&page=${Math.floor(offset / limit) + 1}` +
        `&sort[]=-start_date` +
        `&limit=${limit}`

      console.log(`📡 Fetching from: ${allEventsDataAPI}`)
      const res = await fetch(allEventsDataAPI)
      if (!res.ok) {
        console.error(`❌ Failed to fetch past events: ${res.status} ${res.statusText}`)
        console.error(`❌ Response headers:`, JSON.stringify(Object.fromEntries(res.headers.entries())))
        return null
      }
      const data = await res.json()

      if (!data || !data.data) {
        console.error("❌ Invalid response format from past events API:", JSON.stringify(data))
        return null
      }

      console.log(`✅ Successfully fetched ${data.data.length} past events`)
      return data.data as Events[]
    } catch (error) {
      console.error("❌ Error fetching past events:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        url: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events`,
      })
      return null
    }
  },
  ["events"],
  { revalidate: 3600, tags: ["events"] },
)

/**
 * Fetches current and featured events for display
 *
 * This function:
 * 1. Fetches current events from the API
 * 2. If fewer than 4 current events exist, also fetches featured events
 *    to fill out the display
 * 3. Featured events request includes timestamp to prevent caching
 *
 */
export async function fetchEvents() {
  const currentEvents = await fetch(`/api/events/upcoming/`, {
    next: { revalidate: 3600, tags: ["events"] },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch current events")
    }
    return res.json()
  })

  const currentEventsArray = Array.isArray(currentEvents) ? currentEvents : []

  let featuredEvents = []
  if (currentEventsArray.length < 4) {
    const timestamp = new Date().getTime()
    featuredEvents = await fetch(`/api/events/featured?t=${timestamp}`, {
      next: { revalidate: 3600, tags: ["events"] },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch featured events")
      }
      return res.json()
    })
  }

  return { currentEvents: currentEventsArray, featuredEvents }
}

export const getFeaturedEvents = unstable_cache(
  async () => {
    try {
      const eventsDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
        `?fields[]=id` +
        `&fields[]=slug` +
        `&fields[]=title` +
        `&fields[]=series` +
        `&fields[]=featured_image.id` +
        `&fields[]=featured_image.caption` +
        `&fields[]=featured_image.alt` +
        `&fields[]=featured_image.filename_disk` +
        `&fields[]=featured_image.width` +
        `&fields[]=featured_image.height` +
        `&fields[]=featured_image.type` +
        `&fields[]=featured_image.modified_on` +
        `&fields[]=people` +
        `&fields[]=people.people_id.portrait.id` +
        `&fields[]=people.people_id.portrait.caption` +
        `&fields[]=people.people_id.portrait.filename_disk` +
        `&fields[]=people.people_id.portrait.width` +
        `&fields[]=people.people_id.portrait.height` +
        `&fields[]=people.people_id.portrait.alt` +
        `&fields[]=people.people_id.portrait.modified_on` +
        `&fields[]=start_date` +
        `&fields[]=all_day` +
        `&fields[]=youtube_id` +
        `&sort=-start_date` +
        `&filter[end_date][_lte]=$NOW` +
        `&filter[featured][_eq]=true` +
        `&filter[youtube_id][_nempty]=true` +
        `&filter[status][_eq]=published`

      const res = await fetch(eventsDataAPI)
      if (!res.ok) {
        console.error(`Failed to fetch featured events: ${res.status} ${res.statusText}`)
        throw new Error(`Failed to fetch featured events data: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      if (!data || !data.data) {
        console.error("Invalid response format from featured events API:", data)
        throw new Error("Invalid response format from featured events API")
      }

      return data.data as Events[]
    } catch (error) {
      console.error("❌ Error getting featured events:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        url: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events`,
      })

      return null
    }
  },
  ["events"],
  { revalidate: 3600, tags: ["events"] },
)

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
        "soldout",
        "registration_url",
        "start_date",
        "location",
        "related_exhibitions",
        "all_day",
        "end_date",
        "youtube_id",
        "airtable_id",
        "status",
        {
          featured_image: ["id", "width", "height", "filename_disk", "alt", "caption"],
        },
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
                  portrait: ["id", "width", "height", "filename_disk", "alt", "caption", "modified_on"],
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
                  portrait: ["id", "width", "height", "filename_disk", "alt", "caption"],
                },
              ],
            },
          ],
        },
      ],
      filter: {
        _and: [
          {
            slug: {
              _eq: slug,
            },
          },
          { status: { _eq: `published` } },
        ],
      },
    }),
  )

  return event[0] as Events
})

export const getAllEvents = unstable_cache(
  async () => {
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
          `&fields[]=all_day` +
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
  },
  ["events"],
  { revalidate: 3600, tags: ["events"] },
)

export const generateYouTubeTags = (eventData: Events) => {
  const tags = []

  // Add people names to tags
  if (eventData.people && eventData.people.length > 0) {
    eventData.people.forEach((personData) => {
      if (personData.people_id) {
        const personName = personData.people_id.display_name
        if (personName) {
          tags.push(personName.trim())
        }
      }
    })
  }

  // Add poet names to tags (if applicable)
  if (eventData.poets && eventData.poets.length > 0) {
    eventData.poets.forEach((poetData) => {
      if (poetData.people_id) {
        const poetName = poetData.people_id.display_name
        if (poetName) {
          tags.push(poetName.trim())
        }
      }
    })
  }

  // Append static tags
  tags.push(
    "The Brooklyn Rail",
    "Interview",
    "live conversation",
    "artist",
    "artists",
    "poetry",
    "poetry reading",
    "Brooklyn Rail",
    "Phong Bui",
    "The New Social Environment",
    "Art",
    "contemporary art",
    "Terra Foundation for American Art",
  )

  // Return the tags as a comma-separated string (or return the array itself depending on your use case)
  return tags.join(", ")
}

export const generateYouTubeCopy = (eventData: Events) => {
  const { title, summary, start_date, people, poets, series, slug } = eventData
  const eventDate = new Date(start_date)

  const startDate = new Date(eventData.start_date)
  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  const eventPermalink = getPermalink({
    eventYear: eventYear,
    eventMonth: eventMonth,
    eventDay: eventDay,
    slug: slug,
    type: PageType.Event,
  })

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const endDate = new Date(eventData.end_date)
  const isSameDay = startDate.toDateString() === endDate.toDateString()
  const dateString = formatEventDate(startDate, endDate, isSameDay)

  // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(eventData.start_date, "America/New_York")
  const startTimePT = formatTime(eventData.start_date, "America/Los_Angeles")

  const timeString = isSameDay && !eventData.all_day && (
    <span>
      {startTimeET} Eastern / {startTimePT} Pacific
    </span>
  )

  let youtubeCopy = `${encodeHtmlEntities(stripHtml(title).result)}\n${encodeHtmlEntities(stripHtml(summary).result)}\n\n`

  // Series Info
  if (series) {
    youtubeCopy += `The New Social Environment #${series}\n`
  }

  youtubeCopy += `Recorded on ${dateString} at ${startTimeET} Eastern / ${startTimePT} Pacific \n`
  youtubeCopy += `${eventPermalink}\n\n`

  youtubeCopy += "〰️〰️〰️〰️\n\nIn this talk:\n\n"

  // People Info
  people.forEach((personObj: any) => {
    const person = personObj.people_id
    if (!person.bio) {
      return
    }
    const bio = encodeHtmlEntities(stripHtml(person.bio).result)

    youtubeCopy += `🚩 ${encodeHtmlEntities(person.display_name)} —— ${bio}\n`

    // Include website, Instagram, etc.
    if (person.website) {
      youtubeCopy += `• ${encodeHtmlEntities(person.website)}\n`
    }
    if (person.instagram) {
      youtubeCopy += `• https://instagram.com/${encodeHtmlEntities(person.instagram)}\n`
    }
    if (person.related_links && person.related_links.length > 0) {
      person.related_links.forEach((link: any) => {
        youtubeCopy += `• ${encodeHtmlEntities(link.url)}\n`
      })
    }
    youtubeCopy += "\n"
  })

  if (poets && poets.length > 0) {
    youtubeCopy += `The Rail has a tradition of ending our conversations with a poem, and on this day we were fortunate to have\n\n`
    // Poets Info
    poets.forEach((personObj: any) => {
      const person = personObj.people_id
      if (!person.bio) {
        return
      }
      const bio = encodeHtmlEntities(stripHtml(person.bio).result)

      youtubeCopy += `🚩 ${encodeHtmlEntities(person.display_name)} —— ${bio}\n`

      // Include website, Instagram, etc.
      if (person.website) {
        youtubeCopy += `• ${encodeHtmlEntities(person.website)}\n`
      }
      if (person.instagram) {
        youtubeCopy += `• https://instagram.com/${encodeHtmlEntities(person.instagram)}\n`
      }
      if (person.related_links && person.related_links.length > 0) {
        person.related_links.forEach((link: any) => {
          youtubeCopy += `• ${encodeHtmlEntities(link.url)}\n`
        })
      }
      youtubeCopy += "\n"
    })
  }

  youtubeCopy += `〰️〰️〰️〰️\n\n`

  youtubeCopy += `We'd like to thank the Terra Foundation for American Art for making our daily conversations possible.\n`
  youtubeCopy += `• Follow @terraamericanart https://www.instagram.com/terraamericanart/\n`
  youtubeCopy += `• Learn more at https://www.terraamericanart.org/\n\n`

  youtubeCopy += `This conversation was produced by THE BROOKLYN RAIL:\n`
  youtubeCopy += `• Learn more about our upcoming conversations at: https://brooklynrail.org/events\n`
  youtubeCopy += `• Subscribe to the Rail: https://brooklynrail.org/subscribe\n`
  youtubeCopy += `• Sign up for our newsletter: https://brooklynrail.org/newsletter\n`
  youtubeCopy += `• Follow us on Instagram: https://www.instagram.com/brooklynrail/\n`

  return youtubeCopy
}

const encodeHtmlEntities = (str: string) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

interface SingleNewsletterEventProps {
  eventTypes: EventsTypes[]
  event: Events
}

export const generateSingleEventNewsletter = ({ eventTypes, event }: SingleNewsletterEventProps) => {
  // Helper function to build HTML for a single event
  const buildEventHTML = (event: Events) => {
    const startDate = new Date(event.start_date)

    const permalink = getPermalink({
      eventYear: startDate.getFullYear(),
      eventMonth: startDate.getMonth() + 1,
      eventDay: startDate.getDate(),
      slug: event.slug,
      type: PageType.Event,
    })

    const eventPermalink = `${permalink}?br=events`

    // get the start date in this format:
    // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
    const endDate = new Date(event.end_date)
    const isSameDay = startDate.toDateString() === endDate.toDateString()
    const dateString = formatEventDate(startDate, endDate, isSameDay)
    // Convert both dates to UTC for consistent timezone comparison
    const endDateUTC = new Date(event.end_date).toISOString()
    const nowUTC = new Date().toISOString()
    const isFutureEvent = endDateUTC > nowUTC

    // Get the time in both Eastern and Pacific time
    const startTimeET = formatTime(event.start_date, "America/New_York")
    const startTimePT = formatTime(event.start_date, "America/Los_Angeles")

    const timeString = isSameDay && !event.all_day ? `${startTimeET} Eastern / ${startTimePT} Pacific` : null

    // Get the readable event type text
    const eventTypeText = getEventTypeText(event.type, eventTypes)

    const details = isFutureEvent
      ? `<div class="event-details">
          <p className="text-xl text-center font-light space-x-3">
            <strong>${dateString}</strong> ${timeString ? `<br/><span>${timeString}</span>` : ""}
          </p>
        </div>`
      : ""

    const buttonText = isFutureEvent ? "Register" : "Watch"
    return `
<div class="event">
  ${event.series ? `<p class="kicker"><span>${eventTypeText}</span> <span class="series">#${event.series}</span></p>` : ""}
  <h3><a href="${eventPermalink}" title="${event.title}" target="_blank">${event.title}</a></h3>
  <p class="summary">${event.summary}</p>
  ${details}
  <div class="actions">
    <a class="btn btn-register" title="${isFutureEvent ? "Register for" : "Watch: "} ${event.title}" href="${eventPermalink}" target="_blank">
      <span>${buttonText}</span>
    </a>
  </div>
</div>
    `
  }

  // Build and return the newsletter HTML for a single event
  return buildEventHTML(event)
}

interface FullNewsletterEventProps {
  eventTypes: EventsTypes[]
  allEvents: Events[]
}

export const generateFullNewsletter = (props: FullNewsletterEventProps) => {
  const { eventTypes, allEvents } = props

  // Helper function to build HTML for all events
  const buildEventsHTML = (events: Events[]) => {
    return events
      .map((event: Events) => {
        const startDate = new Date(event.start_date)

        const permalink = getPermalink({
          eventYear: startDate.getFullYear(),
          eventMonth: startDate.getMonth() + 1,
          eventDay: startDate.getDate(),
          slug: event.slug,
          type: PageType.Event,
        })

        const eventPermalink = `${permalink}?br=events`

        // get the start date in this format:
        // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
        const endDate = new Date(event.end_date)
        const isSameDay = startDate.toDateString() === endDate.toDateString()
        const dateString = formatEventDate(startDate, endDate, isSameDay)

        // Get the time in both Eastern and Pacific time
        const startTimeET = formatTime(event.start_date, "America/New_York")
        const startTimePT = formatTime(event.start_date, "America/Los_Angeles")

        const timeString = isSameDay && !event.all_day ? `${startTimeET} Eastern / ${startTimePT} Pacific` : null

        // Get the readable event type text
        const eventTypeText = getEventTypeText(event.type, eventTypes)

        return `
<div class="event">
  ${event.series ? `<p class="kicker"><span>${eventTypeText}</span> <span class="series">#${event.series}</span></p>` : ""}
  <h3><a href="${eventPermalink}" title="${event.title}" target="_blank">${event.title}</a></h3>
  <p class="summary">${event.summary}</p>
  <div class="event-details">
    <p className="text-xl text-center font-light space-x-3">
      <strong>${dateString}</strong> ${timeString ? `<br/><span>${timeString}</span>` : ""}
    </p>
  </div>
  <div class="actions">
    <a class="btn btn-register" title="Register for ${event.title}" href="${eventPermalink}" target="_blank">
      <span>Register</span>
    </a>
  </div>
</div>
      `
      })
      .join("")
  }

  // Build and return the full newsletter HTML
  const newsletterHTML = `
<div class="rail-newsletter">
  <div class="event-listing">
    ${buildEventsHTML(allEvents)}
  </div>
</div>
  `
  return newsletterHTML
}

// ====================================================
// TIME Functions

export const formatEventDate = (startDate: Date, endDate: Date, isSameDay: boolean) => {
  const startDateYearString = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(startDate)
  const startDateString = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(startDate)

  if (isSameDay) {
    return `${startDateYearString}`
  }

  const endDateString = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(endDate)
  return `${startDateString}–${endDateString}`
}

// Function to format the time for a specific time zone using Luxon
export const formatTime = (start_date: string, timeZone: string) => {
  // Parse the start_date assuming it's in America/New_York (Eastern time)
  const date = DateTime.fromISO(start_date, { zone: "America/New_York" })

  // Set the desired time zone and format the time
  const formattedTime = date.setZone(timeZone).toFormat("h:mm a")

  // Format the period (AM/PM) to "a.m." or "p.m."
  const formattedPeriod = formattedTime.toLowerCase().replace("am", "a.m.").replace("pm", "p.m.")

  // If the minute is "00", exclude it from the output
  const railtime = formattedPeriod.replace(":00", "")

  return railtime
  // return formattedPeriod
}
