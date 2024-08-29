import { stripHtml } from "string-strip-html"
import { PageType, getArticle, getOGImage, getPermalink, getSpecialIssueData } from "../../../../../../lib/utils"
import { Metadata } from "next"
import Article from "@/app/components/article"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 mins.
export const revalidate = 3600

export async function generateMetadata({ params }: { params: SpecialArticleParams }): Promise<Metadata> {
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
    title: `${ogtitle}`,
    description: ogdescription,
    alternates: {
      canonical: `${data.props.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
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

  const thisIssueData = await getSpecialIssueData({ slug: issueSlug }) // A limited set of data for the issue
  const articleData = await getArticle(slug, "published")

  if (!articleData || !thisIssueData) {
    return notFound()
  }

  const currentSection = articleData.section

  const permalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    issueSlug: thisIssueData.slug,
    section: currentSection.slug,
    slug: articleData.slug,
    type: PageType.SpecialIssueArticle,
  })

  return {
    props: {
      articleData,
      thisIssueData,
      currentSection,
      permalink,
    },
  }
}
