import directus from "@/lib/directus"
import { Articles, Homepage, HomepageCollections } from "@/lib/types"
import { getCollectionArticles, getCurrentIssueData } from "@/lib/utils/homepage"
import { readSingleton } from "@directus/sdk"

// Use auto instead of force-dynamic to allow caching
export const dynamic = "auto"

// Keep the revalidation
export const revalidate = 3600 // 1 hour cache

// Modify the function to use NextRequest which is better supported with caching
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
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
      return Response.json(
        {
          error: "Homepage data not found",
          details: error instanceof Error ? error.message : "Unknown error occurred",
        },
        { status: 500 },
      )
    }

    if (!homepageData || Object.keys(homepageData).length === 0) {
      return Response.json(
        {
          error: "Invalid homepage data",
          details: "Homepage data is empty or invalid",
        },
        { status: 500 },
      )
    }

    const homepage = homepageData as Homepage

    const currentIssue = await getCurrentIssueData()
    if (!currentIssue) {
      // Instead of using notFound(), return a proper error response
      return Response.json(
        {
          error: "Current issue data not found",
          details: "Unable to fetch current issue data",
        },
        { status: 404 },
      )
    }

    try {
      const allCollections = homepage.collections.map(async (collection: HomepageCollections) => {
        if (collection.collections_id && collection.collections_id.section) {
          const thisSectionArticles = await getCollectionArticles({
            currentIssueSlug: currentIssue.slug,
            slug: collection.collections_id.section.slug,
            limit: collection.collections_id.limit,
          })

          collection.collections_id.section.articles = thisSectionArticles as Articles[]
          return collection
        }
        return collection
      })

      homepage.collections = await Promise.all(allCollections)

      const responseData = {
        ...homepage,
        currentIssue: currentIssue.slug,
      }

      const cleanedData = JSON.parse(JSON.stringify(responseData))

      return Response.json(cleanedData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error("Error processing collections:", error)
      return Response.json(
        {
          error: "Failed to process collections",
          details: error instanceof Error ? error.message : "Unknown error occurred",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in homepage API:", error)
    return Response.json(
      {
        error: "Failed to fetch homepage data",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
