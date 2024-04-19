import directus from "../../../../../../lib/directus"
import { readItems } from "@directus/sdk"
import Article from "../../../../../components/article"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"
import Error from "next/error"
import {
  PageType,
  getArticle,
  getArticles,
  getIssueData,
  getOGImage,
  getPermalink,
  getSpecialArticlePages,
} from "../../../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../../../lib/types"

export interface ArticleProps {
  article: Articles
  currentIssue: Issues
  currentArticles: Array<Articles>
  sections: Array<Sections>
  currentSection: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}

interface SectionProps {
  currentSection: Sections
}

function ArticleController(props: ArticleProps & SectionProps) {
  if (props.errorCode && props.errorMessage) {
    return <Error statusCode={props.errorCode} title={props.errorMessage} />
  }
  const { article, permalink } = props
  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag } = article
  const section = props.article.sections[0].sections_id
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
export async function getStaticProps({ params }: any) {
  const slug: string = params.slug
  const issueSlug: string = params.issueSlug
  const section: string = params.section

  const sections = await directus.request(
    readItems("sections", {
      fields: ["name", "id", "slug"],
    }),
  )

  const issueData = await getIssueData({ year: undefined, month: undefined, slug: issueSlug })
  const articleData = await getArticle(slug)

  const currentArticles = await getArticles(issueData.id)

  const article = articleData
  const currentIssue = issueData
  const currentSection = articleData.sections && articleData.sections[0].sections_id

  const errorCode = !currentSection || (currentSection.slug != section && "Section not found")
  if (errorCode) {
    return { props: { errorCode: 404, errorMessage: errorCode } }
  }

  const permalink = getPermalink({
    year: currentIssue.year,
    month: currentIssue.month,
    issueSlug: currentIssue.slug,
    section: currentSection.slug,
    slug: article.slug,
    type: PageType.SpecialIssueArticle,
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
    revalidate: 60, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  try {
    const specialArticlePages = await getSpecialArticlePages()

    const paths = specialArticlePages.map((article: Articles) => {
      return {
        params: {
          issueSlug: article.issues && article.issues[0].issues_id.slug.toString(),
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
    console.error("Error fetching special/section/slug paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
