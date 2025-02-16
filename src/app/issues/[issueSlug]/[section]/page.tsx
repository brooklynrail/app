import IssuePage from "@/app/components/issuePage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { Sections } from "../../../../../lib/types"
import {
  PageType,
  getAllIssues,
  getBaseUrl,
  getIssueData,
  getNavData,
  getOGImage,
  getPermalink,
  getTributes,
} from "../../../../../lib/utils"

export async function generateMetadata({ params }: { params: SectionParams }): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.props.currentSection) {
    return {}
  }

  const { name } = data.props.currentSection
  const { title, cover_1, issue_number } = data.props.thisIssueData
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

  return <IssuePage {...data.props} />
}

interface SectionParams {
  issueSlug: string
  section: string
}

async function getData({ params }: { params: SectionParams }) {
  const issueSlug = params.issueSlug
  const section = params.section.toString()

  const navData = await getNavData()

  const thisIssueData = await getIssueData({
    slug: issueSlug,
  })
  if (!thisIssueData) {
    return notFound()
  }

  const tributesData = await getTributes({ thisIssueData: thisIssueData })

  const allIssues = await getAllIssues()
  if (!allIssues) {
    return notFound()
  }

  // make an array of all the sections used in thisIssueData.articles and remove any duplicates
  const issueSections = thisIssueData.articles
    .map((article) => article.section)
    .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

  const currentSection = issueSections.find((s: Sections) => s.slug === section)

  // If `section` does not exist, set errorCode to a string
  if (!currentSection) {
    return { props: { errorCode: 404, errorMessage: "This section does not exist" } }
  }

  const permalink = getPermalink({
    issueSlug: issueSlug,
    section: currentSection.slug,
    type: PageType.Section,
  })

  return {
    props: {
      navData,
      thisIssueData,
      issueSections,
      tributesData,
      currentSection,
      allIssues,
      permalink,
    },
  }
}
