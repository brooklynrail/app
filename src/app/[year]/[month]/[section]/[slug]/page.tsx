import { stripHtml } from "string-strip-html"
import { PageType, getArticle, getIssueData, getOGImage, getPermalink, getRedirect } from "../../../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../../../lib/types"
import { Metadata } from "next"
import Article from "@/app/components/article"
import { notFound, redirect } from "next/navigation"
import { AddRedirect } from "@/app/actions/redirect"
import { revalidatePath } from "next/cache"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every day.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 14400 : 0

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
    twitter: {
      images: ogimages,
    },
  }
}
export interface ArticleProps {
  articleData: Articles
  thisIssueData: Issues
  currentSection: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
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

  const articleData = await getArticle(slug, "published")
  if (!articleData) {
    // check if a redirect exists
    const redirect = await getRedirect(slug)
    if (redirect) {
      await AddRedirect(redirect)
    }
    return notFound()
  }

  // If the article is part of a tribute, redirect to the tribute page for that article
  if (articleData.tribute) {
    const path = `/tribute/${articleData.tribute.slug}/${articleData.slug}/`
    revalidatePath(path) // Update cached special issue
    redirect(path) // Navigate to the new article page
  }

  const thisIssueData = await getIssueData({ slug: articleData.issue.slug })
  if (!thisIssueData) {
    return notFound()
  }

  const currentSection = articleData.section

  const permalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    section: currentSection.slug,
    slug: articleData.slug,
    type: PageType.Article,
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

export default async function ArticlePageController({ params }: { params: ArticleParams }) {
  const data = await getData({ params })

  if (!data.props.articleData) {
    return notFound()
  }

  return <Article {...data.props} />
}

// export async function generateStaticParams() {
//   const articlePages = await getArticlePages()

//   if (!articlePages) {
//     return notFound()
//   }

//   return articlePages.map((article: Articles) => {
//     // NOTE: This is returning articles with no issues.
//     // These are the articles that are part of the "Special Issues"
//     // This might be a BUG, or might be how the REST API is set up.
//     if (!article.issue) {
//       return
//     }
//     const month = article.issue.month
//     return {
//       year: article.issue.year.toString(),
//       month: month < 10 ? `0${month.toString()}` : month.toString(),
//       section: article.section.slug,
//       slug: article.slug,
//     }
//   })
// }
