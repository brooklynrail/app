import HomepagePreview from "@/app/components/preview/homepage"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import { PageType, getCurrentIssueData, getPermalink } from "../../../../lib/utils"
import { getHomepageData, getNavData } from "../../../../lib/utils/homepage"
import { getPreviewPassword } from "../../../../lib/utils/preview"

export interface HomepagePreviewProps {
  navData: Homepage
  homepageData: Homepage
  banners: HomepageBanners[]
  currentIssue: Issues
  permalink: string
  errorCode?: number
  errorMessage?: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  return {
    title: `PREVIEW: Homepage `,

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

export default async function HomepagePreviewPage() {
  const { isEnabled } = draftMode()
  console.log("Draft mode enabled: ", isEnabled)

  const data = await getData()

  const { homepageData, banners, currentIssue, permalink, previewPassword, directusUrl, navData } = data
  if (!homepageData || !banners || !currentIssue || !permalink || !previewPassword || !directusUrl) {
    return notFound()
  }

  const homepagePreviewProps = {
    homepageData,
    banners,
    currentIssue,
    permalink,
    directusUrl,
    previewPassword,
    isEnabled,
    navData,
  }

  return <HomepagePreview {...homepagePreviewProps} />
}

async function getData() {
  const currentIssue = await getCurrentIssueData()
  if (!currentIssue) {
    return notFound()
  }

  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const homepageData = await getHomepageData(currentIssue)
  if (!homepageData) {
    return notFound()
  }

  const banners = homepageData.banners
  if (!banners) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    navData,
    homepageData,
    banners,
    currentIssue,
    permalink,
    previewPassword,
    directusUrl,
  }
}
