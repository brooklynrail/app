import { stripHtml } from "string-strip-html"
import {
  PageType,
  getArticle,
  getArticlePages,
  getIssueBasics,
  getOGImage,
  getPermalink,
} from "../../../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../../../lib/types"
import { Metadata } from "next"
import Article from "@/app/components/article"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// export const dynamicParams = true
export interface ArticleProps {
  articleData: Articles
  issueBasics: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export async function generateStaticParams() {
  const articlePages = await getArticlePages()

  return articlePages.map((article: Articles) => {
    // NOTE: This is returning articles with no issues.
    // These are the articles that are part of the "Special Issues"
    // This might be a BUG, or might be how the REST API is set up.
    if (!article.issue) {
      return
    }
    const month = article.issue.month
    return {
      year: article.issue.year.toString(),
      month: month < 10 ? `0${month.toString()}` : month.toString(),
      section: article.section.slug,
      slug: article.slug,
    }
  })
}

interface ArticleParams {
  year: string
  month: string
  section: string
  slug: string
}

async function getData({ params }: { params: ArticleParams }) {
  const year = Number(params.year)
  const month = Number(params.month)
  const slug: string = params.slug.toString()
  const section: string = params.section.toString()

  const issueBasics = await getIssueBasics({ year, month }) // A limited set of data for the issue
  const articleData = await getArticle(slug, "published")

  if (!articleData) {
    return { props: { errorCode: 404, errorMessage: "Article not found" } }
  }

  const currentSection = articleData.section

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
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.props.articleData || !data.props.currentSection || !data.props.permalink) {
    return {}
  }

  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag, section } =
    data.props.articleData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(excerpt).result}`
  const ogimageprops = { ogimage: featured_image, title }
  const ogimages = getOGImage(ogimageprops)

  const authors = contributors.map((contributor: any) => {
    const contribPermalink = getPermalink({ type: PageType.Contributor, slug: contributor.contributors_id.slug })
    return contribPermalink
  })
  return {
    title: `${ogtitle} | The Brooklyn Rail`,
    description: ogdescription,
    alternates: {
      canonical: `${data.props.permalink}`,
    },
    openGraph: {
      title: `${ogtitle} | The Brooklyn Rail`,
      description: ogdescription,
      url: data.props.permalink,
      images: ogimages,
      type: `article`,
      publishedTime: date_created,
      modifiedTime: date_updated,
      section: section.name,
      authors: authors,
    },
  }
}

export default async function ArticlePageController({ params }: { params: ArticleParams }) {
  const data = await getData({ params })

  if (!data.props.articleData || !data.props.currentSection) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }
  return <Article {...data.props} />
}
