import { notFound } from "next/navigation"
import { getPermalink, PageType } from "@/lib/utils"
import { getArticlesBySection, getSectionData } from "@/lib/utils/sections"
import Section from "@/components/section"
import { getNavData } from "@/lib/utils/homepage"
import Metadata from "next"
import { stripHtml } from "string-strip-html"

export const revalidate = 60 * 60 // revalidate at most once an hour

export default async function SectionPage({ params }: { params: SectionParams }) {
  const data = await getData({ params })

  if (!data.sectionData) {
    return notFound()
  }

  return <Section {...data} />
}

interface SectionParams {
  slug: string
}

async function getData({ params }: { params: SectionParams }) {
  const slug = params.slug.toString()

  const [navData, sectionData, articlesData] = await Promise.all([
    getNavData(),
    getSectionData({ slug }),
    getArticlesBySection({ slug, limit: 32, offset: 0 }),
  ])

  if (!navData || !sectionData || !articlesData) {
    return notFound()
  }

  const permalink = getPermalink({
    sectionSlug: slug,
    type: PageType.SuperSection,
  })

  return {
    navData,
    sectionData,
    articlesData,
    permalink,
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data) {
    return {}
  }

  const { name, description, date_updated, date_created } = data.sectionData
  const ogtitle = `${stripHtml(name).result}`
  const ogdescription = `${description && stripHtml(description).result}`

  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

  return {
    title: `${ogtitle}`,
    description: ogdescription,
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.permalink,
      type: `website`,
      images: share_card,
    },
    twitter: {
      images: share_card,
    },
  }
}
