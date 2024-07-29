import { PageLayout } from "@/app/page"
import {
  PageType,
  getIssueData,
  getIssues,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
} from "../../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Issues, Sections } from "../../../../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { Metadata } from "next"

export const dynamicParams = true

export async function generateMetadata({ params }: { params: SectionParams }): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.props.currentSection) {
    return {}
  }

  const { name } = data.props.currentSection
  const { title, cover_1, issue_number } = data.props.issueData
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

  console.log(params)
  const issueData = await getIssueData({
    year: year,
    month: month,
  })

  // Get only the sections that are used in the articles in the current issue
  console.log("issueData: ", issueData.id, issueData.year, issueData.month, issueData.title, issueData.slug)
  const currentSections = await getSectionsByIssueId(issueData.id)

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
      currentSection,
      permalink,
    },
  }
}

// export async function generateStaticParams() {
//   const issues = await getIssues()
//   return issues.map(async (issue: Issues) => {
//     const currentSections = await getSectionsByIssueId(issue.id)
//     const issuePath = currentSections.map((section: Sections) => {
//       return {
//         year: `${String(issue.year)}`,
//         month: issue.month < 10 ? `0${String(issue.month)}` : String(issue.month),
//         section: section.slug,
//       }
//     })
//     return issuePath
//   })
// }
