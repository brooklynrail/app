import Page from "@/components/page"
import { AboutPageProps } from "@/lib/railTypes"
import { getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getAllPages, getPageData } from "@/lib/utils/pages"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

export const revalidate = 86400 // invalidate once a day

interface PageParams {
  slug: string
}

export async function generateMetadata(props: { params: Promise<PageParams> }): Promise<Metadata> {
  const data = await getData({ params: await props.params })

  if (!data.pageData || !data.permalink) {
    return {}
  }

  const { title, body_text, summary } = data.pageData
  const ogtitle = stripHtml(title).result
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

export default async function ChildPage(props: { params: Promise<PageParams> }) {
  const data = await getData({ params: await props.params })

  if (!data.pageData || !data.permalink) {
    return notFound()
  }

  return <Page {...data} />
}

async function getData({ params }: { params: PageParams }): Promise<AboutPageProps> {
  const { slug } = params

  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

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

  const permalink = getPermalink({
    slug: pageData.slug,
    type: PageType.ChildPage,
  })

  return {
    navData,
    pageData,
    quotes,
    allPagesData,
    permalink,
  }
}

export async function generateStaticParams() {
  return []
}
