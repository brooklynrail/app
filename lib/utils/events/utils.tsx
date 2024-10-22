import { DateTime } from "luxon"
import { aggregate, readItems, readField } from "@directus/sdk"
import { cache } from "react"
import directus from "../../directus"
import { Events, EventsTypes } from "../../types"
import { stripHtml } from "string-strip-html"
import { getPermalink, PageType } from "../../utils"

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
    `&fields[]=summary` +
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
                  portrait: ["id", "width", "height", "filename_disk", "alt", "caption"],
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
          {
            poets: [
              {
                people_id: [
                  "id",
                  "slug",
                  "bio",
                  "display_name",
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

  const formatTime = (date: Date, timeZone: string) => {
    return date
      .toLocaleTimeString("en-US", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
      })
      .replace("AM", "a.m.")
      .replace("PM", "p.m.")
  }

  const easternTime = formatTime(eventDate, "America/New_York")
  const pacificTime = formatTime(new Date(eventDate.getTime() - 3 * 60 * 60 * 1000), "America/Los_Angeles")

  let youtubeCopy = `${encodeHtmlEntities(stripHtml(title).result)}\n${encodeHtmlEntities(stripHtml(summary).result)}\n\n`

  // Series Info
  if (series) {
    youtubeCopy += `The New Social Environment #${series}\n`
  }

  youtubeCopy += `Recorded on ${eventDate.toDateString()} at ${easternTime} Eastern / ${pacificTime} Pacific \n`
  youtubeCopy += `${eventPermalink}\n\n`

  youtubeCopy += "〰️〰️〰️〰️\n\nIn this talk:\n\n"

  // People Info
  people.forEach((personObj: any) => {
    const person = personObj.people_id
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

interface NewsletterEventProps {
  eventTypes: EventsTypes[]
  allEvents: Events[]
}

export const generateNewsletter = (props: NewsletterEventProps) => {
  const { eventTypes, allEvents } = props
  // Helper function to format the event time
  const formatTime = (date: Date, timeZone: string) => {
    return date
      .toLocaleTimeString("en-US", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
      })
      .replace("AM", "a.m.")
      .replace("PM", "p.m.")
  }

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

        const easternTime = formatTime(startDate, "America/New_York")
        const pacificTime = formatTime(new Date(startDate.getTime() - 3 * 60 * 60 * 1000), "America/Los_Angeles")

        // Get the readable event type text
        const eventTypeText = getEventTypeText(event.type, eventTypes)

        return `  <div class="event">
        ${event.series ? `<p class="kicker"><span>${eventTypeText}</span> <span class="series">#${event.series}</span></p>` : ""}
        <h3><a href="${permalink}" title="${event.title}" target="_blank">${event.title}</a></h3>
        <p class="summary">${event.summary}</p>
        <div class="event-details">
          <p class="date">${startDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p class="time">${easternTime} Eastern / ${pacificTime} Pacific</p>
        </div>
        <div class="actions">
          <a class="btn btn-register" title="Register for ${event.title}" href="${permalink}" target="_blank">
            <span>Register</span>
          </a>
        </div>
      </div>`
      })
      .join()
  }

  // Build and return the full newsletter HTML
  const newsletterHTML = `
<div class="rail-newsletter">
  <div class="event-listing">
    <h2>This Week's Events</h2>
    ${buildEventsHTML(allEvents)}
  </div>
</div>
  `
  return newsletterHTML
}

// ====================================================
// TIME Functions

export const formatEventDate = (startDate: Date, endDate: Date) => {
  const isSameDay = startDate.toDateString() === endDate.toDateString()

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
  const endDateString = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(endDate)

  if (isSameDay) {
    return startDateYearString
  }
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

  return formattedPeriod
}
