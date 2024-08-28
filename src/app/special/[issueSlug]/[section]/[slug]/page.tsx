import { stripHtml } from "string-strip-html"
import { PageType, getArticle, getOGImage, getPermalink, getSpecialIssueBasics } from "../../../../../../lib/utils"
import { Metadata } from "next"
import Article from "@/app/components/article"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

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
  // const section = String(params.section)

  const issueBasics = await getSpecialIssueBasics({ slug: issueSlug }) // A limited set of data for the issue
  const articleData = await getArticle(slug, "published")
  if (!articleData || !issueBasics) {
    return notFound()
  }

  const currentSection = articleData.section

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

// export async function generateStaticParams() {
//   const specialArticlePages = await getSpecialArticlePages()

//   return specialArticlePages.map((article: Articles) => {
//     // NOTE: This is returning articles with no issues.
//     // These are the articles that are part of the "Special Issues"
//     // This might be a BUG, or might be how the REST API is set up.
//     if (!article.issue) {
//       return
//     }
//     return {
//       issueSlug: article.issue.slug,
//       section: article.section.slug,
//       slug: article.slug,
//     }
//   })
// }
