import { createItem, readItem, readItems, updateItem, updateItems } from "@directus/sdk"
import { cache } from "react"
import directus from "../directus"
import { Contributors, People } from "../types"
import { getPermalink } from "../utils"
import { PageType } from "../utils"

interface MergePeopleProps {
  selectedPerson: People
  allContributors: Contributors[]
  primaryContributor?: Contributors | null
}
export const mergePeople = async (props: MergePeopleProps) => {
  const { selectedPerson, allContributors, primaryContributor } = props

  try {
    const allArticleIds = allContributors
      .flatMap((contributor) => contributor.articles)
      .map((article) => article.articles_contributors_id?.id)
      .filter((id): id is string => id !== undefined)

    if (allArticleIds.length === 0) {
      return {
        success: false,
        error: "No articles found to merge",
        message: `No articles found to merge for ${selectedPerson.first_name} ${selectedPerson.last_name}`,
      }
    }

    // update the articles in the person record
    const result = await updatePersonArticles(selectedPerson.id, allArticleIds, primaryContributor?.bio)

    // update the contributor records
    // -- archive all but the primary contributor
    // -- add redirects for all to the primary contributor
    allContributors.map(async (contributor: Contributors) => {
      if (primaryContributor && contributor.id !== primaryContributor.id) {
        await addRedirect(primaryContributor, contributor)
        await archiveContributor(contributor)
      }

      return
    })

    if (!result) {
      return {
        success: false,
        error: "Failed to update person articles",
        message: `Failed to merge articles for ${selectedPerson.first_name} ${selectedPerson.last_name}`,
      }
    }

    return {
      success: true,
      error: null,
      message: `Successfully merged ${allArticleIds.length} articles to ${selectedPerson.first_name} ${selectedPerson.last_name}`,
    }
  } catch (error) {
    console.error("Error in mergePeople:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: `Error merging articles for ${selectedPerson.first_name} ${selectedPerson.last_name}`,
    }
  }
}

const addRedirect = async (primaryContributor: Contributors, contributor: Contributors) => {
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

    if (!redirect || redirect.length > 0) {
      return true
    }

    await directus.request(
      createItem("redirects", {
        path: url.pathname,
        contributors: primaryContributor,
        type: "contributor",
      }),
    )
  } catch (error) {
    console.error("Error updating contributor articles:", error)
    return null
  }
}

const archiveContributor = async (contributor: Contributors) => {
  try {
    await directus.request(
      updateItem("contributors", contributor.id, {
        status: "archived",
      }),
    )
  } catch (error) {
    console.error("Error updating contributor articles:", error)
    return null
  }
}

const updatePersonArticles = async (personId: string, articleIds: string[], shortBio?: string | null) => {
  try {
    const peopleData = await directus.request(
      updateItem("people", personId, {
        articles: {
          create: articleIds.map((id) => ({ articles_id: id })),
          delete: [], // This ensures we only add new relationships
        },
        short_bio: shortBio,
      }),
    )

    console.log("People data", peopleData)
    return true
  } catch (error) {
    console.error("Error updating person articles:", error)
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

export const getAllContributors = cache(async () => {
  try {
    let contributorPages: Contributors[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const contributorsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors?fields[]=id&fields[]=slug&fields[]=first_name&fields[]=last_name&fields[]=articles&sort=sort,first_name&filter[status][_eq]=published&filter[articles][_nnull]=true&page=${page}&limit=100&offset=${page * 100 - 100}`
      const res = await fetch(contributorsAPI)
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch getAllContributors data")
      }
      const data = await res.json()
      contributorPages = contributorPages.concat(data.data)
      isMore = data.data.length === 100 // assumes there is another page of records
      page++
    }

    return contributorPages
  } catch (error) {
    // Handle the error here
    console.error("Failed to fetch getAllContributors data", error)
    return null
  }
})

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
        const contributorsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors?fields[]=id&fields[]=slug&fields[]=status&fields[]=first_name&fields[]=old_id&fields[]=last_name&fields[]=bio&fields[]=articles&fields[]=articles.articles_contributors_id.id&sort=first_name&page=${page}&limit=100&offset=${page * 100 - 100}${filterString}`
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
