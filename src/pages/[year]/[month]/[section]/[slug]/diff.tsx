import directus from "../../../../../../lib/directus"
import { readItems, readItem } from "@directus/sdk"
import ArticleDiff from "@/components/article/articleDiff"

function ArticleController(props: any) {
  return <ArticleDiff {...props} />
}

export default ArticleController

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
  const slug: string | number = params.slug
  const year: number = params.year
  const month: number = params.month

  const sectionsData = await directus.request(
    readItems("sections", {
      fields: ["name", "id", "slug"],
    }),
  )

  const issuesData = await directus.request(
    readItems("issues", {
      fields: [
        "*.*", // Selects all fields from the issues
        "images.thumbnails.*", // Selects all thumbnail images
        "articles.articles_slug.title", // Selects the title of each article
        "articles.articles_slug.slug", // Selects the slug of each article
        "articles.articles_slug.contributors.contributors_id.first_name",
        "articles.articles_slug.contributors.contributors_id.last_name",
        "articles.articles_slug.sections.sections_id.name", // Selects the section for each article
        "articles.articles_slug.sections.sections_id.id", // Selects the section Id
        "articles.articles_slug.sections.sections_id.slug", // Selects the section slug
      ],
      filter: {
        _and: [{ year: { _eq: year } }, { month: { _eq: month } }],
      },
    }),
  )

  const articleData = await directus.request(
    readItem("articles", slug, {
      fields: [
        "*.*",
        "images.directus_files_id.*",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
        "contributors.contributors_id.bio",
        "sections.sections_id.slug", // Selects the section Id
        "sections.sections_id.name", // Selects the section Id
      ],
    }),
  )

  const article = articleData
  const issues = issuesData
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
      fields: ["slug", "sections.sections_id.slug", "issues.issues_id.year", "issues.issues_id.month"],
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
