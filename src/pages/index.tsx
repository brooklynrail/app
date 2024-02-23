import directus from "../../lib/directus"
import { readItems, readItem } from "@directus/sdk"
import Homepage from "@/components/homepage"
import { Ads, Articles, Issues, Sections } from "../../lib/types"

export interface HomepageProps {
  allIssues: Array<Issues>
  currentIssue: Issues
  dateSlug: string
  currentSections: Array<Sections>
  currentArticles: Array<Articles>
  ads: Array<Ads>
}

function HomepageController(props: HomepageProps) {
  return <Homepage {...props} />
}

export default HomepageController

export async function getStaticProps() {
  const allIssues = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "title", "slug"],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
    }),
  )

  // Get the most recent published issue
  const currentIssueData = await directus.request(
    readItems("issues", {
      fields: [
        "*.*",
        "articles.articles_slug.title",
        "articles.articles_slug.slug",
        "articles.articles_slug.featured",
        "articles.articles_slug.excerpt",
        "articles.articles_slug.sections",
        "articles.articles_slug.sort",
        "articles.articles_slug.promo_thumb.*",
        "articles.articles_slug.promo_banner.*",
        "articles.articles_slug.contributors.contributors_id.first_name",
        "articles.articles_slug.contributors.contributors_id.last_name",
        "articles.articles_slug.contributors.contributors_id.slug",
        "articles.articles_slug.sections.sections_id.slug",
        "articles.articles_slug.sections.sections_id.name",
      ],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
      limit: 1, // Limits the result to only the first (most recent) published issue
    }),
  )

  // Get the sections for the current issue
  const currentSections = await directus.request(
    readItems("sections", {
      fields: ["name", "slug", "articles.articles_slug.issues.issues_id.id"],
      filter: {
        _and: [
          {
            articles: {
              articles_slug: {
                issues: { issues_id: { _eq: currentIssueData[0].id } },
              },
            },
          },
        ],
      },
    }),
  )

  // Filter the articles within each section to only include those that are in the current issue
  currentSections.map((section: any) => {
    const filteredArticles = section.articles.filter(
      (article: any) =>
        article.articles_slug && article.articles_slug.issues[0].issues_id.id === currentIssueData[0].id,
    )
    return { ...section, articles: filteredArticles }
  })

  // Sort the articles within each section by their `sort` order
  // Note: the `sort` field is nested under `articles_slug`
  currentSections.forEach((section: any) => {
    section.articles.sort((a: any, b: any) => a.articles_slug.sort - b.articles_slug.sort)
  })

  // Get the published Ads
  const currentArticles = await directus.request(
    readItems("articles", {
      fields: [
        "title",
        "slug",
        "excerpt",
        "promo_thumb.*",
        "promo_banner.*",
        "featured",
        "sort",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
        "sections.sections_id.slug",
        "sections.sections_id.name",
      ],
      filter: {
        _and: [{ issues: { issues_id: { _eq: currentIssueData[0].id } } }],
      },
      limit: -1,
    }),
  )

  // Get the published Ads
  const ads = await directus.request(
    readItems("ads", {
      fields: ["*.*"],
      filter: {
        _and: [{ status: { _eq: "published" }, start_date: { _gte: "2021-01-01" }, ad_url: { _nnull: true } }],
      },
    }),
  )

  // console.log("currentSections", currentSections)
  // console.log("currentIssue", currentIssue)
  // console.log("inConversation", inConversation)
  // console.log("allIssues", allIssues)
  // console.log("ads", ads)
  // console.log("===============")

  const currentIssue = currentIssueData[0]
  const dateSlug = `${currentIssue.year}/${currentIssue.month}`

  return {
    props: {
      allIssues,
      dateSlug,
      currentIssue,
      currentSections,
      currentArticles,
      ads,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
