import { notFound } from "next/navigation"
import { Homepage, Issues, Pages, PagesQuotes } from "../../../../lib/types"
import Page from "../../components/page"
import { getCurrentIssueData, getPermalink, PageType } from "../../../../lib/utils"
import { getAllPages, getPageData } from "../../../../lib/utils/pages"
import { stripHtml } from "string-strip-html"
import { Metadata } from "next"

export const revalidate = 86400 // invalidate once a day
export interface PageProps {
  navData: Homepage
  pageData: Pages
  quotes?: PagesQuotes[] | null
  allPagesData: Pages[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

interface PageParams {
  slug: string
  thisIssueData: Issues
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.pageData || !data.permalink) {
    return {}
  }

  const { title, body_text, summary } = data.pageData
  const ogtitle = stripHtml(title).result
  // get the first 240 characters of the summary or body_text
  const bodySummary = body_text ? stripHtml(body_text).result.slice(0, 240) : ""
  const ogdescription = summary ? stripHtml(summary).result.slice(0, 240) : bodySummary

  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

  return {
    title: ogtitle,
    description: ogdescription,
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: ogtitle,
      description: ogdescription,
      url: data.permalink,
      type: "article",
      images: share_card,
    },
    twitter: {
      images: share_card,
    },
  }
}

export default async function ChildPage({ params }: { params: PageParams }) {
  const data = await getData({ params })

  if (!data.thisIssueData || !data.pageData || !data.permalink) {
    return notFound()
  }

  return <Page {...data} />
}

interface PageParams {
  slug: string
}

async function getData({ params }: { params: PageParams }) {
  const { slug } = params

  const navResponse = await fetch(`${process.env.VERCEL_URL}/api/nav/`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

  const pageData = await getPageData(slug)
  if (!pageData) {
    return notFound()
  }

  const aboutPageData = await getPageData("about")
  if (!aboutPageData) {
    return notFound()
  }

  const quotes = aboutPageData.quotes

  const allPagesData = await getAllPages()
  if (!allPagesData) {
    return notFound()
  }

  const thisIssueData = await getCurrentIssueData()
  if (!thisIssueData) {
    return notFound()
  }

  const permalink = getPermalink({
    slug: pageData.slug,
    type: PageType.ChildPage,
  })

  return {
    navData,
    pageData,
    quotes,
    allPagesData,
    thisIssueData,
    permalink,
  }
}
