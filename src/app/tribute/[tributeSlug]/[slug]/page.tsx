import TributePage from "@/app/components/tributePage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { PageType, getArticle, getOGImage, getPermalink, getTributeData } from "../../../../../lib/utils"

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

  const navResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nav`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

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
