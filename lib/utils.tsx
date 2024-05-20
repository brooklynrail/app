// @ts-nocheck
/* eslint max-lines: 0 */
import directus from "./directus"
import { readItem, readItems, readSingleton, readFiles, readPreset, aggregate } from "@directus/sdk"
import { Ads, Articles, Contributors, DirectusFiles, Issues, Sections } from "./types"
import { stripHtml } from "string-strip-html"

export async function getAllIssues() {
  const issues: Issues[] = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "id", "slug", "title", "special_issue", "issue_number", "date_updated"],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
    }),
  )
  return issues
}

interface GetIssuesProps {
  special_issue: boolean
}

export async function getIssues(props: GetIssuesProps) {
  const { special_issue } = props
  const issues: Issues[] = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "id", "slug", "title", "special_issue", "issue_number"],
      filter: {
        _and: [{ status: { _eq: "published" }, special_issue: special_issue ? { _eq: true } : { _eq: false } }],
      },
      limit: -1,
    }),
  )
  return issues
}

export async function getCurrentIssueData() {
  // get the current issue from the global settings
  const globalSettingsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=current_issue&fields[]=current_issue.id&fields[]=current_issue.year&fields[]=current_issue.month&fields[]=current_issue.slug&fields[]=current_issue.special_issue&fields[]=current_issue.status`
  const res = await fetch(globalSettingsAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }
  const settings = await res.json()

  let issueData: Issues
  if (settings.data.current_issue.special_issue === false) {
    issueData = await getIssueData({
      year: settings.data.current_issue.year,
      month: settings.data.current_issue.month,
    })
  } else {
    issueData = await getSpecialIssueData({
      slug: settings.data.current_issue.slug,
    })
  }

  return issueData
}

export async function getCurrentIssueBasics() {
  // get the current issue from the global settings
  const globalSettingsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=current_issue&fields[]=current_issue.id&fields[]=current_issue.year&fields[]=current_issue.month&fields[]=current_issue.slug&fields[]=current_issue.special_issue&fields[]=current_issue.status`
  const res = await fetch(globalSettingsAPI, { cache: "force-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }
  const settings = await res.json()

  const issueData = await getIssueBasics({
    year: settings.data.current_issue.year,
    month: settings.data.current_issue.month,
  })

  // return the first issue in the array
  return issueData
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
  const issueData: Issues[] = await directus.request(
    readItems("issues", {
      fields: [
        "id",
        "title",
        "slug",
        "year",
        "month",
        "status",
        "issue_number",
        "old_id",
        "special_issue",
        "summary",
        "credits",
        {
          cover_1: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_2: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_3: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_4: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_5: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_6: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          articles: [
            "order",
            {
              articles_slug: [
                "status",
                "slug",
                "title",
                "excerpt",
                "kicker",
                "featured",
                "hide_bylines",
                "hide_bylines_downstream",
                "byline_override",
                {
                  promo_thumb: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  promo_banner: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  slideshow_image: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  featured_image: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  contributors: [
                    {
                      contributors_id: ["id", "old_id", "first_name", "last_name", "slug"],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      sections_id: ["id", "slug", "name", "old_id"],
                    },
                  ],
                },
                {
                  images: [
                    {
                      directus_files_id: ["id", "caption", "filename_disk", "width", "height", "type", "shortcode_key"],
                    },
                  ],
                },
                "sort",
              ],
            },
          ],
        },
      ],
      filter: {
        _and: [
          {
            special_issue: { _eq: false },
            year: { _eq: year },
            month: { _eq: month },
            status: { _eq: "published" },
          },
        ],
      },
      deep: {
        articles: {
          _limit: -1,
        },
      },
    }),
  )
  return issueData[0]
}

interface SpecialIssueDataProps {
  slug: string
}
export async function getSpecialIssueData(props: SpecialIssueDataProps) {
  const { slug } = props
  const issueData: Issues[] = await directus.request(
    readItems("issues", {
      fields: [
        "id",
        "title",
        "slug",
        "year",
        "month",
        "status",
        "issue_number",
        "old_id",
        "special_issue",
        "summary",
        "credits",
        {
          cover_1: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_2: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_3: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_4: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_5: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          cover_6: ["caption", "filename_disk", "width", "height", "type"],
        },
        {
          articles: [
            "order",
            {
              articles_slug: [
                "status",
                "slug",
                "title",
                "excerpt",
                "kicker",
                "featured",
                "hide_bylines",
                "hide_bylines_downstream",
                "byline_override",
                {
                  promo_thumb: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  promo_banner: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  slideshow_image: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  featured_image: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  contributors: [
                    {
                      contributors_id: ["id", "old_id", "first_name", "last_name", "slug"],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      sections_id: ["id", "slug", "name", "old_id"],
                    },
                  ],
                },
                {
                  images: [
                    {
                      directus_files_id: ["id", "caption", "filename_disk", "width", "height", "type", "shortcode_key"],
                    },
                  ],
                },
                "sort",
              ],
            },
          ],
        },
      ],
      filter: {
        _and: [
          {
            special_issue: { _eq: true },
            slug: { _eq: slug },
            status: { _eq: "published" },
          },
        ],
      },
      deep: {
        articles: {
          _limit: -1,
        },
      },
    }),
  )
  return issueData[0]
}

interface IssueBasicsProps {
  year?: number
  month?: number
  slug?: string
}

export async function getIssueBasics(props: IssueBasicsProps) {
  const { year, month, slug } = props
  const issueData: Issues[] = await directus.request(
    readItems("issues", {
      fields: [
        "id",
        "title",
        "slug",
        "year",
        "month",
        "status",
        "issue_number",
        "special_issue",
        {
          cover_1: ["caption", "filename_disk", "width", "height", "type"],
        },
      ],
      filter: {
        _and: [
          {
            year: year && month ? { _eq: year } : undefined,
            month: year && month ? { _eq: month } : undefined,
            slug: slug ? { _eq: slug } : undefined,
            status: { _eq: "published" },
          },
        ],
      },
    }),
  )

  return issueData[0]
}

export async function getSectionsByIssueId(issueId: string) {
  const sections: Sections[] = directus.request(
    readItems("sections", {
      fields: ["id", "name", "slug"],
      filter: {
        _and: [
          {
            articles: {
              articles_slug: {
                issues: { issues_id: { id: { _eq: issueId } } },
              },
            },
          },
        ],
      },
    }),
  )
  return sections
}

export async function getSpecialArticlePages() {
  let articlePages: Articles[] = []
  let page = 1
  let isMore = true
  while (isMore) {
    const specialArticleDataAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles?fields[]=slug&fields[]=sections.sections_id.slug&fields[]=issues.issues_id.slug&fields[]=issues.issues_id.special_issue&fields[]=issues.issues_id.status&filter[status][_eq]=published&filter[slug][_nempty]=true&deep[issues][_filter][issues_id][special_issue][_eq]=true&page=${page}&limit=100&offset=${page * 100 - 100}`
    const res = await fetch(specialArticleDataAPI, { cache: "force-cache" })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    articlePages = articlePages.concat(data.data)
    isMore = data.data.length === 100 // assumes there is another page of records
    page++
  }
  return articlePages
}

export async function getArticlePages() {
  let articlePages: Articles[] = []
  let page = 1
  let isMore = true
  while (isMore) {
    const articleDataAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles?fields[]=slug&fields[]=sections.sections_id.slug&fields[]=issues.issues_id.year&fields[]=issues.issues_id.month&fields[]=issues.issues_id.slug&fields[]=issues.issues_id.special_issue&fields[]=issues.issues_id.status&filter[status][_eq]=published&filter[slug][_nempty]=true&deep[issues][_filter][issues_id][special_issue][_eq]=false&page=${page}&limit=100&offset=${page * 100 - 100}`
    const res = await fetch(articleDataAPI, { cache: "force-cache" })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    articlePages = articlePages.concat(data.data)
    isMore = data.data.length === 100 // assumes there is another page of records
    page++
  }
  return articlePages
}

export async function getArticle(slug: string) {
  const currentArticle: Articles = directus.request(
    readItem("articles", slug, {
      fields: [
        "slug",
        "byline_override",
        "title",
        "deck",
        "excerpt",
        "kicker",
        "featured",
        "sort",
        "body",
        "body_code",
        "body_text",
        "body_type",
        "header_type",
        "in_print",
        "status",
        "date_created",
        "date_updated",
        "title_tag",
        "user_updated",
        "date_updated",
        "hide_bylines",
        "hide_bylines_downstream",
        "tags",
        "endnote",
        {
          featured_image: ["id", "caption", "filename_disk", "width", "height", "type"],
        },
        {
          slideshow_image: ["id", "caption", "filename_disk", "width", "height", "type"],
        },
        {
          promo_banner: ["id", "caption", "filename_disk", "width", "height", "type"],
        },
        {
          promo_thumb: ["id", "caption", "filename_disk", "width", "height", "type"],
        },
        {
          contributors: [
            {
              contributors_id: ["first_name", "last_name", "slug", "bio"],
            },
          ],
        },
        {
          issues: [
            {
              issues_id: ["title", "slug"],
            },
          ],
        },
        {
          sections: [
            {
              sections_id: ["slug", "name"],
            },
          ],
        },
        {
          images: [
            {
              directus_files_id: ["id", "caption", "filename_disk", "width", "height", "type", "shortcode_key"],
            },
          ],
        },
      ],
      filter: {
        _and: [
          {
            status: { _eq: "published" },
          },
        ],
      },
    }),
  )

  return currentArticle
}

export async function getAds() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`
  const day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`
  const formattedDate = `${year}-${month}-${day}`

  const ads: Ads[] = directus.request(
    readItems("ads", {
      fields: [
        "ad_type",
        "ad_url",
        "start_date",
        "end_date",
        "status",
        "sort",
        "title",
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
            status: { _in: ["published"] },
            start_date: {
              _lte: formattedDate,
            },
            end_date: {
              _gte: formattedDate,
            },
            ad_url: { _nnull: true },
          },
        ],
      },
    }),
  )
  return ads
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
}
interface PermalinkProps {
  type: PageType
  year?: number
  month?: number
  section?: string
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
    default:
      return `${process.env.NEXT_PUBLIC_BASE_URL}/`
  }
}

export async function getListFiles() {
  const result = await directus.request(
    readFiles({
      query: {
        filter: {
          filename_download: {
            _eq: "walkingstick-kay.jpg",
          },
        },
      },
    }),
  )
  return result
}

export async function getPreset() {
  const result = await directus.request(
    readPreset("11", {
      fields: ["*.*"],
    }),
  )
  return result
}

export async function getPreviewPassword() {
  const settings = await directus.request(
    readSingleton("global_settings", {
      fields: ["preview_password"],
    }),
  )

  return settings.preview_password
}

export async function getRailIssueApi(year: string, month: string) {
  // get the data from this API https://brooklynrail.org/2024/04/api
  const api = `https://brooklynrail.org/${year}/${month}/api`
  const response = await fetch(api)
  const data = await response.json()

  return data
}

export async function getContributor(slug: string) {
  const data: Contributors[] = await directus.request(
    readItems("contributors", {
      fields: [
        "id",
        "first_name",
        "last_name",
        "slug",
        "bio",
        "status",
        "old_id",
        "date_updated",
        "date_created",
        {
          articles: [
            {
              articles_slug: [
                "status",
                "title",
                "slug",
                "excerpt",
                "kicker",
                {
                  featured_image: ["id", "caption", "filename_disk", "width", "height"],
                },
                {
                  issues: [
                    {
                      issues_id: ["slug", "year", "month", "special_issue"],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      sections_id: ["slug", "name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      filter: {
        slug: { _eq: slug },
        articles: { _gt: 0 }, // only get contributors with articles
        status: { _eq: "published" },
      },
    }),
  )
  return data
}

export async function getAllContributors() {
  let contributorPages: Contributors[] = []
  let page = 1
  let isMore = true
  while (isMore) {
    const contributorsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors?fields[]=slug&fields[]=first_name&fields[]=last_name&fields[]=articles&sort=sort,first_name&filter[status][_eq]=published&filter[articles][_gt]=0&page=${page}&limit=100&offset=${page * 100 - 100}`
    const res = await fetch(contributorsAPI, { cache: "force-cache" })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    contributorPages = contributorPages.concat(data.data)
    isMore = data.data.length === 100 // assumes there is another page of records
    page++
  }

  return contributorPages
}
