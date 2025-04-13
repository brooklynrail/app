import Section from "@/components/section"
import { SectionPageProps } from "@/lib/railTypes"
import { Sections } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getArticlesBySection, getSectionData, getSections } from "@/lib/utils/sections"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

export const dynamicParams = true

export async function generateStaticParams() {
  const sections: Sections[] | null = await getSections()
  if (!sections) {
    return []
  }
  return sections.map((section) => ({
    slug: section.slug,
  }))
}

// Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const data = await getData(slug)

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
export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getData(slug)

  if (!data) {
    notFound()
  }

  return <Section {...data} />
}

// Data Fetching
async function getData(slug: string) {
  try {
    // Parallel fetch of initial data
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
  } catch (error) {
    console.error("Error fetching section data:", error)
    return undefined
  }
}
