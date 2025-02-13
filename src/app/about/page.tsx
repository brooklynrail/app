import { notFound } from "next/navigation"
import { getPermalink, PageType } from "../../../lib/utils"
import { getAllPages, getPageData } from "../../../lib/utils/pages"
import Page from "../components/page"
import { Metadata } from "next"
import { stripHtml } from "string-strip-html"

export const revalidate = 86400 // invalidate once a day

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

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

export default async function AboutPage() {
  const data = await getData()
  if (!data.pageData || !data.permalink) {
    return notFound()
  }

  return <Page {...data} />
}

async function getData() {
  const navResponse = await fetch(`https://${process.env.VERCEL_URL}/api/nav/`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

  const pageData = await getPageData("about")
  if (!pageData) {
    return notFound()
  }

  const quotes = pageData.quotes

  const allPagesData = await getAllPages()
  if (!allPagesData) {
    return notFound()
  }

  const permalink = getPermalink({
    slug: pageData.slug,
    type: PageType.Page,
  })

  return {
    navData,
    quotes,
    pageData,
    allPagesData,
    permalink,
  }
}
