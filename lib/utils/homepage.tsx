"use server"

import { readSingleton } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, Homepage, HomepageCollections, Issues } from "../types"
import { unstable_cache } from "next/cache"

export const getNavData = unstable_cache(async () => {
  try {
    const navData = await directus.request(
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
}, ["navData"])

export const getHomepageData = cache(async (currentIssue: Issues) => {
  try {
    const homepageData = await directus.request(
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

    const homepage = homepageData as Homepage

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
              "summary",
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

  // if no limit, filter by the currentIssueSlug
  const limitByIssue = !limit ? `&filter[issue][slug][_eq]=${currentIssueSlug}` : ``

  try {
    const articlesAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
      `?fields[]=id` +
      `&fields[]=slug` +
      `&fields[]=title` +
      `&fields[]=deck` +
      `&fields[]=excerpt` +
      `&fields[]=kicker` +
      `&fields[]=featured` +
      `&fields[]=status` +
      `&fields[]=body_text` +
      `&fields[]=hide_bylines_downstream` +
      `&fields[]=section.name` +
      `&fields[]=section.slug` +
      `&fields[]=issue.id` +
      `&fields[]=issue.title` +
      `&fields[]=issue.slug` +
      `&fields[]=issue.year` +
      `&fields[]=issue.month` +
      `&fields[]=issue.issue_number` +
      `&fields[]=issue.published` +
      `&fields[]=issue.cover_1` +
      `&fields[]=contributors.contributors_id.id` +
      `&fields[]=contributors.contributors_id.bio` +
      `&fields[]=contributors.contributors_id.first_name` +
      `&fields[]=contributors.contributors_id.last_name` +
      `&fields[]=featured_image.id` +
      `&fields[]=featured_image.width` +
      `&fields[]=featured_image.height` +
      `&fields[]=featured_image.filename_disk` +
      `&fields[]=featured_image.caption` +
      `&fields[]=featured_artwork.id` +
      `&fields[]=featured_artwork.width` +
      `&fields[]=featured_artwork.height` +
      `&fields[]=featured_artwork.filename_disk` +
      `&fields[]=featured_artwork.caption` +
      `&filter[status][_eq]=published` +
      `&filter[section][slug][_eq]=${slug}` +
      `&filter[issue][published][_nnull]=true` +
      `${limitByIssue}` +
      `&limit=${limit ? limit : -1}` +
      `&sort[]=-issue.published` +
      `&sort[]=sort`

    const response = await fetch(articlesAPI, { next: { revalidate: 3600, tags: ["articles"] } })
    const articlesData = await response.json()

    return articlesData.data as Articles[]
  } catch (error) {
    console.error("Error fetching the articles data:", error)
    return null
  }
})
