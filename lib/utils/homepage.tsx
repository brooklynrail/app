"use server"
import { readSingleton } from "@directus/sdk"
import directus from "../directus"
import { Articles, Homepage, HomepageCollections, Issues } from "../types"
import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"

export const getNavData = unstable_cache(
  async (): Promise<Homepage | null> => {
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

      const cleanedData = JSON.parse(JSON.stringify(navData))

      // Add cache-control header
      return cleanedData
    } catch (error) {
      console.error("Failed to get nav data:", error)
      return null
    }
  },
  ["homepage-nav"],
  { revalidate: 604800, tags: ["homepage"] },
)

export const getHomepageCollectionData = unstable_cache(
  async () => {
    try {
      // 1. Get homepage data
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

      if (!homepageData) {
        console.error("No homepage data found")
        return null
      }

      // 2. Get current issue
      const currentIssueSlug = await getCurrentIssueSlug()
      if (!currentIssueSlug) {
        console.error("No current issue found")
        return null
      }

      // 3. Enhance collections with articles
      const homepage = homepageData as Homepage
      const enhancedCollections = await Promise.all(
        homepage.collections.map(async (collection: HomepageCollections) => {
          if (collection.collections_id?.section) {
            const articles = await getCollectionArticles({
              currentIssueSlug,
              slug: collection.collections_id.section.slug,
              limit: collection.collections_id.limit,
            })

            return {
              ...collection,
              collections_id: {
                ...collection.collections_id,
                section: {
                  ...collection.collections_id.section,
                  articles: articles || [],
                },
              },
            }
          }
          return collection
        }),
      )

      // 4. Return enhanced homepage data
      return {
        ...homepage,
        collections: enhancedCollections,
        currentIssue: currentIssueSlug,
      }
    } catch (error) {
      console.error("Error fetching homepage collection data:", error)
      return null
    }
  },
  ["homepage_cache"],
  { revalidate: 604800, tags: ["homepage"] },
)

export const getHomepageHeaderData = unstable_cache(
  async () => {
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
                    "description",
                    "links",
                    "limit",
                    "status",
                    "banner_type",
                  ],
                },
              ],
            },
            {
              video_covers: [
                {
                  directus_files_id: ["id", "width", "height", "filename_disk", "caption"],
                },
              ],
            },
            {
              video_covers_stills: [
                {
                  directus_files_id: ["id", "width", "height", "filename_disk", "caption"],
                },
              ],
            },
            "video_covers_vertical_position",
          ],
          filter: {
            _and: [
              {
                banners: {
                  collections_id: {
                    status: { _eq: "published" },
                  },
                },
              },
            ],
          },
        }),
      )

      if (!homepageData) {
        console.error("No homepage header data found")
        return null
      }

      return homepageData as Homepage
    } catch (error) {
      console.error("Error fetching homepage header data:", error)
      return null
    }
  },
  ["homepage"],
  { revalidate: 604800, tags: ["homepage"] },
)

export const getCurrentIssueSlug = unstable_cache(
  async () => {
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
  },
  ["homepage"],
  { revalidate: 604800, tags: ["homepage"] },
)

export const getCurrentIssueData = unstable_cache(
  async () => {
    try {
      const data = await directus.request(
        readSingleton("global_settings", {
          fields: [
            "events_break_start",
            "events_break_end",
            "events_on_break",
            "events_break_text",
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

      if (!data) {
        return notFound()
      }

      const currentIssue = data.current_issue as Issues

      return currentIssue
    } catch (error) {
      console.error("Failed to get current issue data:", error)
      return null
    }
  },
  ["homepage"],
  { revalidate: 604800, tags: ["homepage"] }, // cache for 1 week
)

interface CollectionArticlesProps {
  slug: string
  currentIssueSlug: string
  limit?: number | null
}

export const getCollectionArticles = unstable_cache(
  async (props: CollectionArticlesProps) => {
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

      const response = await fetch(articlesAPI, { next: { tags: ["articles"] } })
      const articlesData = await response.json()

      return articlesData.data as Articles[]
    } catch (error) {
      console.error("Error fetching the articles data:", error)
      return null
    }
  },
  ["homepage"],
  { revalidate: 604800, tags: ["homepage"] }, // cache for 1 week
)
