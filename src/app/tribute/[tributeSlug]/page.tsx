import TributePage from "@/app/components/tributePage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { Articles, Homepage, Tributes } from "../../../../lib/types"
import { PageType, getBaseUrl, getOGImage, getPermalink, getTributeData } from "../../../../lib/utils"

export interface TributePageProps {
  navData: Homepage
  thisTributeData: Tributes
  articleData: Articles
  permalink: string
  previewURL?: string
  currentArticleSlug?: string
}

export async function generateMetadata({ params }: { params: TributeParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, excerpt, featured_image } = data.props.thisTributeData
  const ogtitle = `${stripHtml(title).result}`
  const ogdescription = excerpt
  const ogimageprops = { ogimage: featured_image, title }
  const ogimages = getOGImage(ogimageprops)

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
      type: `website`,
    },
  }
}

export default async function Tribute({ params }: { params: TributeParams }) {
  const data = await getData({ params })

  return <TributePage {...data.props} />
}

interface TributeParams {
  tributeSlug: string
}

async function getData({ params }: { params: TributeParams }) {
  const tributeSlug = params.tributeSlug

  const baseURL = getBaseUrl()
  const navData = await fetch(`${baseURL}/api/nav/`, {
    headers: {
      "x-vercel-protection-bypass": `${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`,
    },
    next: { revalidate: 86400, tags: ["homepage"] }, // 24 hours in seconds (24 * 60 * 60)
  }).then((res) => res.json())

  const thisTributeData = await getTributeData({ tributeSlug: tributeSlug, slug: "" })
  if (!thisTributeData) {
    return notFound()
  }

  const articleData = thisTributeData.articles[0]

  const permalink = getPermalink({
    tributeSlug: tributeSlug,
    type: PageType.Tribute,
  })

  return {
    props: {
      navData,
      thisTributeData,
      articleData,
      permalink,
    },
  }
}
