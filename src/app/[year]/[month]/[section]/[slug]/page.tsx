import { stripHtml } from "string-strip-html"
import { PageType, getArticle, getIssueData, getOGImage, getPermalink } from "../../../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../../../lib/types"
import { Metadata } from "next"
import Article from "@/app/components/article"
import { notFound, redirect } from "next/navigation"
import { AddRedirect } from "@/app/actions/redirect"
import { revalidatePath } from "next/cache"
import { getRedirect, RedirectTypes } from "../../../../../../lib/utils/redirects"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

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
  const slug: string = params.slug.toString()

  const articleData = await getArticle(slug, "published")

  // Redirects
  if (!articleData) {
    // check if a redirect exists that includes this slug
    // Note: this does not account for changes to the year/month of the URL
    const redirect = await getRedirect(RedirectTypes.Article, slug)
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
