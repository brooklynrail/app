import TributePage from "@/components/tributePage"
import { TributeArticleProps } from "@/lib/railTypes"
import { PageType, getArticle, getOGImage, getPermalink } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getAllTributes, getTributeData } from "@/lib/utils/tributes"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface TributeParams {
  tributeSlug: string
  slug: string
}

// Page Configuration
export const revalidate = 31536000 // revalidate every year (365 days)

// Metadata Generation
export async function generateMetadata(props: { params: Promise<TributeParams> }): Promise<Metadata> {
  const params = await props.params
  const data = await getData(params)

  if (!data?.thisTributeData) {
    return {}
  }

  const { title, excerpt, featured_image } = data.thisTributeData
  const ogtitle = stripHtml(title).result
  const ogdescription = stripHtml(excerpt).result
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
export default async function TributeArticle(props: { params: Promise<TributeParams> }) {
  const params = await props.params
  const data = await getData(params)

  if (!data) {
    notFound()
  }

  return <TributePage {...data} />
}

// Data Fetching
async function getData(params: TributeParams): Promise<TributeArticleProps | undefined> {
  try {
    const { tributeSlug, slug } = params

    // Parallel fetch of initial data
    const [navData, thisTributeData, articleData] = await Promise.all([
      getNavData(),
      getTributeData({ tributeSlug, slug }),
      getArticle(slug, "published"),
    ])

    if (!navData || !thisTributeData || !articleData) {
      return undefined
    }

    const permalink = getPermalink({
      tributeSlug,
      slug,
      type: PageType.TributeArticle,
    })

    return {
      navData,
      thisTributeData,
      articleData,
      permalink,
      currentArticleSlug: articleData.slug,
    }
  } catch (error) {
    console.error("Error fetching tribute article data:", error)
    return undefined
  }
}

export async function generateStaticParams() {
  const allTributes = await getAllTributes()
  if (!allTributes) {
    return []
  }
  return allTributes.map((tribute) => ({
    tributeSlug: tribute.slug,
    slug: tribute.articles[0].slug,
  }))
}
