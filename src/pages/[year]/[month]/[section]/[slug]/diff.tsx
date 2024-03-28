import directus from "../../../../../../lib/directus"
import { readItems } from "@directus/sdk"
import ArticleDiff from "@/components/article/articleDiff"
import { PageType, getArticle, getArticles, getIssueData, getPermalink } from "../../../../../../lib/utils"
import { Sections } from "../../../../../../lib/types"

function ArticleController(props: any) {
  return <ArticleDiff {...props} />
}

export default ArticleController

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
  const slug: string = params.slug
  const year: number = params.year
  const month: number = params.month
  const section: string = params.section

  const sectionsData = await directus.request(
    readItems("sections", {
      fields: ["name", "id", "slug"],
    }),
  )

  const issueData = await getIssueData(year, month)
  const articleData = await getArticle(slug)
  const currentArticles = await getArticles(issueData[0].id)

  const article = articleData
  const currentIssue = issueData[0]
  const sections = sectionsData
  const currentSection: Sections = article.sections && article.sections[0].sections_id

  const errorCode = currentSection.slug != section && "Section not found"
  if (errorCode) {
    return { props: { errorCode: 404, errorMessage: errorCode } }
  }

  const permalink = getPermalink({
    year: currentIssue.year,
    month: currentIssue.month,
    section: currentSection.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return {
    props: {
      article,
      currentIssue,
      currentArticles,
      currentSection,
      sections,
      permalink,
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
    }),
  )

  const paths = articles.map((article) => {
    const month = article.issues && article.issues[0].issues_id.month
    return {
      params: {
        year: article.issues && article.issues[0].issues_id.year.toString(),
        month: month < 10 ? `0${month}` : month,
        section: article.sections && article.sections[0].sections_id.slug.toString(),
        slug: article.slug,
      },
    }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
