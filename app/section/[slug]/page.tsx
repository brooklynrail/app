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

interface SectionParams {
  slug: string
}

// Metadata Generation
export async function generateMetadata(props: { params: Promise<SectionParams> }): Promise<Metadata> {
  const params = await props.params
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
export default async function SectionPage(props: { params: Promise<SectionParams> }) {
  const params = await props.params
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
