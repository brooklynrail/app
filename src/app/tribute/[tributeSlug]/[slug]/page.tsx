import TributePage from "@/app/components/tributePage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { PageType, getArticle, getBaseUrl, getOGImage, getPermalink, getTributeData } from "../../../../../lib/utils"

export async function generateMetadata({ params }: { params: TributeParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, excerpt, featured_image } = data.props.thisTributeData
  const ogtitle = stripHtml(title).result
  const ogdescription = stripHtml(excerpt).result
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

  const baseURL = getBaseUrl()
  const navData = await fetch(`${baseURL}/api/nav/`, {
    next: { revalidate: 86400, tags: ["homepage"] }, // 24 hours in seconds (24 * 60 * 60)
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`API returned ${res.status}`)
      return res.json()
    })
    .catch((error) => {
      console.error("Failed to fetch nav data:", error)
      return null
    })

  if (!navData) {
    return notFound()
  }

  const thisTributeData = await getTributeData({ tributeSlug: tributeSlug, slug: slug })
  if (!thisTributeData) {
    return notFound()
  }

  // find the article in the tribute data with the matching slug
  const articleData = await getArticle(slug, "published")
  // const articleData = thisTributeData.articles.find((article) => article.slug === slug)
  if (!articleData) {
    return notFound()
  }

  const permalink = getPermalink({
    tributeSlug: tributeSlug,
    slug: slug,
    type: PageType.TributeArticle,
  })

  return {
    props: {
      navData,
      thisTributeData,
      articleData,
      permalink,
      currentArticleSlug: articleData.slug,
    },
  }
}
