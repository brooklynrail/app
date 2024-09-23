import { Homepage, Issues, Sections, Tributes } from "../../lib/types"
import {
  getAllIssues,
  getCurrentIssueData,
  getHomepageData,
  getPermalink,
  getSectionData,
  getTributes,
  PageType,
} from "../../lib/utils"
import { notFound } from "next/navigation"
import { Viewport } from "next"
import HomePage from "./components/homepage"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 600 : 0

// Set the Viewport to show the full page of the Rail on mobile devices
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.405,
}

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
  Contributor = "contributor",
  TableOfContents = "table-of-contents",
}
export interface HomePageProps {
  homepageData: Homepage
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export default async function HomepagePage() {
  const data = await getData()

  return <HomePage {...data} />
}

async function getData() {
  const homepageData = await getHomepageData()
  if (!homepageData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    homepageData,
    permalink,
  }
}
