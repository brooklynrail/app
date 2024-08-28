import IssuePage from "@/app/components/issuePage"
import { PageLayout } from "@/app/page"
import { PageType, getIssueData, getOGImage, getPermalink, getSectionsByIssueId } from "../../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Metadata } from "next"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

export async function generateMetadata({ params }: { params: IssueParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, cover_1, issue_number } = data.issueData
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

  const issueData = await getIssueData({
    year: year,
    month: month,
  })

  if (!issueData) {
    return notFound()
  }

  // Get the current list of Sections used in this Issue (draft or published)
  const sections = await getSectionsByIssueId(issueData.id, issueData.status)

  if (!sections) {
    return notFound()
  }

  const permalink = getPermalink({
    year: issueData.year,
    month: issueData.month,
    type: PageType.Issue,
  })

  return {
    issueData,
    sections,
    permalink,
  }
}
