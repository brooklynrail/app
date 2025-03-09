import Section from "@/components/section"
import { SectionPageProps } from "@/lib/railTypes"
import { getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getArticlesBySection, getSectionData } from "@/lib/utils/sections"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface SectionParams {
  slug: string
}

// Page Configuration
export const revalidate = 3600 // revalidate every hour

// Metadata Generation
export async function generateMetadata({ params }: { params: SectionParams }): Promise<Metadata> {
  const data = await getData(params)

  if (!data?.sectionData) {
    return {}
  }

  const { name, description } = data.sectionData
  const ogtitle = stripHtml(name).result
  const ogdescription = description ? stripHtml(description).result : ""

  const shareCard = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

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
      type: "website",
      images: shareCard,
    },
    twitter: {
      images: shareCard,
    },
  }
}

// Main Page Component
export default async function SectionPage({ params }: { params: SectionParams }) {
  const data = await getData(params)

  if (!data?.sectionData) {
    notFound()
  }

  return <Section {...data} />
}

// Data Fetching
async function getData(params: SectionParams): Promise<SectionPageProps | undefined> {
  try {
    const slug = params.slug.toString()

    // Parallel fetch of initial data
    const [navData, sectionData, articlesData] = await Promise.all([
      getNavData(),
      getSectionData({ slug }),
      getArticlesBySection({ slug, limit: 32, offset: 0 }),
    ])

    if (!navData || !sectionData || !articlesData) {
      return undefined
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
  } catch (error) {
    console.error("Error fetching section data:", error)
    return undefined
  }
}
