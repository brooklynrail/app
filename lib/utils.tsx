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

export async function getIssueData(year: number, month: number) {
  const issueData = await directus.request(
    readItems("issues", {
      fields: ["*.*"],
      filter: { _and: [{ year: { _eq: year } }, { month: { _eq: month } }, { status: { _eq: "published" } }] },
    }),
  )
  return issueData
}

export function getSectionsByIssueId(issueId: number) {
  const sections = directus.request(
    readItems("sections", {
      fields: ["name", "slug", "articles.articles_slug.issues.issues_id.id"],
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

export function getArticlesSection(issueId: number, section: string) {
  const currentArticles = directus.request(
    readItems("articles", {
      fields: [
        "title",
        "slug",
        "excerpt",
        "kicker",
        "promo_thumb.*",
        "promo_banner.*",
        "slideshow_image.*",
        "featured",
        "sort",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
        "sections.sections_id.slug",
        "sections.sections_id.name",
      ],
      filter: {
        _and: [
          {
            issues: { issues_id: { _eq: issueId } },
            sections: { sections_id: { slug: { _eq: section } } },
          },
        ],
      },
      limit: -1,
    }),
  )
  return currentArticles
}

export function getAds() {
  const ads = directus.request(
    readItems("ads", {
      fields: ["*.*"],
      filter: {
        _and: [{ status: { _eq: "published" }, start_date: { _gte: "2021-01-01" }, ad_url: { _nnull: true } }],
      },
    }),
  )
  return ads
}
