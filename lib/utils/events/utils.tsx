import { readItem, readItems } from "@directus/sdk"
import { cache } from "react"
import directus from "../../directus"
import { Events } from "../../types"

export const getEvents = cache(async () => {
  const today = new Date()

  // start_date: '2024-10-07T18:00:00'
  // if today is gte start_date, then show the event

  const events = await directus.request(
    readItems("events", {
      fields: [
        "id",
        "slug",
        "title",
        "deck",
        "series",
        "start_date",
        "end_date",
        {
          section: ["id", "name", "slug"],
        },
      ],
      filter: {
        _and: [
          {
            start_date: {
              _gte: "$NOW",
            },
          },
          {
            status: {
              _eq: "published",
            },
          },
        ],
      },
    }),
  )
  console.log("events ======", events)
  return events as Events[]
})

export const getPastEvents = cache(async () => {
  const today = new Date()

  // start_date: '2024-10-07T18:00:00'
  // if today is gte start_date, then show the event

  const events = await directus.request(
    readItems("events", {
      fields: [
        "id",
        "slug",
        "title",
        "deck",
        "series",
        "start_date",
        "end_date",
        "youtube_id",
        {
          section: ["id", "name", "slug"],
        },
      ],
      filter: {
        _and: [
          {
            start_date: {
              _lte: "$NOW",
            },
          },
          {
            section: {
              slug: {
                _in: ["the-new-social-environment", "common-ground"],
              },
            },
          },
          {
            youtube_id: {
              _nempty: true,
            },
          },
          {
            status: {
              _eq: "published",
            },
          },
        ],
      },
    }),
  )
  console.log("events ======", events)
  return events as Events[]
})

export const getEvent = cache(async (slug: string) => {
  console.log("slug ======", slug)
  const event = await directus.request(
    readItems("events", {
      fields: [
        "id",
        "slug",
        "title",
        "deck",
        "excerpt",
        "body_text",
        "series",
        "start_date",
        "end_date",
        "youtube_id",
        "event_id",
        {
          people: [
            {
              people_id: [
                "id",
                "display_name",
                "bio",
                "website",
                "instagram",
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
                {
                  portrait: ["id", "width", "height", "filename_disk", "caption"],
                },
              ],
            },
          ],
        },
        {
          section: ["id", "name", "slug"],
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
                {
                  portrait: ["id", "width", "height", "filename_disk", "caption"],
                },
              ],
            },
          ],
        },
        {
          section: ["id", "name", "slug"],
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
          "date_created",
          { section: ["id", "name", "slug"] },
          { people: [{ people_id: ["id", "slug", "bio", "display_name"] }] },
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
