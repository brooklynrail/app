import { readItem, readItems, readSingleton } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, Contributors, Homepage, Issues, People, Sections } from "../types"
import { revalidatePath } from "next/cache"
import { getPermalink, PageType } from "../utils"

export const getHomepageData = cache(async () => {
  try {
    const homepageData = await directus.request(
      readSingleton("homepage", {
        fields: [
          {
            collections: [
              {
                collections_id: [
                  "id",
                  "type",
                  "title",
                  {
                    section: [
                      "id",
                      "name",
                      "slug",
                      {
                        articles: [
                          "slug",
                          "title",
                          "deck",
                          "excerpt",
                          "kicker",
                          "sort",
                          "status",
                          "hide_bylines_downstream",
                          {
                            section: ["name", "slug"],
                          },
                          {
                            issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"],
                          },
                          {
                            contributors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
                          },
                          {
                            featured_image: ["id", "width", "height", "filename_disk", "caption"],
                          },
                          {
                            featured_artwork: ["id", "width", "height", "filename_disk", "caption"],
                          },
                          "sort",
                          "status",
                        ],
                      },
                    ],
                  },
                  {
                    tribute: [
                      "id",
                      "title",
                      "deck",
                      "blurb",
                      "summary",
                      "excerpt",
                      "slug",
                      {
                        editors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
                      },
                      {
                        articles: [
                          "slug",
                          "title",
                          "deck",
                          "excerpt",
                          "sort",
                          "status",
                          {
                            contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }],
                          },
                        ],
                      },
                      {
                        featured_image: ["id", "width", "height", "filename_disk", "caption"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        deep: {
          collections: {
            collections_id: {
              section: {
                articles: {
                  _limit: 4,
                  _sort: "-date_updated",
                },
              },
            },
          },
        },
      }),
    )
    return homepageData as Homepage
  } catch (error) {
    console.error("Error fetching Homepage data:", error)
    return null
  }
})
