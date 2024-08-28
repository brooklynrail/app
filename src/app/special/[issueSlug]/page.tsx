import IssuePage from "@/app/components/issuePage"
import { PageLayout } from "@/app/page"
import { PageType, getOGImage, getPermalink, getSectionsByIssueId, getSpecialIssueData } from "../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// Set the Viewport to show the full page of the Rail on mobile devices
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.405,
}

export async function generateMetadata({ params }: { params: SpecialSectionParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, cover_1, issue_number } = data.props.issueData
  const ogtitle = `${stripHtml(title).result}`
  const ogdescription = `Issue #${issue_number} of The Brooklyn Rail`
  const ogimageprops = { ogimage: cover_1, title }
  const ogimages = getOGImage(ogimageprops)

  return {
    title: `${ogtitle}`,
    description: ogdescription,
    alternates: {
      canonical: `${data.props.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.props.permalink,
      images: ogimages,
      type: `website`,
    },
  }
}

export default async function SpecialIssue({ params }: { params: SpecialSectionParams }) {
  const data = await getData({ params })
  return <IssuePage {...data.props} layout={PageLayout.SpecialIssue} />
}

interface SpecialSectionParams {
  issueSlug: string
}

async function getData({ params }: { params: SpecialSectionParams }) {
  const issueSlug = params.issueSlug.toString()
  const issueData = await getSpecialIssueData({
    slug: issueSlug,
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
    issueSlug: issueData.slug,
    type: PageType.SpecialIssue,
  })

  return {
    props: {
      issueData,
      sections,
      permalink,
    },
  }
}

// export async function generateStaticParams() {
//   const specialIssues = await getSpecialIssues()

//   return specialIssues.map(async (issue: Issues) => {
//     return {
//       issueSlug: issue.slug,
//     }
//   })
// }
