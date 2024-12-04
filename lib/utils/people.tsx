import { readItems } from "@directus/sdk"
import { cache } from "react"
import directus from "../directus"
import { Contributors, People } from "../types"

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

export const getAllContributorsMerge = cache(async () => {
  try {
    let contributorPages: Contributors[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const contributorsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors?fields[]=id&fields[]=slug&fields[]=first_name&fields[]=last_name&fields[]=bio&fields[]=articles&sort=first_name&filter[status][_eq]=published&page=${page}&limit=100&offset=${page * 100 - 100}`
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
