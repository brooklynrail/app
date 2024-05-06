import { Metadata } from "next"
import { PageLayout } from "@/app/page"
import {
  PageType,
  getIssueBasics,
  getIssues,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
} from "../../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Issues, Sections } from "../../../../../lib/types"
import IssuePage from "@/components/issuePage"

export const dynamicParams = true

export async function generateMetadata({ params }: { params: SpecialSectionParams }): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.props.issueBasics || !data.props.currentSection) {
    return {}
  }

  const { name } = data.props.currentSection
  const { title, cover_1, issue_number } = data.props.issueBasics
  const ogtitle = `${name} – ${stripHtml(title).result} | The Brooklyn Rail`
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
      title: `${ogtitle} | The Brooklyn Rail`,
      description: ogdescription,
      url: data.props.permalink,
      images: ogimages,
      type: `website`,
    },
  }
}

export default async function SectionPage({ params }: { params: SpecialSectionParams }) {
  const data = await getData({ params })

  if (!data.props.issueBasics || !data.props.permalink) {
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

  const issueBasics = await getIssueBasics({ year: undefined, month: undefined, slug: issueSlug })

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(issueBasics.id)
  const currentSection = currentSections.find((s: Sections) => s.slug === section)
  // If `section` does not exist, set errorCode to a string
  if (!currentSection) {
    return { props: { errorCode: 404, errorMessage: "This section does not exist" } }
  }

  const permalink = getPermalink({
    issueSlug: issueBasics.slug,
    section: currentSection.slug,
    type: PageType.SpecialIssueSection,
  })

  return {
    props: {
      issueBasics,
      currentSection,
      permalink,
    },
  }
}

export async function generateStaticParams() {
  const specialIssues = await getIssues({ special_issue: true })

  return specialIssues.map(async (issue: Issues) => {
    const sections = await getSectionsByIssueId(issue.id)
    const issuePath = sections.map((section) => ({
      issueSlug: issue.slug,
      section: section.slug,
    }))
    return issuePath
  })
}
