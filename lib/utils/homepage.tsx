import { readItems, readSingleton } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, Homepage, HomepageCollections, Issues } from "../types"

export const getNavData = cache(async () => {
  try {
    const navData = await directus.request(
      readSingleton("homepage", {
        fields: [
          "id",
          {
            banners: [
              {
                collections_id: [
                  "id",
                  "type",
                  "kicker",
                  "title",
                  "deck",
                  "description",
                  "links",
                  "limit",
                  "banner_type",
                ],
              },
            ],
          },
          {
            collections: [
              {
                collections_id: [
                  "id",
                  "type",
                  "kicker",
                  "title",
                  "deck",
                  "limit",
                  "links",
                  "banner_type",
                  {
                    section: ["slug", "featured"],
                  },
                  {
                    tribute: ["slug"],
                  },
                ],
              },
            ],
          },
        ],
      }),
    )

    return navData as Homepage
  } catch (error) {
    console.error("Error fetching Nav data:", error)
    return null
  }
})

export const getHomepageData = cache(async (currentIssue: Issues) => {
  try {
    const homepageData = await directus.request(
      readSingleton("homepage", {
        fields: [
          "id",
          {
            banners: [
              {
                collections_id: [
                  "id",
                  "type",
                  "kicker",
                  "title",
                  "deck",
                  "description",
                  "links",
                  "limit",
                  "banner_type",
                ],
              },
            ],
          },
          {
            collections: [
              {
                collections_id: [
                  "id",
                  "type",
                  "kicker",
                  "title",
                  "deck",
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

    const homepage = homepageData as Homepage

    const allCollections = homepage.collections.map(async (collection: HomepageCollections, i: number) => {
      // Get the articles for this collection
      // Note: the queries are faster if we fetch the articles this way, as opposed to the homepage query
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

    return homepage as Homepage
  } catch (error) {
    console.error("Error fetching Homepage data:", error)
    return null
  }
})

export const getCurrentIssueSlug = cache(async () => {
  try {
    const settings = await directus.request(
      readSingleton("global_settings", {
        fields: [
          {
            current_issue: ["slug"],
          },
        ],
      }),
    )

    const curruentIssueData = settings.current_issue
    if (!curruentIssueData) {
      // throw an error if there is no current issue
      console.error("There is no current issue set", curruentIssueData)
      return
    }

    return settings.current_issue.slug
  } catch (error) {
    console.error("Error fetching CurrentIssueData data:", error)
    return null
  }
})

export const getCurrentIssueData = cache(async () => {
  try {
    const settings = await directus.request(
      readSingleton("global_settings", {
        fields: [
          {
            current_issue: [
              "id",
              "title",
              "slug",
              "special_issue",
              { cover_1: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_2: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_3: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_4: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_5: ["id", "width", "height", "filename_disk", "caption"] },
              { cover_6: ["id", "width", "height", "filename_disk", "caption"] },
            ],
          },
        ],
      }),
    )

    const curruentIssueData = settings.current_issue
    if (!curruentIssueData) {
      // throw an error if there is no current issue
      console.error("There is no current issue set", curruentIssueData)
      return
    }

    return settings.current_issue as Issues
  } catch (error) {
    console.error("Error fetching CurrentIssueData data:", error)
    return null
  }
})

interface CollectionArticlesProps {
  slug: string
  currentIssueSlug: string
  limit?: number | null
}

export const getCollectionArticles = cache(async (props: CollectionArticlesProps) => {
  const { slug, limit, currentIssueSlug } = props

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
          "featured",
          "status",
          "hide_bylines_downstream",
          {
            section: ["name", "slug"],
          },
          {
            issue: ["id", "title", "slug", "year", "month", "issue_number", "published", "cover_1"],
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
          // If no limit, then get the # of articles in this section the current issue
          issue: { slug: { _eq: !limit ? currentIssueSlug : undefined } },
        },
        // If we have a limit, we want to get only the limit number of articles
        limit: limit ? limit : -1,
        sort: ["-date_updated"],
      }),
    )

    return data as Articles[]
  } catch (error) {
    console.error("Error fetching the articles data:", error)
    return null
  }
})
