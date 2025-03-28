import directus from "@/lib/directus"
import { Articles, Homepage, HomepageCollections } from "@/lib/types"
import { getCollectionArticles } from "@/lib/utils/homepage"
import { readSingleton } from "@directus/sdk"

export const revalidate = 3600 // 1 hour cache

export async function GET() {
  try {
    let homepageData
    try {
      homepageData = await directus.request(
        readSingleton("homepage", {
          fields: [
            "id",
            {
              collections: [
                {
                  collections_id: [
                    "id",
                    "type",
                    "kicker",
                    "title",
                    "limit",
                    "links",
                    "status",
                    "banner_type",
                    {
                      section: ["slug", "featured", "description"],
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
                            "id",
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
          filter: {
            _and: [
              {
                collections: {
                  collections_id: {
                    status: { _eq: `published` },
                  },
                },
              },
            ],
          },
        }),
      )
    } catch (error) {
      console.error("Error fetching homepage singleton:", error)
      homepageData = {} // Provide empty default if singleton not found
    }

    const homepage = homepageData as Homepage

    const currentIssueResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currentIssue/`, {
      next: {
        tags: ["homepage"],
      },
    })

    if (!currentIssueResponse.ok) {
      return Response.json(
        {
          error: "Current issue data not found",
          details: "Unable to fetch current issue data",
        },
        { status: 404 },
      )
    }

    const currentIssue = await currentIssueResponse.json()
    if (!currentIssue) {
      return Response.json(
        {
          error: "Current issue data is empty",
          details: "Current issue data was null or undefined",
        },
        { status: 404 },
      )
    }

    const allCollections = homepage.collections.map(async (collection: HomepageCollections, i: number) => {
      if (collection.collections_id && collection.collections_id.section) {
        const thisSectionArticles = getCollectionArticles({
          currentIssueSlug: currentIssue.slug,
          slug: collection.collections_id.section.slug,
          limit: collection.collections_id.limit,
        })

        collection.collections_id.section.articles = (await thisSectionArticles) as Articles[]
        return collection
      }
      return collection
    })

    homepage.collections = await Promise.all(allCollections)

    // Simply include the currentIssue string in the response
    const responseData = {
      ...homepage,
      currentIssue: currentIssue.slug,
    }

    const cleanedData = JSON.parse(JSON.stringify(responseData))

    return Response.json(cleanedData, {
      headers: {
        ContentType: "application/json",
      },
    })
  } catch (error) {
    console.error("Error in homepage API:", error)
    return Response.json({ error: "Failed to fetch homepage data", details: (error as Error).message }, { status: 500 })
  }
}
