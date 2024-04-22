import Article from "../../../../../components/article"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"
import Error from "next/error"
import {
  PageType,
  getArticle,
  getArticlePages,
  getIssueBasics,
  getOGImage,
  getPermalink,
} from "../../../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../../../lib/types"
import { GetStaticPropsContext } from "next"

export interface ArticleProps {
  articleData: Articles
  issueBasics: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}

function ArticleController(props: ArticleProps) {
  if (props.errorCode && props.errorMessage) {
    return <Error statusCode={props.errorCode} title={props.errorMessage} />
  }
  const { articleData, permalink } = props
  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag } = articleData
  const section = props.articleData.sections[0].sections_id
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(excerpt).result}`
  const ogimageprops = { ogimage: featured_image, title }
  const ogimages = getOGImage(ogimageprops)

  const authors = contributors.map((contributor: any) => {
    const contribPermalink = getPermalink({ type: PageType.Contributor, slug: contributor.contributors_id.slug })
    return contribPermalink
  })

  return (
    <>
      <NextSeo
        title={`${ogtitle} | The Brooklyn Rail`}
        description={ogdescription}
        canonical={`${permalink}`}
        openGraph={{
          title: `${ogtitle} | The Brooklyn Rail`,
          description: ogdescription,
          url: permalink,
          images: ogimages,
          type: `article`,
          article: {
            publishedTime: date_created,
            modifiedTime: date_updated,
            section: section.name,
            authors: authors,
          },
        }}
      />
      <Article {...props} />
    </>
  )
}

export default ArticleController

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || !params.year || !params.month || !params.section || !params.slug) {
    return { props: { errorCode: 400, errorMessage: "This section does not exist" } }
  }

  const slug: string = params.slug.toString()
  const section: string = params.section.toString()
  const year = parseInt(params.year.toString(), 10)
  const month = parseInt(params.month.toString(), 10)

  const issueBasics = await getIssueBasics({ year, month, slug: undefined })
  const articleData = await getArticle(slug)

  if (!articleData) {
    return { props: { errorCode: 404, errorMessage: "Article not found" } }
  }

  const currentSection = articleData.sections && articleData.sections[0].sections_id

  const errorCode = !currentSection || (currentSection.slug != section && "Section not found")
  if (errorCode) {
    return { props: { errorCode: 404, errorMessage: errorCode } }
  }

  const permalink = getPermalink({
    year: issueBasics.year,
    month: issueBasics.month,
    section: currentSection.slug,
    slug: articleData.slug,
    type: PageType.Article,
  })

  return {
    props: {
      articleData,
      issueBasics,
      currentSection,
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
  try {
    const articlePages = await getArticlePages()

    const paths = articlePages.map((article: Articles) => {
      const month = article.issues[0].issues_id.month
      return {
        params: {
          year: article.issues && article.issues[0].issues_id.year.toString(),
          month: month < 10 ? `0${month.toString()}` : month.toString(),
          section: article.sections && article.sections[0].sections_id.slug.toString(),
          slug: article.slug,
        },
      }
    })

    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: "blocking" }
  } catch (error) {
    console.error("Error fetching year/month/section/slug paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
