import TributesPage from "@/components/tributes"
import { TributesPageProps } from "@/lib/railTypes"
import { PageType, getPermalink, share_card } from "@/lib/utils"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { getSectionData } from "@/lib/utils/sections"
import { getAllTributes, getInMemoriamArticles } from "@/lib/utils/tributes"
import { Metadata } from "next"
import { notFound } from "next/navigation"

// Page Configuration
export const revalidate = 31536000 // revalidate every year (365 days)

// Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data?.tributesData) {
    return {}
  }

  const ogtitle = "All Tributes"

  return {
    title: ogtitle,
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: ogtitle,
      url: data.permalink,
      type: "website",
      images: share_card,
    },
    twitter: {
      title: ogtitle,
      card: "summary_large_image",
    },
  }
}

// Main Page Component
export default async function Tributes() {
  const data = await getData()

  if (!data) {
    notFound()
  }

  return <TributesPage {...data} />
}

// Data Fetching
async function getData(): Promise<TributesPageProps | undefined> {
  try {
    // Parallel fetch of initial data
    const [navData, tributesData, inMemoriamData, inMemoriamArticles] = await Promise.all([
      getNavData(),
      getAllTributes(),
      getSectionData({ slug: "in-memoriam" }),
      getInMemoriamArticles({ slug: "in-memoriam", limit: 32, offset: 0 }),
    ])

    if (!navData || !tributesData || !inMemoriamData || !inMemoriamArticles) {
      return undefined
    }

    const permalink = getPermalink({
      type: PageType.Tributes,
    })

    return {
      navData,
      tributesData,
      inMemoriamData,
      inMemoriamArticles,
      permalink,
    }
  } catch (error) {
    console.error("Error fetching tribute data:", error)
    return undefined
  }
}
