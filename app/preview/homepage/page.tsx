import HomepagePreview from "@/components/preview/homepage"
import { HomepagePreviewProps } from "@/lib/railTypes"
import { PageType, getCurrentIssueData, getPermalink } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getPreviewHomepageData, getPreviewPassword } from "@/lib/utils/preview"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound, redirect } from "next/navigation"

// Force dynamic rendering, no caching
export const dynamic = "force-dynamic"
export const revalidate = 0

// Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PREVIEW: Homepage",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  }
}

// Main Page Component
export default async function HomepagePreviewPage() {
  const isEnabled = await draftMode()

  // Verify draft mode is enabled
  if (!isEnabled) {
    redirect("/")
  }

  const data = await getData()

  if (!data?.homepageData || !data.previewPassword) {
    notFound()
  }

  return <HomepagePreview {...data} />
}

// Data Fetching
async function getData(): Promise<HomepagePreviewProps | undefined> {
  try {
    // Parallel fetch of initial data
    const [currentIssue, navData, previewPassword] = await Promise.all([
      getCurrentIssueData(),
      getNavData(),
      getPreviewPassword(),
    ])

    if (!currentIssue || !navData || !previewPassword) {
      return undefined
    }

    const homepageData = await getPreviewHomepageData(currentIssue)
    if (!homepageData || !homepageData.banners) {
      return undefined
    }

    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
    if (!directusUrl) {
      throw new Error("Missing DIRECTUS_URL environment variable")
    }

    const permalink = getPermalink({
      type: PageType.Home,
    })

    return {
      navData,
      homepageData,
      homepageHeaderData: homepageData.banners,
      currentIssue,
      permalink,
      previewPassword,
      directusUrl,
      isEnabled: true,
    }
  } catch (error) {
    console.error("Error fetching preview homepage data:", error)
    return undefined
  }
}
