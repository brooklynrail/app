import IssuePage from "@/app/components/issuePage"
import { PageLayout } from "@/app/page"
import {
  PageType,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
  getSpecialIssueData,
  getSpecialIssues,
} from "../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Metadata } from "next"
import { Issues } from "../../../../lib/types"

// export const dynamicParams = true

export async function generateMetadata({ params }: { params: SpecialSectionParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, cover_1, issue_number } = data.props.issueData
  const ogtitle = `${stripHtml(title).result} | The Brooklyn Rail`
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
      title: `${ogtitle} | The Brooklyn Rail`,
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

  const sections = await getSectionsByIssueId(issueData.id)

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

export async function generateStaticParams() {
  const specialIssues = await getSpecialIssues()

  return specialIssues.map(async (issue: Issues) => {
    return {
      issueSlug: issue.slug,
    }
  })
}
