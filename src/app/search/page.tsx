import { notFound } from "next/navigation"
import { Issues, Sections } from "../../../lib/types"
import { getAllIssues, getPermalink, PageType } from "../../../lib/utils"
import ArchivePage from "../components/archive"
import { Viewport } from "next"
import SearchPage from "../components/search"

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
}

export default async function Homepage() {
  const data = await getData()

  if (!data.issues || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <SearchPage {...data} />
}

async function getData() {
  const allIssuesData = await getAllIssues()

  if (!allIssuesData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Archive,
  })

  return {
    issues: allIssuesData,
    permalink,
  }
}
