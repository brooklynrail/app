import Section from "@/components/section"
import { Sections } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { getArticlesBySection, getSectionData, getSections } from "@/lib/utils/sections"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

// ISR Configuration: Pages will be regenerated every year
// With generateStaticParams returning [], all dynamic routes use ISR
export const revalidate = 31536000 // 1 year

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
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await props.params).slug
  const data = await getData(slug)

  if (!data?.sectionData) {
    notFound()
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

  if (!data || !data.sectionData) {
    notFound()
  }

  return <Section {...data} />
}

// Data Fetching
async function getData(slug: string) {
  try {
    const numArticles = slug === "criticspage" ? 50 : 32
    // Parallel fetch of initial data
    const [navData, sectionData, articlesData] = await Promise.all([
      getNavDataFromAPI(),
      getSectionData({ slug }),
      getArticlesBySection({ slug, limit: numArticles, offset: 0 }),
    ])

    if (!navData || !sectionData || !articlesData) {
      return null
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
    return null
  }
}

export async function generateStaticParam() {
  return []
}
