import IssuePage from "@/components/issuePage"
import { IssuePageProps } from "@/lib/railTypes"
import { PageType, getAllIssues, getIssueData, getOGImage, getPermalink, getTributes } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface IssueParams {
  issueSlug: string
}

// Page Configuration
export const revalidate = 3600 // revalidate every hour

// Metadata Generation
export async function generateMetadata(props: { params: Promise<IssueParams> }): Promise<Metadata> {
  const params = await props.params;
  const data = await getData(params)

  if (!data?.thisIssueData) {
    return {}
  }

  const { title, cover_1, issue_number } = data.thisIssueData
  const ogtitle = stripHtml(title).result
  const ogdescription = `Issue #${issue_number} of The Brooklyn Rail`
  const ogimages = getOGImage({ ogimage: cover_1, title })

  return {
    title: ogtitle,
    description: ogdescription,
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: ogtitle,
      description: ogdescription,
      url: data.permalink,
      images: ogimages,
      type: "website",
    },
  }
}

// Main Page Component
export default async function Issue(props: { params: Promise<IssueParams> }) {
  const params = await props.params;
  const data = await getData(params)

  if (!data) {
    notFound()
  }

  return <IssuePage {...data} />
}

// Data Fetching
async function getData(params: IssueParams): Promise<IssuePageProps | undefined> {
  try {
    const { issueSlug } = params

    // Parallel fetch of initial data
    const [navData, thisIssueData, allIssues] = await Promise.all([
      getNavData(),
      getIssueData({ slug: issueSlug }),
      getAllIssues(),
    ])

    if (!navData || !thisIssueData || !allIssues) {
      return undefined
    }

    // Get tributes data after we have issue data
    const tributesData = await getTributes({ thisIssueData })

    // Extract unique sections from articles
    const issueSections = thisIssueData.articles
      .map((article) => article.section)
      .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

    const permalink = getPermalink({
      issueSlug,
      type: PageType.Issue,
    })

    const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/issue/${issueSlug}/`

    return {
      navData,
      thisIssueData,
      issueSections,
      tributesData,
      allIssues,
      permalink,
      previewURL,
      currentSection: null,
    }
  } catch (error) {
    console.error("Error fetching issue data:", error)
    return undefined
  }
}
