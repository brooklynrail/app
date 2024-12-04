/* eslint max-lines: 0 */
import { readItems, readSingleton } from "@directus/sdk"
import { cache } from "react"
import { stripHtml } from "string-strip-html"
import directus from "./directus"
import {
  Articles,
  Contributors,
  DirectusFiles,
  Events,
  GlobalSettings,
  Issues,
  People,
  Sections,
  Tributes,
} from "./types"

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
}

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
    `&fields[]=section.featured` +
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

interface OGImageProps {
  ogimage?: DirectusFiles
  title: string
}

export const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

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
      url: share_card,
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
  SuperSection = "super_section",
  Issue = "issue",
  Event = "event",
  Tribute = "tribute",
  TributeArticle = "tribute_article",
  Home = "home",
  Contributor = "contributor",
  Person = "person",
  People = "people",
  Events = "events",
  Page = "page",
  ChildPage = "child_page",
  PreviewArticle = "preview_article",
  PreviewEvent = "preview_event",
  PreviewIssue = "preview_issue",
  PreviewTribute = "preview_tribute",
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
  articleId?: string
  eventId?: string
  personSlug?: string
  issueId?: string
  tributeId?: string
  sectionSlug?: string
  eventYear?: number
  eventMonth?: number
  eventDay?: number
}

export function getPermalink(props: PermalinkProps) {
  const {
    year,
    section,
    slug,
    issueSlug,
    type,
    tributeSlug,
    sectionSlug,
    articleId,
    eventId,
    personSlug,
    issueId,
    tributeId,
    eventYear,
  } = props
  const month = props.month && props.month < 10 ? `0${props.month}` : props.month
  const eventMonth = props.eventMonth && props.eventMonth < 10 ? `0${props.eventMonth}` : props.eventMonth
  const eventDay = props.eventDay && props.eventDay < 10 ? `0${props.eventDay}` : props.eventDay

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
    case PageType.SuperSection:
      return `${baseURL}/section/${sectionSlug}/`
    case PageType.Section:
      return `${baseURL}/issues/${issueSlug}/${section}/`
    case PageType.Issue:
      return `${baseURL}/issues/${issueSlug}/`
    case PageType.Event:
      return `${baseURL}/event/${eventYear}/${eventMonth}/${eventDay}/${slug}/`
    case PageType.Events:
      return `${baseURL}/events/`
    case PageType.Tribute:
      return `${baseURL}/tribute/${tributeSlug}/`
    case PageType.TributeArticle:
      return `${baseURL}/tribute/${tributeSlug}/${slug}/`
    case PageType.Contributor:
      return `${baseURL}/contributor/${slug}/`
    case PageType.Person:
      return `${baseURL}/people/${personSlug}/`
    case PageType.People:
      return `${baseURL}/people/`
    case PageType.Page:
      return `${baseURL}/${slug}/`
    case PageType.ChildPage:
      return `${baseURL}/about/${slug}/`
    case PageType.PreviewArticle:
      return `${baseURL}/preview/article/${articleId}/`
    case PageType.PreviewEvent:
      return `${baseURL}/preview/event/${eventId}/`
    case PageType.PreviewIssue:
      return `${baseURL}/preview/issue/${issueId}/`
    case PageType.PreviewTribute:
      return `${baseURL}/preview/tribute/${tributeId}/`
    case PageType.Archive:
      return `${baseURL}/archive/`
    case PageType.Search:
      return `${baseURL}/search/`
    default:
      return `${baseURL}/`
  }
}

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
        slug: {
          _eq: tributeSlug,
        },
      },
    }),
  )
  return tribute[0] as Tributes
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
