import { readItems, readSingleton } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, Homepage, HomepageCollections, Issues, People, Sections } from "../types"

export const getHomepageData = cache(async () => {
  try {
    const homepageData = await directus.request(
      readSingleton("homepage", {
        fields: [
          "id",
          {
            collections: [
              {
                collections_id: [
                  "id",
                  "type",
                  "title",
                  "deck",
                  "limit",
                  {
                    section: ["id", "name", "slug", "featured"],
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
      }),
    )

    const homepage = homepageData as Homepage

    if (!homepage.collections || homepage.collections.length === 0) {
      return null
    }
    const allCollections = homepage.collections.map(async (collection: HomepageCollections, i: number) => {
      if (!collection.collections_id || !collection.collections_id.section) {
        return null
      }

      const thisSectionArticles = getCollectionArticles({
        slug: collection.collections_id.section.slug,
        limit: collection.collections_id.limit,
      })
      // add thisSectionArticles to thisCollection.section.articles
      collection.collections_id.section.articles = (await thisSectionArticles) as Articles[]

      return collection
    })

    const resolvedCollections = await Promise.all(allCollections)
    homepage.collections = resolvedCollections.filter(
      (collection): collection is HomepageCollections => collection !== null,
    )
    return homepageData as Homepage
    // return resolvedCollections as Collections[]
    // return homepageData as Homepage
  } catch (error) {
    console.error("Error fetching Homepage data:", error)
    return null
  }
})

interface CollectionArticlesProps {
  slug: string
  limit?: number | null
}

export const getCollectionArticles = cache(async (props: CollectionArticlesProps) => {
  const { slug, limit } = props

  try {
    const data = await directus.request(
      readItems("articles", {
        fields: [
          "*",
          "id",
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
        filter: {
          status: { _eq: "published" },
          section: { slug: { _eq: slug } },
        },
        limit: limit ? limit : 4,
        sort: "-date_updated",
      }),
    )

    return data as Articles[]
  } catch (error) {
    console.error("Error fetching the articles data:", error)
    return null
  }
})
