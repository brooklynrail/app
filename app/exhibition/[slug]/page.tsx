import { notFound } from "next/navigation"
import { getOGImage, getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getExhibition } from "@/lib/utils/exhibitions"
import ExhibitionPage from "@/components/exhibition"
import { Exhibitions, Homepage } from "@/lib/types"
import Metadata from "next"
import { stripHtml } from "string-strip-html"

export interface ExhibitionProps {
  navData: Homepage
  exhibitionData: Exhibitions
  permalink: string
  previewURL: string
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.exhibitionData || !data.permalink) {
    return {}
  }

  const { title, summary, date_created, date_updated, title_tag, featured_image } = data.exhibitionData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(summary).result}`

  const ogimageprops = { ogimage: featured_image, title }
  const ogimages = getOGImage(ogimageprops)

  return {
    title: `${ogtitle}`,
    description: ogdescription,
    alternates: {
      canonical: `${data.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.permalink,
      images: ogimages,
      type: `article`,
      publishedTime: date_created,
      modifiedTime: date_updated,
    },
    twitter: {
      images: ogimages,
    },
  }
}

interface ExhibitionParams {
  slug: string
}

export default async function Exhibition({ params }: { params: ExhibitionParams }) {
  const data = await getData({ params })

  if (!data.exhibitionData || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <ExhibitionPage {...data} />
}

async function getData({ params }: { params: ExhibitionParams }) {
  const slug: string = params.slug.toString()
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const exhibitionData = await getExhibition(slug)

  if (!exhibitionData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Exhibition,
    slug: exhibitionData.slug,
  })

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/exhibition/${exhibitionData.id}/`

  return {
    navData,
    exhibitionData,
    permalink,
    previewURL,
  }
}
