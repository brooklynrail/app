import IssuePage from "@/app/components/issuePage"
import { PageLayout } from "@/app/page"
import { PageType, getIssueData, getIssues, getOGImage, getPermalink } from "../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Metadata } from "next"
import { Issues } from "../../../../lib/types"

export const dynamicParams = true

export async function generateMetadata({ params }: { params: IssueParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, cover_1, issue_number } = data.issueData
  const ogtitle = `${stripHtml(title).result} | The Brooklyn Rail`
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
      title: `${ogtitle} | The Brooklyn Rail`,
      description: ogdescription,
      url: data.permalink,
      images: ogimages,
      type: `website`,
    },
  }
}

export default async function Issue({ params }: { params: IssueParams }) {
  const data = await getData({ params })

  return <IssuePage {...data} layout={PageLayout.Issue} />
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

  const permalink = getPermalink({
    year: issueData.year,
    month: issueData.month,
    type: PageType.Issue,
  })

  return {
    issueData,
    permalink,
  }
}

export async function generateStaticParams() {
  const allIssues = await getIssues()

  return allIssues.map((issue: Issues) => {
    const month = issue.month < 10 ? String(`0${issue.month}`) : String(issue.month)
    return {
      year: String(issue.year),
      month: month,
    }
  })
}
