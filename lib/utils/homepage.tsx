"use server"

import { readSingleton } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, Homepage, HomepageCollections, Issues } from "../types"
import { getBaseUrl } from "../utils"

const baseUrl = getBaseUrl()

export const getNavData = async (): Promise<Homepage | null> => {
  try {
    const res = await fetch(`${baseUrl}/api/nav/`)

    if (!res.ok) {
      const text = await res.text()
      console.error("API Response:", text)
      throw new Error(`API returned ${res.status}: ${text}`)
    }

    return res.json()
  } catch (error) {
    console.error("Failed to fetch nav data:", error, `${baseUrl}/api/nav/`)
    return null
  }
}

export const getHomepageData = cache(async () => {
  try {
    const res = await fetch(`${baseUrl}/api/homepage/`)

    if (!res.ok) {
      const text = await res.text()
      console.error("API Response:", text)
      throw new Error(`API returned ${res.status}: ${text}`)
    }

    return res.json()
  } catch (error) {
    console.error("Failed to fetch homepage data function:", error, `${baseUrl}/api/homepage/`)
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
    const res = await fetch(`${baseUrl}/api/currentIssue/`)

    if (!res.ok) {
      const text = await res.text()
      console.error("API Response:", text)
      throw new Error(`API returned ${res.status}: ${text}`)
    }

    return res.json() as Promise<Issues>
  } catch (error) {
    console.error("Failed to fetch nav data:", error, `${baseUrl}/api/nav/`)
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
