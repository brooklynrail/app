/* eslint max-lines: 0 */
import directus from "./directus"
import { readItems, readSingleton } from "@directus/sdk"
import {
  Articles,
  Contributors,
  DirectusFiles,
  Events,
  GlobalSettings,
  Issues,
  Pages,
  People,
  Sections,
  Tributes,
} from "./types"
import { stripHtml } from "string-strip-html"
import { cache } from "react"

// Used in
// - Issue Select dropdown
// - Archive page
export const getAllIssues = cache(async () => {
  try {
    let allIssues: Issues[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const allIssuesDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
        `?fields[]=year` +
        `&fields[]=month` +
        `&fields[]=id` +
        `&fields[]=slug` +
        `&fields[]=title` +
        `&fields[]=special_issue` +
        `&fields[]=issue_number` +
        `&fields[]=date_updated` +
        `&fields[]=summary` +
        `&fields[]=credits` +
        `&fields[]=status` +
        `&fields[]=cover_1.caption` +
        `&fields[]=cover_1.filename_disk` +
        `&fields[]=cover_1.width` +
        `&fields[]=cover_1.height` +
        `&fields[]=cover_1.type` +
        `&fields[]=cover_2.caption` +
        `&fields[]=cover_2.filename_disk` +
        `&fields[]=cover_2.width` +
        `&fields[]=cover_2.height` +
        `&fields[]=cover_2.type` +
        `&fields[]=cover_3.caption` +
        `&fields[]=cover_3.filename_disk` +
        `&fields[]=cover_3.width` +
        `&fields[]=cover_3.height` +
        `&fields[]=cover_3.type` +
        `&fields[]=cover_4.caption` +
        `&fields[]=cover_4.filename_disk` +
        `&fields[]=cover_4.width` +
        `&fields[]=cover_4.height` +
        `&fields[]=cover_4.type` +
        `&fields[]=cover_5.caption` +
        `&fields[]=cover_5.filename_disk` +
        `&fields[]=cover_5.width` +
        `&fields[]=cover_5.height` +
        `&fields[]=cover_5.type` +
        `&fields[]=cover_6.caption` +
        `&fields[]=cover_6.filename_disk` +
        `&fields[]=cover_6.width` +
        `&fields[]=cover_6.height` +
        `&fields[]=cover_6.type` +
        `&filter[status][_eq]=published` +
        `&sort[]=-issue_number` +
        `&page=${page}` +
        `&limit=100` +
        `&offset=${page * 100 - 100}`

      const res = await fetch(allIssuesDataAPI)
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.error(`Failed to fetch AllIssues data: ${res.statusText}`)
        return null
      }
      const data = await res.json()
      allIssues = allIssues.concat(data.data)
      isMore = data.data.length === 100 // assumes there is another page of records
      page++
    }
    return allIssues as Issues[]
  } catch (error) {
    console.error("Error fetching All Issues data:", error)
    return null
  }
})

export const getIssues = cache(async () => {
  try {
    let allIssues: Issues[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const issuesDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
        `?fields[]=id` +
        `&fields[]=year` +
        `&fields[]=month` +
        `&fields[]=slug` +
        `&fields[]=special_issue` +
        `&filter[status][_eq]=published` +
        `&sort[]=-year` +
        `&sort[]=-month` +
        `&page=${page}` +
        `&limit=100` +
        `&offset=${page * 100 - 100}`
      const res = await fetch(issuesDataAPI)
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch getIssues data")
      }
      const data = await res.json()
      allIssues = allIssues.concat(data.data)
      isMore = data.data.length === 100 // assumes there is another page of records
      page++
    }
    return allIssues as Issues[]
  } catch (error) {
    console.error("Error fetching getIssues:", error)
    return null
  }
})

export const getCurrentIssueData = cache(async () => {
  try {
    const settings = await directus.request(
      readSingleton("global_settings", {
        fields: [
          {
            current_issue: ["id", "title", "slug", "year", "month", "status", "special_issue"],
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

    // 802-522-0165
    const issueData = await getIssueData({
      slug: curruentIssueData.slug,
    })

    return issueData as Issues
  } catch (error) {
    console.error("Error fetching CurrentIssueData data:", error)
    return null
  }
})

export const getGlobalSettings = cache(async () => {
  const globalSettingsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=current_issue.month&fields[]=current_issue.year&fields[]=current_issue.special_issue&fields[]=current_issue.slug&fields[]=preview_password`
  const res = await fetch(globalSettingsAPI)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getGlobalSettings data")
  }
  const { data } = await res.json()
  return data as GlobalSettings
})

// Explore making this get IssueData by ID
// NOTE: we need to use `readItems` instead of `readItem` because we are querying the `issues` collection
// instead of a single issue by ID
// This returns a single issue object
interface IssueDataProps {
  slug: string
}
export const getIssueData = cache(async (props: IssueDataProps) => {
  const { slug } = props
  const issueDataAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
    `?fields[]=id` +
    `&fields[]=title` +
    `&fields[]=slug` +
    `&fields[]=year` +
    `&fields[]=month` +
    `&fields[]=status` +
    `&fields[]=published` +
    `&fields[]=issue_number` +
    `&fields[]=special_issue` +
    `&fields[]=store_url` +
    `&fields[]=old_id` +
    `&fields[]=summary` +
    `&fields[]=credits` +
    `&fields[]=cover_1.caption` +
    `&fields[]=cover_1.filename_disk` +
    `&fields[]=cover_1.width` +
    `&fields[]=cover_1.height` +
    `&fields[]=cover_1.type` +
    `&fields[]=cover_2.caption` +
    `&fields[]=cover_2.filename_disk` +
    `&fields[]=cover_2.width` +
    `&fields[]=cover_2.height` +
    `&fields[]=cover_2.type` +
    `&fields[]=cover_3.caption` +
    `&fields[]=cover_3.filename_disk` +
    `&fields[]=cover_3.width` +
    `&fields[]=cover_3.height` +
    `&fields[]=cover_3.type` +
    `&fields[]=cover_4.caption` +
    `&fields[]=cover_4.filename_disk` +
    `&fields[]=cover_4.width` +
    `&fields[]=cover_4.height` +
    `&fields[]=cover_4.type` +
    `&fields[]=cover_5.caption` +
    `&fields[]=cover_5.filename_disk` +
    `&fields[]=cover_5.width` +
    `&fields[]=cover_5.height` +
    `&fields[]=cover_5.type` +
    `&fields[]=cover_6.caption` +
    `&fields[]=cover_6.filename_disk` +
    `&fields[]=cover_6.width` +
    `&fields[]=cover_6.height` +
    `&fields[]=cover_6.type` +
    `&fields[]=articles.sort` +
    `&fields[]=articles.status` +
    `&fields[]=articles.slug` +
    `&fields[]=articles.title` +
    `&fields[]=articles.excerpt` +
    `&fields[]=articles.kicker` +
    `&fields[]=articles.featured` +
    `&fields[]=articles.hide_bylines` +
    `&fields[]=articles.hide_bylines_downstream` +
    `&fields[]=articles.byline_override` +
    `&fields[]=articles.featured_image.id` +
    `&fields[]=articles.featured_image.caption` +
    `&fields[]=articles.featured_image.filename_disk` +
    `&fields[]=articles.featured_image.width` +
    `&fields[]=articles.featured_image.height` +
    `&fields[]=articles.featured_image.type` +
    `&fields[]=articles.contributors.contributors_id.id` +
    `&fields[]=articles.contributors.contributors_id.first_name` +
    `&fields[]=articles.contributors.contributors_id.last_name` +
    `&fields[]=articles.contributors.contributors_id.old_id` +
    `&fields[]=articles.contributors.contributors_id.slug` +
    `&fields[]=articles.contributors.contributors_id.bio` +
    `&fields[]=articles.issue.id` +
    `&fields[]=articles.issue.slug` +
    `&fields[]=articles.issue.title` +
    `&fields[]=articles.issue.year` +
    `&fields[]=articles.issue.month` +
    `&fields[]=articles.section.id` +
    `&fields[]=articles.section.name` +
    `&fields[]=articles.section.description` +
    `&fields[]=articles.section.slug` +
    `&fields[]=articles.tribute.slug` +
    `&fields[]=articles.tribute.title` +
    `&fields[]=articles.images.directus_files_id.id` +
    `&fields[]=articles.images.directus_files_id.caption` +
    `&fields[]=articles.images.directus_files_id.filename_disk` +
    `&fields[]=articles.images.directus_files_id.width` +
    `&fields[]=articles.images.directus_files_id.height` +
    `&fields[]=articles.images.directus_files_id.type` +
    `&fields[]=articles.images.directus_files_id.shortcode_key` +
    `&filter[slug][_eq]=${slug}` +
    `&filter[status][_eq]=published` +
    `&deep[articles][_filter][status][_eq]=published` +
    `&deep[articles][_sort]=sort` +
    `&deep[articles][_limit]=-1`
  try {
    const res = await fetch(issueDataAPI)

    if (!res.ok) {
      console.error(`Failed to fetch issue data: ${res.statusText}`)
      return null
    }

    const json = await res.json()
    if (!json.data || !json.data.length) {
      console.error("No issue data returned from API")
      return null
    }

    return json.data[0] as Issues
  } catch (error) {
    console.error("Error fetching issue data:", error)
    return null
  }
})

export const getSectionsByIssueId = cache(async (issueId: string, status: string) => {
  try {
    const sections = await directus.request(
      readItems("sections", {
        fields: ["id", "name", "description", "slug", "articles", "old_id"],
        filter: {
          _and: [
            {
              articles: {
                issue: {
                  id: { _eq: issueId },
                },
                status: { _eq: `${status}` },
              },
            },
          ],
        },
      }),
    )
    return sections as Sections[]
  } catch (error) {
    console.error("Error in getSectionsByIssueId", error)
    return null
  }
})

export const getPreviewArticle = cache(async (id: string) => {
  try {
    // Search for the article with the matching slug
    // assuming that slug is unique!
    const preview = await directus.request(
      readItems("articles", {
        version: "draft",
        fields: [
          "*",
          "tribute",
          "hide_title",
          { section: ["id", "name", "slug"] },
          { issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"] },
          { contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }] },
          { featured_image: ["id", "width", "height", "filename_disk", "caption"] },
          { images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }] },
          { user_updated: ["id", "first_name", "last_name", "avatar"] },
        ],
        filter: {
          id: { _eq: id },
        },
      }),
    )
    return preview[0] as Articles
  } catch (error) {
    console.error("error in getPreviewArticle", error)
    return null
  }
})

export const getPreviewIssue = cache(async (id: string) => {
  try {
    const preview = await directus.request(
      readItems("issues", {
        fields: [
          "*",
          "title",
          {
            articles: [
              "id",
              "status",
              "slug",
              "title",
              "excerpt",
              "kicker",
              "sort",
              "featured",
              { contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }] },
              { section: ["id", "slug", "name"] },
              { featured_image: ["id", "width", "height", "filename_disk", "caption"] },
            ],
          },
          { cover_1: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_2: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_3: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_4: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_5: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_6: ["id", "width", "height", "filename_disk", "caption"] },
          { user_updated: ["id", "first_name", "last_name", "avatar"] },
        ],
        filter: {
          id: { _eq: id },
        },
        deep: {
          articles: {
            _limit: -1,
          },
        },
      }),
    )

    return preview[0] as Issues
  } catch (error) {
    console.error("error in getPreviewIssue", error)
    return null
  }
})

export const getPreviewTribute = cache(async (id: string) => {
  try {
    const preview = await directus.request(
      readItems("tributes", {
        fields: [
          "id",
          "title",
          "deck",
          "slug",
          "blurb",
          "summary",
          "excerpt",
          "published",
          "title_tag",
          {
            editors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
          },
          {
            featured_image: ["id", "width", "height", "filename_disk", "caption"],
          },
          {
            articles: [
              "slug",
              "title",
              "excerpt",
              "body_text",
              "sort",
              "hide_title",
              "status",
              {
                tribute: ["slug"],
              },
              {
                images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }],
              },
              {
                section: ["name", "slug"],
              },
              {
                issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"],
              },
              {
                contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }],
              },
              {
                featured_image: ["id", "width", "height", "filename_disk", "caption"],
              },
            ],
          },
        ],
        filter: {
          id: {
            _eq: id,
          },
        },
      }),
    )
    return preview[0] as Tributes
  } catch (error) {
    console.error("error in getPreviewTribute", error)
    return null
  }
})

export const getAllPeople = cache(async () => {
  const people = await directus.request(
    readItems("people", {
      fields: ["*"],
    }),
  )
  return people as People[]
})

export const getNavigation = cache(async () => {
  const global_settings = await directus.request(
    readSingleton("global_settings", {
      fields: [
        {
          current_issue: ["title", "slug"],
        },
        {
          navigation: [
            "collection",
            {
              item: {
                sections: ["name", "slug"],
                tributes: ["title", "slug"],
              },
            },
          ],
        },
      ],
    }),
  )
  return global_settings as GlobalSettings
})

export const cleanup = (str: string) => {
  // Replace non-breaking spaces
  var reNbsp = new RegExp(String.fromCharCode(160), "g")
  str = str.replace(reNbsp, " ")

  // Remove <br/> tags
  str = str.replace(/<br\s*\/?>/gi, " ")

  // Remove <span> tags with specific styles while preserving the text within
  str = str.replace(/<span[^>]*style=["'][^"']*font-size:\s*80%[^"']*["'][^>]*>(.*?)<\/span>/gi, "$1")

  return str
}
