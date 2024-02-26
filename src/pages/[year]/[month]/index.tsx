import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import { HomepageProps } from "@/pages"
import Homepage from "@/components/homepage"

function Issue(props: HomepageProps) {
  return <Homepage {...props} />
}

export default Issue

export async function getStaticProps({ params }: any) {
  const year = params.year
  const month = params.month

  const allIssues = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "title", "slug"],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
    }),
  )

  const issueData = await directus.request(
    readItems("issues", {
      fields: ["*.*"],
      filter: { _and: [{ year: { _eq: year } }, { month: { _eq: month } }, { status: { _eq: "published" } }] },
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
                issues: { issues_id: { _eq: issueData[0].id } },
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
      (article: any) => article.articles_slug && article.articles_slug.issues[0].issues_id.id === issueData[0].id,
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
        _and: [{ issues: { issues_id: { _eq: issueData[0].id } } }],
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

  // Get only the articles from `currentArticles` that have a `slideshow_image`
  const currentSlides = currentArticles.filter((article) => {
    return article.slideshow_image
  })

  const currentIssue = issueData[0]
  const dateSlug = `${currentIssue.year}/${currentIssue.month}`

  return {
    props: {
      allIssues,
      currentIssue,
      currentSections,
      currentArticles,
      currentSlides,
      ads,
      dateSlug,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const issues = await directus.request(
    readItems("issues", {
      fields: ["year", "month"],
    }),
  )

  const paths = issues.map((issue) => ({
    params: {
      year: String(issue.year),
      month: String(issue.month).padStart(2, "0"), // Adds leading zero to single-digit months
    },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
