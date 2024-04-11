/* eslint max-lines: 0 */
// @ts-nocheck
/* eslint max-lines: 0 */
import directus from "./directus"
import { readItem, readItems, readSingleton, readFiles, readPreset } from "@directus/sdk"
import { Articles, DirectusFiles, Issues, Sections } from "./types"
import { stripHtml } from "string-strip-html"

export async function getIssues() {
  const issues: Issues[] = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "id", "slug", "title"],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
    }),
  )
  return issues
}

export async function getCurrentIssue() {
  // get the current issue from the global settings
  const settings = await directus.request(
    readSingleton("global_settings", {
      fields: [
        {
          current_issue: ["id", "title", "slug", "year", "month", "status"],
        },
      ],
    }),
  )
  // get the current issue data from the issues collection
  const currentIssueData: Issues = await getIssueData(settings.current_issue.year, settings.current_issue.month)
  // return the first issue in the array
  return currentIssueData
}

// Explore making this get IssueData by ID
// NOTE: we need to use `readItems` instead of `readItem` because we are querying the `issues` collection
// instead of a single issue by ID
// This returns a single issue object
export async function getIssueData(year: number, month: number) {
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
                "slug",
                "title",
                "excerpt",
                "kicker",
                "featured",
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
                      sections_id: ["slug", "name", "id", "old_id"],
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
          { year: year && month ? { _eq: year } : undefined },
          { month: month && year ? { _eq: month } : undefined },
          { status: { _eq: "published" } },
        ],
      },
      limit: -1,
      deep: {
        articles: {
          _limit: -1,
        },
      },
    }),
  )
  return issueData[0]
}

export async function getSectionsByIssueId(issueId: number) {
  const sections: Sections[] = directus.request(
    readItems("sections", {
      fields: [
        "name",
        "slug",
        {
          articles: [
            {
              articles_slug: ["issues.issues_id.id"],
            },
          ],
        },
      ],
      filter: {
        _and: [
          {
            articles: {
              articles_slug: {
                issues: { issues_id: { _eq: issueId } },
              },
            },
          },
        ],
      },
    }),
  )
  return sections
}

export function getArticlePages() {
  const articlePages: Articles[] = directus.request(
    readItems("articles", {
      fields: [
        "slug",
        {
          sections: [
            {
              sections_id: ["slug"],
            },
          ],
        },
        {
          issues: [
            {
              issues_id: ["year", "month"],
            },
          ],
        },
      ],
      limit: -1,
    }),
  )
  return articlePages
}

export function getArticles(issueId: number, section?: string) {
  const currentArticles: Articles[] = directus.request(
    readItems("articles", {
      fields: [
        "title",
        "slug",
        "excerpt",
        "kicker",
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
        "featured",
        "sort",
        {
          contributors: [
            {
              contributors_id: ["first_name", "last_name", "slug"],
            },
          ],
        },
        {
          sections: [
            {
              sections_id: ["slug", "name", "id"],
            },
          ],
        },
      ],
      filter: {
        _and: [
          {
            issues: { issues_id: { _eq: issueId } },
            // section pages need to filter by section
            sections: section ? { sections_id: { slug: { _eq: section } } } : undefined,
          },
        ],
      },
      limit: -1,
    }),
  )
  return currentArticles
}

export function getArticle(slug: string) {
  const currentArticle = directus.request(
    readItem("articles", slug, {
      fields: [
        "slug",
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
    }),
  )
  return currentArticle
}

export function getAds() {
  // get todays date and format it like year-mo-day with leading zeros
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`
  const day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`
  const formattedDate = `${year}-${month}-${day}`

  const ads = directus.request(
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
  return ogimage !== undefined && ogimage !== null
    ? [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/${ogimage.filename_disk}`,
          width: ogimage.width,
          height: ogimage.height,
          alt: ogimage.caption ? stripHtml(ogimage.caption).result : `${stripHtml(title).result} - The Brooklyn Rail`,
          type: ogimage.type ? ogimage.type : "image/jpeg",
        },
      ]
    : [
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
}
interface PermalinkProps {
  type: PageType
  year?: number
  month?: number
  section?: string
  slug?: string
}
export function getPermalink(props: PermalinkProps) {
  const { year, section, slug, type } = props
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

export async function getRailIssueApi(year: number, month: number) {
  // get the data from this API https://brooklynrail.org/2024/04/api
  const api = `https://brooklynrail.org/${year}/${month}/api`
  console.log("api", api)
  const response = await fetch(api)
  const data = await response.json()

  return data
}
