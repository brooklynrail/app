import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { getAllIssues, getCurrentIssueData, getPermalink, getSectionData, PageType } from "../../lib/utils"
import { notFound } from "next/navigation"
import { Viewport } from "next"
import Homepage from "./components/homepage"

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
  collectionsData: Sections[]
  thisIssueData: Issues
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export default async function HomepagePage() {
  const data = await getData()

  if (!data.thisIssueData || !data.permalink || !data.collectionsData) {
    return notFound()
  }

  return <Homepage {...data} />
}

async function getData() {
  const thisIssueData = await getCurrentIssueData()

  if (!thisIssueData) {
    return notFound()
  }

  const sections = ["art", "artseen", "criticspage", "books", "artbooks", "film", "music", "poetry", "theater"]

  const collectionsData = await Promise.all(
    sections.map(async (section) => await getSectionData({ slug: section, limit: 12 })),
  )
  const filteredCollectionsData = collectionsData.filter((data): data is Sections => data !== null)

  if (!filteredCollectionsData.length) {
    return notFound()
  }

  // Use props as needed

  const allIssues = await getAllIssues()
  if (!allIssues) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    collectionsData: filteredCollectionsData,
    thisIssueData,
    permalink,
  }
}
