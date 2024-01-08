import directus from "../../../../../lib/directus"
import { readItems } from "@directus/sdk"
import Article from "../../../../components/article"

function ArticleController(props: any) {
  return <Article {...props} />
}

export default ArticleController

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
  const slug = params.slug
  const year = params.year
  const month = params.month

  const sectionsData = await directus.request(
    readItems("sections", {
      fields: ["name", "id"],
    }),
  )

  const issuesData = await directus.request(
    readItems("issues", {
      fields: [
        "*.*", // Selects all fields from the issues
        "images.thumbnails.*", // Selects all thumbnail images
        "articles.articles_id.title", // Selects the title of each article
        "articles.articles_id.slug", // Selects the slug of each article
        "articles.articles_id.contributors.contributors_id.first_name",
        "articles.articles_id.contributors.contributors_id.last_name",
        "articles.articles_id.sections.sections_id.name", // Selects the section for each article
        "articles.articles_id.sections.sections_id.id", // Selects the section Id
      ],
      filter: {
        _and: [{ year: { _eq: year } }, { month: { _eq: month } }],
      },
    }),
  )

  const articlesData = await directus.request(
    readItems("articles", {
      fields: [
        "*.*",
        "images.thumbnails.*",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
        "contributors.contributors_id.bio",
      ],
      filter: {
        _and: [
          { slug: { _eq: slug } },
          {
            issues: {
              id: { _in: [3] },
            },
          },
        ],
      },
    }),
  )

  const article = articlesData[0]
  const issues = issuesData[0]
  const sections = sectionsData

  return {
    props: {
      article,
      issues,
      sections,
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
  const articles = await directus.request(
    readItems("articles", {
      fields: ["title", "slug", "sections.sections_id.slug", "issues.issues_id.year", "issues.issues_id.month"],
    }),
  )

  const paths = articles.map((article) => ({
    params: {
      year: String(article.issues[0].issues_id.year),
      month: String(article.issues[0].issues_id.month),
      section: String(article.sections[0].sections_id.slug),
      slug: article.slug,
    },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
