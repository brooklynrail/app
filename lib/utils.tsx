/* eslint max-lines: 0 */
import directus from "./directus"
import { readItem, readItems, readSingleton } from "@directus/sdk"
import { Ads, Articles, Contributors, DirectusFiles, GlobalSettings, Issues, Pages, Sections } from "./types"
import { stripHtml } from "string-strip-html"

// Used in
// - Issue Select dropdown
// - Archive page
export async function getAllIssues() {
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
      `&filter[status][_in]=published` +
      `&sort[]=-issue_number` +
      `&page=${page}` +
      `&limit=100` +
      `&offset=${page * 100 - 100}`

    const res = await fetch(allIssuesDataAPI, { cache: "force-cache" })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch getAllIssues data")
    }
    const data = await res.json()
    allIssues = allIssues.concat(data.data)
    isMore = data.data.length === 100 // assumes there is another page of records
    page++
  }
  console.log("allIssues", allIssues)
  return allIssues as Issues[]
}

export async function getIssues() {
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
      `&filter[status][_in]=published` +
      `&filter[special_issue][_eq]=false` +
      `&page=${page}` +
      `&limit=100` +
      `&offset=${page * 100 - 100}`
    const res = await fetch(issuesDataAPI, { cache: "force-cache" })
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
}

// only used for building pages in Special Issues
export async function getSpecialIssues() {
  let allIssues: Issues[] = []
  let page = 1
  let isMore = true
  while (isMore) {
    const issuesDataAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
      `?fields[]=slug` +
      `&fields[]=special_issue` +
      `&fields[]=issue_number` +
      `&filter[special_issue][_eq]=true` +
      `&filter[status][_in]=published` +
      `&page=${page}` +
      `&limit=100` +
      `&offset=${page * 100 - 100}`
    const res = await fetch(issuesDataAPI, { cache: "force-cache" })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch getSpecialIssues data")
    }
    const data = await res.json()
    allIssues = allIssues.concat(data.data)
    isMore = data.data.length === 100 // assumes there is another page of records
    page++
  }
  return allIssues as Issues[]
}

export async function getCurrentIssueData() {
  // const settings = await getGlobalSettings()
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

  let issueData
  if (curruentIssueData.special_issue && curruentIssueData.special_issue === true) {
    issueData = await getSpecialIssueData({
      slug: curruentIssueData.slug,
    })
  } else {
    issueData = await getIssueData({
      year: curruentIssueData.year,
      month: curruentIssueData.month,
    })
  }

  return issueData as Issues
}

export async function getPageData(slug: string) {
  const pageData = await directus.request(
    readItem("pages", slug, {
      fields: [
        "*",
        "title",
        "slug",
        "status",
        "body_text",
        {
          images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }],
        },
      ],
    }),
  )

  return pageData as Pages
}

export async function getGlobalSettings() {
  const globalSettingsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=current_issue.month&fields[]=current_issue.year&fields[]=current_issue.special_issue&fields[]=current_issue.slug&fields[]=preview_password`
  const res = await fetch(globalSettingsAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getGlobalSettings data")
  }
  const { data } = await res.json()
  return data as GlobalSettings
}

export async function getCurrentIssueBasics() {
  const settings = await getGlobalSettings()

  const issueData = await getIssueBasics({
    year: settings.current_issue.year,
    month: settings.current_issue.month,
  })

  // return the first issue in the array
  return issueData as Issues
}

// Explore making this get IssueData by ID
// NOTE: we need to use `readItems` instead of `readItem` because we are querying the `issues` collection
// instead of a single issue by ID
// This returns a single issue object
interface IssueDataProps {
  year: number
  month: number
}
export async function getIssueData(props: IssueDataProps) {
  const { year, month } = props
  const issueDataAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
    `?fields[]=id` +
    `&fields[]=title` +
    `&fields[]=slug` +
    `&fields[]=year` +
    `&fields[]=month` +
    `&fields[]=status` +
    `&fields[]=issue_number` +
    `&fields[]=special_issue` +
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
    `&fields[]=articles.slideshow_image.id` +
    `&fields[]=articles.slideshow_image.caption` +
    `&fields[]=articles.slideshow_image.filename_disk` +
    `&fields[]=articles.slideshow_image.width` +
    `&fields[]=articles.slideshow_image.height` +
    `&fields[]=articles.slideshow_image.type` +
    `&fields[]=articles.promo_banner.id` +
    `&fields[]=articles.promo_banner.caption` +
    `&fields[]=articles.promo_banner.filename_disk` +
    `&fields[]=articles.promo_banner.width` +
    `&fields[]=articles.promo_banner.height` +
    `&fields[]=articles.promo_banner.type` +
    `&fields[]=articles.promo_thumb.id` +
    `&fields[]=articles.promo_thumb.caption` +
    `&fields[]=articles.promo_thumb.filename_disk` +
    `&fields[]=articles.promo_thumb.width` +
    `&fields[]=articles.promo_thumb.height` +
    `&fields[]=articles.promo_thumb.type` +
    `&fields[]=articles.contributors.contributors_id.id` +
    `&fields[]=articles.contributors.contributors_id.first_name` +
    `&fields[]=articles.contributors.contributors_id.last_name` +
    `&fields[]=articles.contributors.contributors_id.old_id` +
    `&fields[]=articles.contributors.contributors_id.slug` +
    `&fields[]=articles.contributors.contributors_id.bio` +
    `&fields[]=articles.issue.id` +
    `&fields[]=articles.issue.title` +
    `&fields[]=articles.issue.slug` +
    `&fields[]=articles.section.id` +
    `&fields[]=articles.section.name` +
    `&fields[]=articles.section.slug` +
    `&fields[]=articles.images.directus_files_id.id` +
    `&fields[]=articles.images.directus_files_id.caption` +
    `&fields[]=articles.images.directus_files_id.filename_disk` +
    `&fields[]=articles.images.directus_files_id.width` +
    `&fields[]=articles.images.directus_files_id.height` +
    `&fields[]=articles.images.directus_files_id.type` +
    `&fields[]=articles.images.directus_files_id.shortcode_key` +
    `&filter[year][_eq]=${year}` +
    `&filter[month][_eq]=${month}` +
    `&filter[status][_eq]=published` +
    `&filter[special_issue][_eq]=false` +
    `&deep[articles][_sort]=sort` +
    `&deep[articles][_limit]=-1`
  const res = await fetch(issueDataAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getIssueData data")
  }

  const { data } = await res.json()
  return data[0] as Issues
}

interface SpecialIssueDataProps {
  slug: string
}
export async function getSpecialIssueData(props: SpecialIssueDataProps) {
  const { slug } = props
  const issueDataAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
    `?fields[]=id` +
    `&fields[]=title` +
    `&fields[]=slug` +
    `&fields[]=year` +
    `&fields[]=month` +
    `&fields[]=status` +
    `&fields[]=issue_number` +
    `&fields[]=special_issue` +
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
    `&fields[]=articles.slideshow_image.id` +
    `&fields[]=articles.slideshow_image.caption` +
    `&fields[]=articles.slideshow_image.filename_disk` +
    `&fields[]=articles.slideshow_image.width` +
    `&fields[]=articles.slideshow_image.height` +
    `&fields[]=articles.slideshow_image.type` +
    `&fields[]=articles.promo_banner.id` +
    `&fields[]=articles.promo_banner.caption` +
    `&fields[]=articles.promo_banner.filename_disk` +
    `&fields[]=articles.promo_banner.width` +
    `&fields[]=articles.promo_banner.height` +
    `&fields[]=articles.promo_banner.type` +
    `&fields[]=articles.promo_thumb.id` +
    `&fields[]=articles.promo_thumb.caption` +
    `&fields[]=articles.promo_thumb.filename_disk` +
    `&fields[]=articles.promo_thumb.width` +
    `&fields[]=articles.promo_thumb.height` +
    `&fields[]=articles.promo_thumb.type` +
    `&fields[]=articles.contributors.contributors_id.id` +
    `&fields[]=articles.contributors.contributors_id.first_name` +
    `&fields[]=articles.contributors.contributors_id.last_name` +
    `&fields[]=articles.contributors.contributors_id.old_id` +
    `&fields[]=articles.contributors.contributors_id.slug` +
    `&fields[]=articles.contributors.contributors_id.bio` +
    `&fields[]=articles.issue.title` +
    `&fields[]=articles.issue.slug` +
    `&fields[]=articles.section.id` +
    `&fields[]=articles.section.slug` +
    `&fields[]=articles.section.name` +
    `&fields[]=articles.section.old_id` +
    `&fields[]=articles.images.directus_files_id.id` +
    `&fields[]=articles.images.directus_files_id.caption` +
    `&fields[]=articles.images.directus_files_id.filename_disk` +
    `&fields[]=articles.images.directus_files_id.width` +
    `&fields[]=articles.images.directus_files_id.height` +
    `&fields[]=articles.images.directus_files_id.type` +
    `&fields[]=articles.images.directus_files_id.shortcode_key` +
    `&filter[slug][_eq]=${slug}` +
    `&filter[status][_eq]=published` +
    `&filter[special_issue][_eq]=true` +
    `&deep[articles][_sort]=sort` +
    `&deep[articles][_limit]=-1`

  const res = await fetch(issueDataAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getSpecialIssueData data")
  }

  const { data } = await res.json()
  return data[0] as Issues
}

interface IssueBasicsProps {
  year: number
  month: number
}

export async function getIssueBasics(props: IssueBasicsProps) {
  const { year, month } = props
  const issueBasicsAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
    `?fields[]=id` +
    `&fields[]=title` +
    `&fields[]=slug` +
    `&fields[]=year` +
    `&fields[]=month` +
    `&fields[]=status` +
    `&fields[]=issue_number` +
    `&fields[]=special_issue` +
    `&fields[]=section.slug` +
    `&fields[]=cover_1.caption` +
    `&fields[]=cover_1.filename_disk` +
    `&fields[]=cover_1.width` +
    `&fields[]=cover_1.height` +
    `&fields[]=cover_1.type` +
    `&filter[year][_eq]=${year}` +
    `&filter[month][_eq]=${month}` +
    `&filter[status][_eq]=published` +
    `&filter[special_issue][_eq]=false`
  const res = await fetch(issueBasicsAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getIssueBasics data")
  }

  const { data } = await res.json()
  return data[0] as Issues
}

interface SpecialIssueBasicsProps {
  slug: string
}

export async function getSpecialIssueBasics(props: SpecialIssueBasicsProps) {
  const { slug } = props
  const specialIssueBasicsAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/issues` +
    `?fields[]=id` +
    `&fields[]=title` +
    `&fields[]=slug` +
    `&fields[]=year` +
    `&fields[]=month` +
    `&fields[]=status` +
    `&fields[]=issue_number` +
    `&fields[]=special_issue` +
    `&fields[]=section.slug` +
    `&fields[]=cover_1.caption` +
    `&fields[]=cover_1.filename_disk` +
    `&fields[]=cover_1.width` +
    `&fields[]=cover_1.height` +
    `&fields[]=cover_1.type` +
    `&filter[slug][_eq]=${slug}` +
    `&filter[status][_in]=published` +
    `&filter[special_issue][_eq]=true`
  const res = await fetch(specialIssueBasicsAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getSpecialIssueBasics data")
  }

  const { data } = await res.json()
  return data[0] as Issues
}

export async function getSectionsByIssueId(issueId: string) {
  const sections = await directus.request(
    readItems("sections", {
      fields: ["id", "name", "slug", "articles", "old_id"],
      filter: {
        articles: {
          issue: {
            id: { _eq: issueId },
          },
        },
      },
    }),
  )
  return sections as Sections[]
}

export async function getSpecialArticlePages() {
  try {
    let specialArticlePages: Articles[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const specialArticleDataAPI =
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
        `?fields[]=slug` +
        `&fields[]=section.slug` +
        `&fields[]=issue.slug` +
        `&fields[]=issue.special_issue` +
        `&fields[]=issue.status` +
        `&filter[status][_eq]=published` +
        `&filter[slug][_nempty]=true` +
        `&filter[issue][_nnull]=true` +
        `&deep[issue][_filter][special_issue][_eq]=true` +
        `&page=${page}` +
        `&limit=100` +
        `&offset=${page * 100 - 100}`
      const res = await fetch(specialArticleDataAPI, { cache: "force-cache" })
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch getSpecialArticlePages data")
      }
      const data = await res.json()
      specialArticlePages = specialArticlePages.concat(data.data)
      isMore = data.data.length === 100 // assumes there is another page of records
      page++
    }
    return specialArticlePages
  } catch (error) {
    console.error("error in getSpecialArticlePages", error)
    throw error
  }
}

export async function getArticlePages() {
  let articlePages: Articles[] = []
  let page = 1
  let isMore = true
  while (isMore) {
    const articleDataAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
      `?fields[]=slug` +
      `&fields[]=section.slug` +
      `&fields[]=issue.year` +
      `&fields[]=issue.month` +
      `&fields[]=issue.slug` +
      `&fields[]=issue.special_issue` +
      `&fields[]=issue.status` +
      `&filter[status][_eq]=published` +
      `&filter[slug][_nempty]=true` +
      `&filter[issue][_nnull]=true` +
      `&deep[issue][_filter][special_issue][_eq]=false` +
      `&page=${page}` +
      `&limit=100` +
      `&offset=${page * 100 - 100}`
    const res = await fetch(articleDataAPI, { cache: "force-cache" })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch getArticlePages data")
    }
    const data = await res.json()
    articlePages = articlePages.concat(data.data)
    isMore = data.data.length === 100 // assumes there is another page of records
    page++
  }
  return articlePages as Articles[]
}

export async function getPreviewArticle(slug: string) {
  const preview = await directus.request(
    readItem("articles", slug, {
      version: "draft",
      fields: [
        "*",
        { issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"] },
        { section: ["id", "name", "slug"] },
        { contributors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }] },
        { featured_image: ["id", "width", "height", "filename_disk", "caption"] },
        { slideshow_image: ["id", "width", "height", "filename_disk", "caption"] },
        { promo_banner: ["id", "width", "height", "filename_disk", "caption"] },
        { promo_thumb: ["id", "width", "height", "filename_disk", "caption"] },
        { images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }] },
        { user_updated: ["id", "first_name", "last_name", "avatar"] },
      ],
    }),
  )
  return preview as Articles
}

export async function getPreviewIssue(year: number, month: number) {
  const preview = await directus.request(
    readItems("issues", {
      fields: [
        "*",
        "title",
        {
          articles: [
            "slug",
            "title",
            "excerpt",
            "kicker",
            "sort",
            "featured",
            { section: ["slug", "name"] },
            { featured_image: ["id", "width", "height", "filename_disk", "caption"] },
            { promo_banner: ["id", "width", "height", "filename_disk", "caption"] },
            { promo_thumb: ["id", "width", "height", "filename_disk", "caption"] },
            { slideshow_image: ["id", "width", "height", "filename_disk", "caption"] },
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
        _and: [
          {
            year: { _eq: year },
            month: { _eq: month },
          },
        ],
      },
    }),
  )
  return preview[0] as Issues
}

export async function getArticle(slug: string, status?: string) {
  let articleAPI
  let res
  if (status === "published") {
    articleAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
      `?fields[]=slug` +
      `&fields[]=byline_override` +
      `&fields[]=title` +
      `&fields[]=deck` +
      `&fields[]=excerpt` +
      `&fields[]=kicker` +
      `&fields[]=featured` +
      `&fields[]=sort` +
      `&fields[]=body_text` +
      `&fields[]=body_type` +
      `&fields[]=header_type` +
      `&fields[]=in_print` +
      `&fields[]=status` +
      `&fields[]=date_created` +
      `&fields[]=date_updated` +
      `&fields[]=title_tag` +
      `&fields[]=user_updated` +
      `&fields[]=date_updated` +
      `&fields[]=hide_bylines` +
      `&fields[]=hide_bylines_downstream` +
      `&fields[]=tags` +
      `&fields[]=endnote` +
      `&fields[]=featured_image.id` +
      `&fields[]=featured_image.caption` +
      `&fields[]=featured_image.filename_disk` +
      `&fields[]=featured_image.width` +
      `&fields[]=featured_image.height` +
      `&fields[]=featured_image.type` +
      `&fields[]=slideshow_image.id` +
      `&fields[]=slideshow_image.caption` +
      `&fields[]=slideshow_image.filename_disk` +
      `&fields[]=slideshow_image.width` +
      `&fields[]=slideshow_image.height` +
      `&fields[]=slideshow_image.type` +
      `&fields[]=promo_banner.id` +
      `&fields[]=promo_banner.caption` +
      `&fields[]=promo_banner.filename_disk` +
      `&fields[]=promo_banner.width` +
      `&fields[]=promo_banner.height` +
      `&fields[]=promo_banner.type` +
      `&fields[]=promo_thumb.id` +
      `&fields[]=promo_thumb.caption` +
      `&fields[]=promo_thumb.filename_disk` +
      `&fields[]=promo_thumb.width` +
      `&fields[]=promo_thumb.height` +
      `&fields[]=promo_thumb.type` +
      `&fields[]=contributors.contributors_id.first_name` +
      `&fields[]=contributors.contributors_id.last_name` +
      `&fields[]=contributors.contributors_id.slug` +
      `&fields[]=contributors.contributors_id.bio` +
      `&fields[]=issue.title` +
      `&fields[]=issue.slug` +
      `&fields[]=section.slug` +
      `&fields[]=section.name` +
      `&fields[]=images.sort` +
      `&fields[]=images.directus_files_id.id` +
      `&fields[]=images.directus_files_id.caption` +
      `&fields[]=images.directus_files_id.filename_disk` +
      `&fields[]=images.directus_files_id.width` +
      `&fields[]=images.directus_files_id.height` +
      `&fields[]=images.directus_files_id.type` +
      `&fields[]=images.directus_files_id.shortcode_key` +
      `&filter[slug][_eq]=${slug}` +
      `&filter[status][_in]=published`
    res = await fetch(articleAPI, { cache: "force-cache" })
  } else {
    articleAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
      `?fields[]=slug` +
      `&fields[]=byline_override` +
      `&fields[]=title` +
      `&fields[]=deck` +
      `&fields[]=excerpt` +
      `&fields[]=kicker` +
      `&fields[]=featured` +
      `&fields[]=sort` +
      `&fields[]=body_code` +
      `&fields[]=body_text` +
      `&fields[]=body_type` +
      `&fields[]=header_type` +
      `&fields[]=in_print` +
      `&fields[]=status` +
      `&fields[]=date_created` +
      `&fields[]=date_updated` +
      `&fields[]=title_tag` +
      `&fields[]=user_updated` +
      `&fields[]=date_updated` +
      `&fields[]=hide_bylines` +
      `&fields[]=hide_bylines_downstream` +
      `&fields[]=tags` +
      `&fields[]=endnote` +
      `&fields[]=featured_image.id` +
      `&fields[]=featured_image.caption` +
      `&fields[]=featured_image.filename_disk` +
      `&fields[]=featured_image.width` +
      `&fields[]=featured_image.height` +
      `&fields[]=featured_image.type` +
      `&fields[]=slideshow_image.id` +
      `&fields[]=slideshow_image.caption` +
      `&fields[]=slideshow_image.filename_disk` +
      `&fields[]=slideshow_image.width` +
      `&fields[]=slideshow_image.height` +
      `&fields[]=slideshow_image.type` +
      `&fields[]=promo_banner.id` +
      `&fields[]=promo_banner.caption` +
      `&fields[]=promo_banner.filename_disk` +
      `&fields[]=promo_banner.width` +
      `&fields[]=promo_banner.height` +
      `&fields[]=promo_banner.type` +
      `&fields[]=promo_thumb.id` +
      `&fields[]=promo_thumb.caption` +
      `&fields[]=promo_thumb.filename_disk` +
      `&fields[]=promo_thumb.width` +
      `&fields[]=promo_thumb.height` +
      `&fields[]=promo_thumb.type` +
      `&fields[]=contributors.contributors_id.first_name` +
      `&fields[]=contributors.contributors_id.last_name` +
      `&fields[]=contributors.contributors_id.slug` +
      `&fields[]=contributors.contributors_id.bio` +
      `&fields[]=issue.title` +
      `&fields[]=issue.slug` +
      `&fields[]=section.slug` +
      `&fields[]=section.name` +
      `&fields[]=images.directus_files_id.id` +
      `&fields[]=images.directus_files_id.caption` +
      `&fields[]=images.directus_files_id.filename_disk` +
      `&fields[]=images.directus_files_id.width` +
      `&fields[]=images.directus_files_id.height` +
      `&fields[]=images.directus_files_id.type` +
      `&fields[]=images.directus_files_id.shortcode_key` +
      `&filter[slug][_eq]=${slug}`
    res = await fetch(articleAPI)
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch articleAPI data")
  }

  const { data } = await res.json()
  return data[0] as Articles
}

export async function getAds() {
  // const today = new Date()
  // newDate Formatted as YYYY-MM-DD

  const ads = await directus.request(
    readItems("ads", {
      fields: [
        "ad_type",
        "ad_url",
        "start_date",
        "end_date",
        "status",
        "sort",
        "campaign_title",
        "slug",
        {
          tile_image: ["filename_disk", "width", "height"],
        },
        {
          banner_image: ["filename_disk", "width", "height"],
        },
        {
          banner_image_mobile: ["filename_disk", "width", "height"],
        },
      ],
      filter: {
        _and: [
          {
            status: {
              _in: ["published"],
            },
            // start_date: {
            //   _lte: newDate,
            // },
            // end_date: {
            //   _gte: newDate,
            // },
            ad_url: {
              _nnull: true,
            },
          },
        ],
      },
    }),
  )
  return ads as Ads[]
}

interface OGImageProps {
  ogimage?: DirectusFiles
  title: string
}

export function getOGImage(props: OGImageProps) {
  const { ogimage, title } = props
  if (ogimage && ogimage.width && ogimage.height) {
    return [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/${ogimage.filename_disk}`,
        width: ogimage.width,
        height: ogimage.height,
        alt: ogimage.caption ? stripHtml(ogimage.caption).result : `${stripHtml(title).result} - The Brooklyn Rail`,
        type: ogimage.type ? ogimage.type : "image/jpeg",
      },
    ]
  }
  return [
    {
      url: "https://brooklynrail.org/material/img/brooklynrail-card-3.png",
      width: 2000,
      height: 1200,
      alt: "The Brooklyn Rail",
      type: "image/png",
    },
  ]
}

export enum PageType {
  Article = "article",
  Section = "section",
  Issue = "issue",
  Home = "home",
  Contributor = "contributor",
  Page = "page",
  Preview = "preview",
  SpecialIssue = "special_issue",
  SpecialIssueSection = "special_issue_section",
  SpecialIssueArticle = "special_issue_article",
  Archive = "archive",
}
interface PermalinkProps {
  type: PageType
  year?: number
  month?: number
  section?: string | Sections
  slug?: string
  issueSlug?: string
}
export function getPermalink(props: PermalinkProps) {
  const { year, section, slug, issueSlug, type } = props
  const month = props.month && props.month < 10 ? `0${props.month}` : props.month

  switch (type) {
    case PageType.Article:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/${section}/${slug}/`
    case PageType.Section:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/${section}/`
    case PageType.Issue:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/${year}/${month}/`
    case PageType.Contributor:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/contributor/${slug}/`
    case PageType.Page:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/`
    case PageType.Preview:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/preview/${slug}/`
    case PageType.SpecialIssue:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/special/${issueSlug}/`
    case PageType.SpecialIssueSection:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/special/${issueSlug}/${section}/`
    case PageType.SpecialIssueArticle:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/special/${issueSlug}/${section}/${slug}/`
    case PageType.Archive:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/archive/`
    default:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/`
  }
}

export async function getPreviewPassword() {
  const settings = await getGlobalSettings()
  return settings.preview_password
}

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
    `&fields[]=articles.status` +
    `&fields[]=articles.slug` +
    `&fields[]=articles.title` +
    `&fields[]=articles.excerpt` +
    `&fields[]=articles.kicker` +
    `&fields[]=articles.featured` +
    `&fields[]=articles.featured_image.id` +
    `&fields[]=articles.featured_image.caption` +
    `&fields[]=articles.featured_image.filename_disk` +
    `&fields[]=articles.featured_image.width` +
    `&fields[]=articles.featured_image.height` +
    `&fields[]=articles.featured_image.type` +
    `&fields[]=articles.issue.title` +
    `&fields[]=articles.issue.year` +
    `&fields[]=articles.issue.month` +
    `&fields[]=articles.issue.slug` +
    `&fields[]=articles.issue.special_issue` +
    `&fields[]=articles.section.slug` +
    `&fields[]=articles.section.name` +
    `&filter[slug][_eq]=${slug}` +
    `&filter[status][_in]=published` +
    `&filter[articles][_nnull]=true` +
    `&deep[articles][issue][_nnull]=true`

  const res = await fetch(issueDataAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getContributor data")
  }

  const { data } = await res.json()
  return data as Contributors[]
}

export async function getAllContributors() {
  let contributorPages: Contributors[] = []
  let page = 1
  let isMore = true
  while (isMore) {
    const contributorsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors?fields[]=slug&fields[]=first_name&fields[]=last_name&fields[]=articles&sort=sort,first_name&filter[status][_eq]=published&filter[articles][_nnull]=true&page=${page}&limit=100&offset=${page * 100 - 100}`
    const res = await fetch(contributorsAPI, { cache: "force-cache" })
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
}
