import IssuePage from "@/app/components/issuePage"
import { PageLayout } from "@/app/page"
import { PageType, getIssueData, getOGImage, getPermalink } from "../../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 5 mins.
export const revalidate = 300

// Set the Viewport to show the full page of the Rail on mobile devices
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.405,
}

export async function generateMetadata({ params }: { params: IssueParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, cover_1, issue_number } = data.thisIssueData
  const ogtitle = `${stripHtml(title).result}`
  const ogdescription = `Issue #${issue_number} of The Brooklyn Rail`
  const ogimageprops = { ogimage: cover_1, title }
  const ogimages = getOGImage(ogimageprops)

  return {
    title: `${ogtitle}`,
    description: ogdescription,
    alternates: {
      canonical: `${data.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.permalink,
      images: ogimages,
      type: `website`,
    },
  }
}

export default async function TOC({ params }: { params: IssueParams }) {
  const data = await getData({ params })

  return <IssuePage {...data} layout={PageLayout.TableOfContents} />
}

interface IssueParams {
  year: string
  month: string
}

async function getData({ params }: { params: IssueParams }) {
  const year = Number(params.year)
  const month = Number(params.month)

  const thisIssueData = await getIssueData({
    year: year,
    month: month,
  })

  if (!thisIssueData) {
    return notFound()
  }

  // make an array of all the sections used in thisIssueData.articles and remove any duplicates
  const issueSections = thisIssueData.articles
    .map((article) => article.section)
    .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

  const permalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    type: PageType.Issue,
  })

  return {
    thisIssueData,
    issueSections,
    permalink,
  }
}
