import { readItems } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Redirects } from "../types"

export enum RedirectTypes {
  Article = "article",
  Event = "event",
  Contributor = "contributor",
}

export const getRedirect = cache(async (type: string, slug: string) => {
  // Lets check to see if there is a redirect that includes this slug
  try {
    const redirect = await directus.request(
      readItems("redirects", {
        fields: [
          "path",
          "type",
          {
            articles: [
              "slug",
              "title",
              {
                issue: ["year", "month", "slug", "special_issue"],
              },
              {
                section: ["slug"],
              },
            ],
          },
          {
            events: ["slug", "title", "start_date"],
          },
        ],
        filter: {
          _and: [
            {
              path: {
                _contains: slug, // check to see if there is a redirect that includes this slug
              },
              type: {
                _eq: type,
              },
            },
          ],
        },
      }),
    )
    return redirect[0] as Redirects
  } catch (error) {
    console.error("Error in getRedirect", error)
    return null
  }
})
