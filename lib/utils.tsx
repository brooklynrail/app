/* eslint max-lines: 0 */
import directus from "./directus"
import { readItem, readItems, readSingleton } from "@directus/sdk"
import {
  Ads,
  Articles,
  Contributors,
  DirectusFiles,
  Events,
  GlobalSettings,
  GlobalSettingsNavigation,
  Issues,
  Pages,
  People,
  Redirects,
  Sections,
  Tributes,
} from "./types"
import { stripHtml } from "string-strip-html"
import { cache } from "react"

// Used in
// - Issue Select dropdown
// - Archive page
export async function getAllIssues() {
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
}

export async function getIssues() {
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
}

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

export const getPageData = cache(async (slug: string) => {
  try {
    const pageData = await directus.request(
      readItems("pages", {
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
        filter: { status: { _eq: "published" }, slug: { _eq: slug } },
      }),
    )

    return pageData[0] as Pages
  } catch (error) {
    console.error("Error fetching page data:", error)
    return null
  }
})

export const getAllPages = cache(async () => {
  try {
    const pagesData = await directus.request(
      readItems("pages", {
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
        filter: { status: { _eq: "published" } },
      }),
    )

    return pagesData as Pages[]
  } catch (error) {
    console.error("Error fetching all pages data:", error)
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
export async function getIssueData(props: IssueDataProps) {
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
    `&fields[]=articles.issue.id` +
    `&fields[]=articles.issue.title` +
    `&fields[]=articles.issue.year` +
    `&fields[]=articles.issue.month` +
    `&fields[]=articles.issue.slug` +
    `&fields[]=articles.section.id` +
    `&fields[]=articles.section.name` +
    `&fields[]=articles.section.description` +
    `&fields[]=articles.section.slug` +
    `&fields[]=articles.tribute.slug` +
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
}

interface SectionDataProps {
  slug: string
}

export const getSectionData = cache(async (props: SectionDataProps) => {
  const { slug } = props

  try {
    const sections = await directus.request(
      readItems("sections", {
        fields: [
          "id",
          "name",
          "slug",
          "old_id",
          {
            articles: [
              "slug",
              "title",
              "excerpt",
              "sort",
              "status",
              {
                section: ["name", "slug"],
              },
              {
                issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"],
              },
              {
                contributors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
              },
              {
                featured_image: ["id", "width", "height", "filename_disk", "caption"],
              },
            ],
          },
        ],
        filter: {
          slug: { _eq: slug },
        },
      }),
    )

    return sections[0] as Sections
  } catch (error) {
    console.error("Error fetching section data:", error)
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

export async function getArticlePages() {
  try {
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
        `&sort[]=-date_updated` +
        `&page=${page}` +
        `&limit=100` +
        `&offset=${page * 100 - 100}`
      const res = await fetch(articleDataAPI)
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
  } catch (error) {
    console.error("Error in getArticlePages", error)
    return null
  }
}

export async function getPreviewArticle(id: string) {
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
          { contributors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }] },
          { featured_image: ["id", "width", "height", "filename_disk", "caption"] },
          { slideshow_image: ["id", "width", "height", "filename_disk", "caption"] },
          { promo_banner: ["id", "width", "height", "filename_disk", "caption"] },
          { promo_thumb: ["id", "width", "height", "filename_disk", "caption"] },
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
}

export async function getPreviewIssue(year: number, month: number) {
  try {
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
              { contributors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }] },
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
  } catch (error) {
    console.error("error in getPreviewIssue", error)
    return null
  }
}

export async function getArticle(slug: string, status?: string) {
  const articleAPI =
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
    `&fields[]=isbn` +
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
    `&fields[]=issue.year` +
    `&fields[]=issue.month` +
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
    `&fields[]=tribute` +
    `&fields[]=tribute.title` +
    `&fields[]=tribute.slug` +
    `&fields[]=hide_title` +
    `&filter[slug][_eq]=${slug}` +
    `&filter[status][_eq]=${status}`

  try {
    const res = await fetch(articleAPI)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error(`Failed to fetch Article data: ${res.statusText}`)
      return null
    }

    const { data } = await res.json()

    return data[0] as Articles
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getEvent = cache(async (slug: string) => {
  const events = await directus.request(
    readItems("events", {
      fields: ["*"],
      filter: {
        _and: [
          {
            slug: {
              _eq: slug,
            },
            status: {
              _in: ["published"],
            },
          },
        ],
      },
    }),
  )
  return events as Events[]
})

export const getRedirect = cache(async (slug: string) => {
  try {
    const redirect = await directus.request(
      readItems("redirects", {
        fields: [
          "path",
          {
            articles: [
              "slug",
              "title",
              {
                issue: ["year", "month", "slug", "special_issue"],
              },
              {
                section: ["slug"],
              },
            ],
          },
        ],
        filter: {
          path: {
            _contains: slug,
          },
        },
      }),
    )
    return redirect[0] as Redirects
  } catch (error) {
    console.error("Error in getRedirect", error)
    return null
  }
})

export const getAds = cache(async () => {
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
})

interface OGImageProps {
  ogimage?: DirectusFiles
  title: string
}

export function getOGImage(props: OGImageProps) {
  const { ogimage, title } = props
  if (ogimage && ogimage.width && ogimage.height) {
    return [
      {
        url: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${ogimage.filename_disk}`,
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
  Event = "event",
  Tribute = "tribute",
  TributeArticle = "tribute_article",
  Home = "home",
  Contributor = "contributor",
  Page = "page",
  ChildPage = "child_page",
  Preview = "preview",
  SpecialIssue = "special_issue",
  SpecialIssueSection = "special_issue_section",
  SpecialIssueArticle = "special_issue_article",
  Archive = "archive",
  Search = "search",
}
interface PermalinkProps {
  type: PageType
  year?: number
  month?: number
  day?: number
  section?: string | Sections
  slug?: string
  issueSlug?: string
  tributeSlug?: string
}
export function getPermalink(props: PermalinkProps) {
  const { year, section, slug, issueSlug, type, tributeSlug } = props
  const month = props.month && props.month < 10 ? `0${props.month}` : props.month
  const day = props.day && props.day < 10 ? `0${props.day}` : props.day

  // Production URL: NEXT_PUBLIC_BASE_URL https://brooklynrail.org
  // Preview URL: NEXT_PUBLIC_BASE_URL https://preview.brooklynrail.org
  // Branch Previews: VERCEL_URL
  // Localhost: NEXT_PUBLIC_BASE_URL http://localhost:3000
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

  switch (type) {
    case PageType.Article:
      return `${baseURL}/${year}/${month}/${section}/${slug}/`
    case PageType.Section:
      return `${baseURL}/issues/${issueSlug}/${section}/`
    case PageType.Issue:
      return `${baseURL}/issues/${issueSlug}/`
    case PageType.Event:
      return `${baseURL}/event/${year}/${month}/${day}/${slug}/`
    case PageType.Tribute:
      return `${baseURL}/tribute/${tributeSlug}/`
    case PageType.TributeArticle:
      return `${baseURL}/tribute/${tributeSlug}/${slug}/`
    case PageType.Contributor:
      return `${baseURL}/contributor/${slug}/`
    case PageType.Page:
      return `${baseURL}/${slug}/`
    case PageType.ChildPage:
      return `${baseURL}/about/${slug}/`
    case PageType.Preview:
      return `${baseURL}/preview/${slug}/`
    case PageType.Archive:
      return `${baseURL}/archive/`
    case PageType.Search:
      return `${baseURL}/search/`
    default:
      return `${baseURL}/`
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
    // `&fields[]=articles` +
    `&fields[]=articles.articles_contributors_id.slug` +
    `&fields[]=articles.articles_contributors_id.title` +
    `&fields[]=articles.articles_contributors_id.status` +
    `&fields[]=articles.articles_contributors_id.excerpt` +
    `&fields[]=articles.articles_contributors_id.kicker` +
    `&fields[]=articles.articles_contributors_id.featured` +
    `&fields[]=articles.articles_contributors_id.featured_image.id` +
    `&fields[]=articles.articles_contributors_id.featured_image.caption` +
    `&fields[]=articles.articles_contributors_id.featured_image.filename_disk` +
    `&fields[]=articles.articles_contributors_id.featured_image.width` +
    `&fields[]=articles.articles_contributors_id.featured_image.height` +
    `&fields[]=articles.articles_contributors_id.featured_image.type` +
    `&fields[]=articles.articles_contributors_id.issue.title` +
    `&fields[]=articles.articles_contributors_id.issue.year` +
    `&fields[]=articles.articles_contributors_id.issue.month` +
    `&fields[]=articles.articles_contributors_id.issue.slug` +
    `&fields[]=articles.articles_contributors_id.issue.special_issue` +
    `&fields[]=articles.articles_contributors_id.section.slug` +
    `&fields[]=articles.articles_contributors_id.section.name` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.id` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.first_name` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.last_name` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.old_id` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.slug` +
    `&fields[]=articles.articles_contributors_id.contributors.contributors_id.bio` +
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

export const getAllContributors = cache(async () => {
  try {
    let contributorPages: Contributors[] = []
    let page = 1
    let isMore = true
    while (isMore) {
      const contributorsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contributors?fields[]=slug&fields[]=first_name&fields[]=last_name&fields[]=articles&sort=sort,first_name&filter[status][_eq]=published&filter[articles][_nnull]=true&page=${page}&limit=100&offset=${page * 100 - 100}`
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

interface TributesParams {
  thisIssueData: Issues
}

export const getTributes = cache(async (props: TributesParams) => {
  const { thisIssueData } = props

  // filter out the articles where tribute is not null
  const tributeArticles = thisIssueData.articles.filter((article) => article.tribute !== null)
  // make an array of the tribute slugs in the tributeArticles and remove all duplicates
  const currentTributes: Array<string> = Array.from(
    new Set(tributeArticles.map((article: Articles) => article.tribute?.slug).filter((slug): slug is string => !!slug)),
  )

  const tributes = await directus.request(
    readItems("tributes", {
      fields: [
        "id",
        "title",
        "slug",
        "excerpt",
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
            "status",
            {
              tribute: ["slug"],
            },
            "hide_title",
            {
              contributors: [{ contributors_id: ["id", "slug", "first_name", "last_name"] }],
            },
          ],
        },
      ],
      filter: {
        slug: {
          _in: currentTributes.length > 0 ? currentTributes : ["none"],
        },
      },
    }),
  )
  return tributes as Tributes[]
})

interface TributeDataParams {
  tributeSlug: string
  slug: string
}

export const getTributeData = cache(async ({ tributeSlug, slug }: TributeDataParams) => {
  const tribute = await directus.request(
    readItems("tributes", {
      fields: [
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
        slug: {
          _eq: tributeSlug,
        },
      },
    }),
  )
  return tribute[0] as Tributes
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
