import { PageType, getOGImage, getPermalink, getTributeData } from "../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Articles, Tributes } from "../../../../lib/types"
import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import TributePage from "@/app/components/tributePage"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 600 : 0

// Set the Viewport to show the full page of the Rail on mobile devices
// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 0.405,
// }

export interface TributePageProps {
  thisTributeData: Tributes
  articleData: Articles
  permalink: string
  previewURL?: string
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
      thisTributeData,
      articleData,
      permalink,
    },
  }
}
