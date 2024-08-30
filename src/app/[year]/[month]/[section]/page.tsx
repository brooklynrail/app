import { PageLayout } from "@/app/page"
import { PageType, getIssueData, getOGImage, getPermalink, getSectionsByIssueId } from "../../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Sections } from "../../../../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 600

// Set the Viewport to show the full page of the Rail on mobile devices
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.405,
}

export async function generateMetadata({ params }: { params: SectionParams }): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.props.currentSection) {
    return {}
  }

  const { name } = data.props.currentSection
  const { title, cover_1, issue_number } = data.props.issueData
  const ogtitle = `${name} – ${stripHtml(title).result}`
  const ogdescription = `The ${name} section of issue #${issue_number} of The Brooklyn Rail`
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

export default async function SectionPage({ params }: { params: SectionParams }) {
  const data = await getData({ params })

  if (!data.props.currentSection) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <IssuePage {...data.props} layout={PageLayout.Section} />
}

interface SectionParams {
  year: string
  month: string
  section: string
}

async function getData({ params }: { params: SectionParams }) {
  const year = Number(params.year)
  const month = Number(params.month)
  const section = params.section.toString()

  const issueData = await getIssueData({
    year: year,
    month: month,
  })

  if (!issueData) {
    return notFound()
  }

  // Get the current list of Sections used in this Issue (draft or published)
  const currentSections = await getSectionsByIssueId(issueData.id, issueData.status)

  if (!currentSections) {
    return { props: { errorCode: 404, errorMessage: "No currentSections found" } }
  }

  const currentSection = currentSections.find((s: Sections) => s.slug === section)

  // If `section` does not exist, set errorCode to a string
  if (!currentSection) {
    return { props: { errorCode: 404, errorMessage: "This section does not exist" } }
  }

  const permalink = getPermalink({
    year: issueData.year,
    month: issueData.month,
    section: currentSection.slug,
    type: PageType.Section,
  })

  return {
    props: {
      issueData,
      sections: currentSections,
      currentSection,
      permalink,
    },
  }
}
