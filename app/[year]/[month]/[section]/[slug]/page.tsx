import { AddRedirect } from "@/app/actions/redirect"
import Article from "@/components/article"
import { checkYearMonthSection } from "@/lib/utils/articles"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { getArticle, getIssueData, getOGImage, getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getRedirect, RedirectTypes } from "@/lib/utils/redirects"
import { Suspense } from "react"
import AppLoader from "@/components/appLoader"

// ISR Configuration: Pages will be regenerated every week
// With generateStaticParams returning [], all dynamic routes use ISR
export const revalidate = 604800 // 1 week

interface ArticleParams {
  year: string
  month: string
  section: string
  slug: string
}

export async function generateMetadata(props: { params: Promise<ArticleParams> }): Promise<Metadata> {
  const data = await getData({ params: await props.params })

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

async function getData({ params }: { params: ArticleParams }) {
  const year: string = params.year
  const month: string = params.month
  const section: string = params.section
  const slug: string = params.slug.toString()

  // Month & Day —— Both need to have a leading zero if they are less than 10
  // otherwise it should go to a 404 page
  if (month.length === 1 || section.length === 1) {
    console.error(`[404] Invalid month/section format: year=${year}, month=${month}, section=${section}, slug=${slug}`)
    return notFound()
  }

  if (!year || !month || !section || !slug) {
    console.error(`[404] Missing required params: year=${year}, month=${month}, section=${section}, slug=${slug}`)
    return notFound()
  }

  const navData = await getNavData()
  if (!navData) {
    console.error(
      `[404] Navigation data not found for article: year=${year}, month=${month}, section=${section}, slug=${slug}`,
    )
    return notFound()
  }

  // Get the article data based on slug
  const articleData = await getArticle(slug, "published")
  if (!articleData) {
    // console.error(`[404] Article not found: year=${year}, month=${month}, section=${section}, slug=${slug}`)
    // If the slug is incorrect, but the dates in the URL are correct,
    // check if a redirect exists that includes this slug

    // Note: this does not account for changes to the year/month of the URL
    const redirect = await getRedirect(RedirectTypes.Article, slug)
    if (redirect) {
      console.log(`[Redirect] Found redirect for article: ${slug} -> ${redirect.path}`)
      await AddRedirect(redirect)
    }
    return notFound()
  }

  // This checks to see that the year, month, day in the URL is the same as the start_date for this event
  // This prevents URLs with the correct slug + wrong date
  if (!checkYearMonthSection(articleData.section, articleData.issue, year, month, section)) {
    console.error(`[404] URL date mismatch: year=${year}, month=${month}, section=${section}, slug=${slug}`)
    // check if a redirect exists that includes this slug
    const redirect = await getRedirect(RedirectTypes.Article, slug)
    if (redirect) {
      console.log(`[Redirect] Found redirect for article with date mismatch: ${slug} -> ${redirect.path}`)
      await AddRedirect(redirect)
    }
    return notFound()
  }

  // If the article is part of a tribute, redirect to the tribute page for that article
  if (articleData.tribute) {
    console.log(
      `[Redirect] Article is part of tribute, redirecting: ${slug} -> /tribute/${articleData.tribute.slug}/${articleData.slug}/`,
    )
    const path = `/tribute/${articleData.tribute.slug}/${articleData.slug}/`
    redirect(path) // Navigate to the new article page
  }

  // References -------
  // const references = articleData.body_text && extractPeopleFromArticle(articleData.body_text)
  // console.log("==============================")
  // console.log("references", references)

  const thisIssueData = await getIssueData({ slug: articleData.issue.slug })
  if (!thisIssueData) {
    console.error(
      `[404] Issue data not found for article: year=${year}, month=${month}, section=${section}, slug=${slug}`,
    )
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
      navData,
      articleData,
      thisIssueData,
      currentSection,
      permalink,
    },
  }
}

export default async function ArticlePageController(props: { params: Promise<ArticleParams> }) {
  const data = await getData({ params: await props.params })

  if (!data.props.articleData) {
    return notFound()
  }

  return (
    <Suspense fallback={<AppLoader />}>
      <Article {...data.props} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  return []
}
