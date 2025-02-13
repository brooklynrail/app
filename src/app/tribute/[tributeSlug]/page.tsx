import TributePage from "@/app/components/tributePage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { Articles, Homepage, Tributes } from "../../../../lib/types"
import { PageType, getOGImage, getPermalink, getTributeData } from "../../../../lib/utils"

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

  const navResponse = await fetch(`/api/nav/`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

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
