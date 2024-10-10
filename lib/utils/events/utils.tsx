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
              _gte: today,
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
              _lte: today,
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
