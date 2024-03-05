import directus from "./directus"
import { readItems } from "@directus/sdk"

export async function getIssues() {
  const issues = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "id"],
    }),
  )
  return issues
}

export async function getIssuesSelect() {
  const allIssues = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "title", "slug"],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
    }),
  )
  return allIssues
}

export async function getIssueData(year?: number, month?: number) {
  const issueData = await directus.request(
    readItems("issues", {
      fields: [
        "id",
        "title",
        "slug",
        "year",
        "month",
        "status",
        {
          cover_1: ["caption", "filename_disk", "width", "height"],
        },
        {
          cover_2: ["caption", "filename_disk", "width", "height"],
        },
        {
          cover_3: ["caption", "filename_disk", "width", "height"],
        },
        {
          cover_4: ["caption", "filename_disk", "width", "height"],
        },
        {
          cover_5: ["caption", "filename_disk", "width", "height"],
        },
        {
          cover_6: ["caption", "filename_disk", "width", "height"],
        },
      ],
      filter: {
        _and: [
          { year: year && month ? { _eq: year } : undefined },
          { month: month && year ? { _eq: month } : undefined },
          { status: { _eq: "published" } },
        ],
      },
    }),
  )
  return issueData
}

export function getSectionsByIssueId(issueId: number) {
  const sections = directus.request(
    readItems("sections", {
      // fields: ["name", "slug", "articles", "articles.articles_slug.issues.issues_id.id"],
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

export function getArticles(issueId: number, section?: string) {
  const currentArticles = directus.request(
    readItems("articles", {
      fields: [
        "title",
        "slug",
        "excerpt",
        "kicker",
        {
          promo_thumb: ["caption", "filename_disk", "width", "height"],
        },
        {
          promo_banner: ["caption", "filename_disk", "width", "height"],
        },
        {
          slideshow_image: ["caption", "filename_disk", "width", "height"],
        },
        {
          featured_image: ["caption", "filename_disk", "width", "height"],
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
              sections_id: ["slug", "name"],
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
            status: { _eq: "published" },
            start_date: { _lte: formattedDate },
            end_date: { _gte: formattedDate },
            ad_url: { _nnull: true },
          },
        ],
      },
    }),
  )
  return ads
}
