import { notFound } from "next/navigation"
import directus from "@/lib/directus"
import { readSingleton } from "@directus/sdk"
import { Articles } from "@/lib/types"
import { Homepage } from "@/lib/types"
import { HomepageCollections } from "@/lib/types"
import { getCollectionArticles } from "@/lib/utils/homepage"

export const revalidate = 3600 // 1 hour cache

export async function GET(request: Request) {
  try {
    // Get currentIssue from URL parameters
    // /api/homepage?currentIssue=2025-03
    const { searchParams } = new URL(request.url)
    const currentIssue = searchParams.get("currentIssue")

    if (!currentIssue) {
      return notFound()
    }

    let homepageData
    try {
      homepageData = await directus.request(
        readSingleton("homepage", {
          fields: [
            "id",
            {
              banners: [
                {
                  collections_id: ["id", "type", "kicker", "title", "description", "links", "limit", "banner_type"],
                },
              ],
            },
            {
              video_covers: [{ directus_files_id: ["id", "width", "height", "filename_disk", "caption"] }],
            },
            {
              video_covers_stills: [{ directus_files_id: ["id", "width", "height", "filename_disk", "caption"] }],
            },
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
        }),
      )
    } catch (error) {
      console.error("Error fetching homepage singleton:", error)
      homepageData = {} // Provide empty default if singleton not found
    }

    const homepage = homepageData as Homepage

    const allCollections = homepage.collections.map(async (collection: HomepageCollections, i: number) => {
      if (collection.collections_id && collection.collections_id.section) {
        const thisSectionArticles = getCollectionArticles({
          currentIssueSlug: currentIssue,
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
      currentIssue,
    }

    const cleanedData = JSON.parse(JSON.stringify(responseData))

    return Response.json(cleanedData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in homepage API:", error)
    return Response.json({ error: "Failed to fetch homepage data", details: (error as Error).message }, { status: 500 })
  }
}
