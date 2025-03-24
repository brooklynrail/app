/* eslint max-lines: 0 */
import { createItem, readItem, readItems, updateItem } from "@directus/sdk"
import { cache } from "react"
import directus from "../directus"
import { Contributors, People } from "../types"
import { getPermalink, PageType } from "../utils"
import { unstable_cache } from "next/cache"

interface MergeContributorsProps {
  selectedContributor: Contributors
  otherContributors: Contributors[]
}

export const mergeContributors = async (props: MergeContributorsProps) => {
  const { selectedContributor, otherContributors } = props

  try {
    // Get all unique article IDs from other contributors only
    const allArticleIds = otherContributors
      .flatMap((contributor) => contributor.articles)
      .map((article) => article.articles_contributors_id?.id)
      .filter((id): id is string => id !== undefined)
      // Remove duplicates using Array.from(new Set())
      .filter((id, index, self) => self.indexOf(id) === index)

    if (allArticleIds.length > 0) {
      // Update the selected contributor with all the articles
      const result = await directus.request(
        updateItem("contributors", selectedContributor.id, {
          articles: {
            create: allArticleIds.map((id) => ({
              articles_contributors_id: id,
            })),
          },
        }),
      )
      console.log("update result =========", result)
      // remove the articles from the other contributors
      for (const otherContributor of otherContributors) {
        console.log(
          "removing articles from",
          otherContributor.first_name,
          otherContributor.last_name,
          otherContributor.id,
          otherContributor.articles,
        )
        const result = await directus.request(
          updateItem("contributors", otherContributor.id, {
            articles: [],
          }),
        )
        console.log("delete result =========", result)
      }
    }

    // Create redirects for all other contributors that have different slugs
    for (const otherContributor of otherContributors) {
      if (selectedContributor.slug !== otherContributor.slug) {
        await addRedirect(selectedContributor, otherContributor)
      }
      // Archive the other contributor
      await archiveContributor(otherContributor)
    }

    return {
      success: true,
      error: null,
      message: `Successfully merged  articles to contributor ${selectedContributor.first_name} ${selectedContributor.last_name}`,
    }
  } catch (error) {
    // More detailed error logging
    console.error("Full error details:", {
      error,
      response: error instanceof Error ? (error as any).response : undefined,
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

const addRedirect = async (primaryContributor: Contributors, contributor: Contributors) => {
  console.log("adding redirect for", contributor, primaryContributor)
  const permalink = getPermalink({
    slug: contributor.slug,
    type: PageType.Contributor,
  })
  const url = new URL(permalink)
  try {
    // check if the redirect already exists using url.pathname
    const redirect = await directus.request(
      readItems("redirects", {
        filter: { path: { _eq: url.pathname } },
      }),
    )

    console.log("existing redirect", redirect)

    if (!redirect || redirect.length > 0) {
      return true
    }

    console.log("creating redirect", url.pathname, primaryContributor)
    const result = await directus.request(
      createItem("redirects", {
        path: url.pathname,
        contributors: primaryContributor.id,
        type: "contributor",
      }),
    )
    console.log("redirect result =========", result)
  } catch (error) {
    console.error("Error creating redirect:", error)
    throw error // Propagate the error for better error handling
  }
}

const archiveContributor = async (contributor: Contributors) => {
  console.log("archiving contributor", contributor)
  try {
    const result = await directus.request(
      updateItem("contributors", contributor.id, {
        status: "archived",
      }),
    )
    console.log("archive result =========", result)
  } catch (error) {
    console.error("Error updating contributor articles:", error)
    return null
  }
}

export const getAllPeople = cache(async () => {
  try {
    const peopleData = await directus.request(
      readItems("people", {
        fields: [
          "first_name",
          "last_name",
          "id",
          "slug",
          "bio",
          {
            articles: [{ articles_id: ["id", "title"] }],
          },
          { events: ["id"] },
          {
            portrait: ["id", "width", "height", "filename_disk", "alt", "caption", "modified_on"],
          },
        ],
        limit: -1,
        filter: { status: { _eq: "published" } },
      }),
    )

    return peopleData as People[]
  } catch (error) {
    console.error("Error fetching page data:", error)
    return null
  }
})

export const getPersonMerge = cache(async (personId: string) => {
  try {
    const peopleData = await directus.request(
      readItem("people", personId, {
        fields: [
          "first_name",
          "last_name",
          "id",
          "slug",
          "bio",
          {
            articles: [{ articles_id: ["id", "title"] }],
          },
          { events: ["id"] },
          {
            portrait: ["id", "width", "height", "filename_disk", "alt", "caption", "modified_on"],
          },
        ],
        limit: -1,
        filter: {
          status: { _eq: "published" },
          id: { _eq: personId },
        },
      }),
    )

    return peopleData as People
  } catch (error) {
    console.error("Error fetching page data:", error)
    return null
  }
})

export const getAllContributors = unstable_cache(
  async () => {
    try {
      let allContributors: Contributors[] = []
      let page = 1
      let hasMorePages = true

      while (hasMorePages) {
        console.log(`📚 Fetching contributors page ${page}...`)

        const contributors = await directus.request(
          readItems("contributors", {
            fields: ["id", "slug", "first_name", "last_name", "articles"],
            sort: ["sort", "first_name"],
            filter: {
              status: {
                _eq: "published",
              },
              articles: {
                _nnull: true,
              },
            },
            page: page,
            limit: 100,
            offset: (page - 1) * 100,
          }),
        )

        if (!contributors || contributors.length === 0) {
          hasMorePages = false
          break
        }

        allContributors = allContributors.concat(contributors as Contributors[])
        hasMorePages = contributors.length === 100 // Check if we got a full page
        page++
      }

      console.log(`✅ Fetched ${allContributors.length} total contributors`)
      return allContributors
    } catch (error) {
      console.error("❌ Error fetching all contributors:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      })
      return null
    }
  },
  ["contributors"],
  {
    revalidate: 86400, // 24 hours
    tags: ["contributors"],
  },
)

interface ContributorFilterParams {
  firstName?: string
  lastName?: string
}

export const getAllContributorsMerge = cache(
  async (filterParams?: ContributorFilterParams): Promise<Contributors[] | null> => {
    try {
      let contributorPages: Contributors[] = []
      let page = 1
      let isMore = true

      // Build filter string based on provided parameters
      let filterString = "&filter[status][_eq]=published"
      if (filterParams?.firstName) {
        filterString += `&filter[first_name][_eq]=${encodeURIComponent(filterParams.firstName)}`
      }
      if (filterParams?.lastName) {
        filterString += `&filter[last_name][_eq]=${encodeURIComponent(filterParams.lastName)}`
      }

      while (isMore) {
        const contributorsAPI =
          `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors?` +
          // Basic contributor fields
          `fields[]=id&` +
          `fields[]=slug&` +
          `fields[]=status&` +
          `fields[]=first_name&` +
          `fields[]=old_id&` +
          `fields[]=last_name&` +
          `fields[]=bio&` +
          `fields[]=articles&` +
          // Article related fields
          `fields[]=articles.articles_contributors_id.id&` +
          `fields[]=articles.articles_contributors_id.title&` +
          `fields[]=articles.articles_contributors_id.slug&` +
          `fields[]=articles.articles_contributors_id.issue&` +
          `fields[]=articles.articles_contributors_id.issue.title&` +
          `fields[]=articles.articles_contributors_id.issue.slug&` +
          `fields[]=articles.articles_contributors_id.issue.year&` +
          `fields[]=articles.articles_contributors_id.issue.month&` +
          `fields[]=articles.articles_contributors_id.section&` +
          `fields[]=articles.articles_contributors_id.section.name&` +
          `fields[]=articles.articles_contributors_id.section.slug&` +
          // Sorting and pagination
          `sort=first_name&` +
          `page=${page}&` +
          `limit=100&` +
          `offset=${page * 100 - 100}${filterString}`
        const res = await fetch(contributorsAPI)
        if (!res.ok) {
          throw new Error("Failed to fetch getAllContributors data")
        }
        const data = await res.json()
        contributorPages = contributorPages.concat(data.data)
        isMore = data.data.length === 100
        page++
      }

      return contributorPages
    } catch (error) {
      console.error("Failed to fetch getAllContributors data", error)
      return null
    }
  },
)

// Get contributor
// NOTE: There are multiple contributors with the same slug
// This returns all contributors with the same slug, but their specific name and bio information may be different
export async function getContributor(slug: string) {
  const issueDataAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors` +
    `?fields[]=id` +
    `&fields[]=first_name` +
    `&fields[]=last_name` +
    `&fields[]=slug` +
    `&fields[]=bio` +
    `&fields[]=status` +
    `&fields[]=old_id` +
    `&fields[]=date_updated` +
    `&fields[]=date_created` +
    // `&fields[]=articles` +
    `&fields[]=articles.articles_contributors_id.slug` +
    `&fields[]=articles.articles_contributors_id.title` +
    `&fields[]=articles.articles_contributors_id.status` +
    `&fields[]=articles.articles_contributors_id.excerpt` +
    `&fields[]=articles.articles_contributors_id.kicker` +
    `&fields[]=articles.articles_contributors_id.featured` +
    `&fields[]=articles.articles_contributors_id.featured_image.id` +
    `&fields[]=articles.articles_contributors_id.featured_image.caption` +
    `&fields[]=articles.articles_contributors_id.featured_image.alt` +
    `&fields[]=articles.articles_contributors_id.featured_image.filename_disk` +
    `&fields[]=articles.articles_contributors_id.featured_image.width` +
    `&fields[]=articles.articles_contributors_id.featured_image.height` +
    `&fields[]=articles.articles_contributors_id.featured_image.type` +
    `&fields[]=articles.articles_contributors_id.issue.title` +
    `&fields[]=articles.articles_contributors_id.issue.year` +
    `&fields[]=articles.articles_contributors_id.issue.month` +
    `&fields[]=articles.articles_contributors_id.issue.slug` +
    `&fields[]=articles.articles_contributors_id.issue.published` +
    `&fields[]=articles.articles_contributors_id.section.slug` +
    `&fields[]=articles.articles_contributors_id.section.name` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.id` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.first_name` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.last_name` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.slug` +
    `&filter[slug][_eq]=${slug}` +
    `&filter[status][_eq]=published` +
    `&filter[articles][_nnull]=true` +
    `&deep[articles][_filter][articles_contributors_id][status][_eq]=published` +
    `&deep[articles][_sort]=-articles_contributors_id.issue.year,-articles_contributors_id.issue.month` +
    `&deep[articles][issue][_nnull]=true`

  try {
    const res = await fetch(issueDataAPI)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch getContributor data")
    }

    const { data } = await res.json()
    return data as Contributors[]
  } catch (error) {
    // Handle the error here
    console.error("Failed to fetch getContributor data", error)
    return null
  }
}
