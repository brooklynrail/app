import TributePage from "@/app/components/tributePage"
import { PageType, getPermalink, getTributeData } from "../../../../../lib/utils"
import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 600 : 0

// Set the Viewport to show the full page of the Rail on mobile devices
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.405,
}

// export async function generateMetadata({ params }: { params: TributeParams }): Promise<Metadata> {
//   const data = await getData({ params })

//   if (!data.props.currentSection) {
//     return {}
//   }

//   const { name } = data.props.currentSection
//   const { title, cover_1, issue_number } = data.props.thisIssueData
//   const ogtitle = `${name} – ${stripHtml(title).result}`
//   const ogdescription = `The ${name} section of issue #${issue_number} of The Brooklyn Rail`
//   const ogimageprops = { ogimage: cover_1, title }
//   const ogimages = getOGImage(ogimageprops)

//   return {
//     title: `${ogtitle}`,
//     description: ogdescription,
//     alternates: {
//       canonical: `${data.props.permalink}`,
//     },
//     openGraph: {
//       title: `${ogtitle}`,
//       description: ogdescription,
//       url: data.props.permalink,
//       images: ogimages,
//       type: `website`,
//     },
//   }
// }

export default async function TributeArticle({ params }: { params: TributeParams }) {
  const data = await getData({ params })

  return <TributePage {...data.props} />
}

interface TributeParams {
  tributeSlug: string
  slug: string
}

async function getData({ params }: { params: TributeParams }) {
  const tributeSlug = params.tributeSlug
  const slug = params.slug

  const thisTributeData = await getTributeData({ tributeSlug: tributeSlug, slug: slug })
  if (!thisTributeData) {
    return notFound()
  }

  // find the article in the tribute data with the matching slug
  const articleData = thisTributeData.articles.find((article) => article.slug === slug)
  if (!articleData) {
    return notFound()
  }

  const permalink = getPermalink({
    tributeSlug: tributeSlug,
    slug: slug,
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
