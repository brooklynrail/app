import TributePage from "@/components/tributePage"
import { TributePageProps } from "@/lib/railTypes"
import { PageType, getOGImage, getPermalink, getTributeData } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface TributeParams {
  tributeSlug: string
}

// Page Configuration
export const revalidate = 3600 // revalidate every hour

// Metadata Generation
export async function generateMetadata(props: { params: Promise<TributeParams> }): Promise<Metadata> {
  const params = await props.params
  const data = await getData(params)

  if (!data?.thisTributeData) {
    return {}
  }

  const { title, excerpt, featured_image } = data.thisTributeData
  const ogtitle = stripHtml(title).result
  const ogdescription = excerpt
  const ogimages = getOGImage({ ogimage: featured_image, title })

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
      images: ogimages,
      type: "website",
    },
  }
}

// Main Page Component
export default async function Tribute(props: { params: Promise<TributeParams> }) {
  const params = await props.params
  const data = await getData(params)

  if (!data) {
    notFound()
  }

  return <TributePage {...data} />
}

// Data Fetching
async function getData(params: TributeParams): Promise<TributePageProps | undefined> {
  try {
    const { tributeSlug } = params

    // Parallel fetch of initial data
    const [navData, thisTributeData] = await Promise.all([getNavData(), getTributeData({ tributeSlug, slug: "" })])

    if (!navData || !thisTributeData) {
      return undefined
    }

    const articleData = thisTributeData.articles[0]
    if (!articleData) {
      return undefined
    }

    const permalink = getPermalink({
      tributeSlug,
      type: PageType.Tribute,
    })

    return {
      navData,
      thisTributeData,
      articleData,
      permalink,
    }
  } catch (error) {
    console.error("Error fetching tribute data:", error)
    return undefined
  }
}
