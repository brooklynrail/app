import { stripHtml } from "string-strip-html"
import {
  PageType,
  getArticle,
  getIssueBasics,
  getOGImage,
  getPermalink,
  getSpecialArticlePages,
} from "../../../../../../lib/utils"
import { Articles } from "../../../../../../lib/types"
import { Metadata } from "next"
import Article from "@/app/components/article"

export async function generateMetadata({ params }: { params: SpecialArticleParams }): Promise<Metadata> {
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

export default async function ArticlePage({ params }: { params: SpecialArticleParams }) {
  const data = await getData({ params })

  if (!data.props.issueBasics || !data.props.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <Article {...data.props} />
}

interface SpecialArticleParams {
  issueSlug: string
  section: string
  slug: string
}

async function getData({ params }: { params: SpecialArticleParams }) {
  const slug = String(params.slug)
  const issueSlug = String(params.issueSlug)
  const section = String(params.section)

  const issueBasics = await getIssueBasics({ year: undefined, month: undefined, slug: issueSlug })
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
    issueSlug: issueBasics.slug,
    section: currentSection.slug,
    slug: articleData.slug,
    type: PageType.SpecialIssueArticle,
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

export async function generateStaticParams() {
  const specialArticlePages = await getSpecialArticlePages()

  return specialArticlePages.map((article: Articles) => {
    return {
      issueSlug: article.issues && article.issues[0].issues_id.slug.toString(),
      section: article.sections && article.sections[0].sections_id.slug.toString(),
      slug: article.slug,
    }
  })
}
