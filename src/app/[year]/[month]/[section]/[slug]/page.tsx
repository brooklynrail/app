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

export const dynamicParams = true

export interface ArticleProps {
  articleData: Articles
  issueBasics: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function generateStaticParams() {
  const articlePagesData = await getArticlePages()

  const results = []
  for (const article of articlePagesData) {
    if (article.issues && article.issues.length > 0) {
      const month = article.issues[0].issues_id.month
      const result = {
        year: article.issues[0].issues_id.year.toString(),
        month: month < 10 ? `0${month.toString()}` : month.toString(),
        section: article.sections[0].sections_id.slug.toString(),
        slug: article.slug,
      }
      results.push(result)

      // Include a delay here - adjust time based on your requirements
      await delay(1000) // 1 second delay between processing each article
    }
  }

  return results
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
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.props.articleData || !data.props.currentSection || !data.props.permalink) {
    return {}
  }

  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag, sections } =
    data.props.articleData
  const section = sections[0].sections_id
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
