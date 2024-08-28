import { Metadata, Viewport } from "next"
import { PageLayout } from "@/app/page"
import { PageType, getOGImage, getPermalink, getSectionsByIssueId, getSpecialIssueData } from "../../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Sections } from "../../../../../lib/types"
import IssuePage from "@/app/components/issuePage"
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

export default async function SectionPage({ params }: { params: SpecialSectionParams }) {
  const data = await getData({ params })

  if (!data.props.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <IssuePage {...data.props} layout={PageLayout.SpecialSection} />
}

interface SpecialSectionParams {
  issueSlug: string
  section: string
}

async function getData({ params }: { params: SpecialSectionParams }) {
  const issueSlug: string = params.issueSlug.toString()
  const section = params.section.toString()

  const issueData = await getSpecialIssueData({
    slug: issueSlug,
  })

  if (!issueData) {
    return notFound()
  }

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(issueData.id, issueData.status)
  if (!currentSections) {
    return notFound()
  }

  if (!currentSections) {
    return { props: { errorCode: 404, errorMessage: "No currentSections found" } }
  }
  const currentSection = currentSections.find((s: Sections) => s.slug === section)
  // If `section` does not exist, set errorCode to a string
  if (!currentSection) {
    return { props: { errorCode: 404, errorMessage: "This section does not exist" } }
  }

  const permalink = getPermalink({
    issueSlug: issueData.slug,
    section: currentSection.slug,
    type: PageType.SpecialIssueSection,
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
