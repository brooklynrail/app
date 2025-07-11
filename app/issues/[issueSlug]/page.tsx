import { AddRedirect } from "@/app/actions/redirect"
import IssuePage from "@/components/issuePage"
import { IssuePageProps } from "@/lib/railTypes"
import { PageType, getAllIssues, getIssueData, getOGImage, getPermalink } from "@/lib/utils"
import { getTributes } from "@/lib/utils/tributes"
import { getRedirect } from "@/lib/utils/redirects"
import { getNavData } from "@/lib/utils/homepage"
import { RedirectTypes } from "@/lib/utils/redirects"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface IssueParams {
  issueSlug: string
}

// Page Configuration
export const revalidate = 604800 // revalidate every week

// Metadata Generation
export async function generateMetadata(props: { params: Promise<IssueParams> }): Promise<Metadata> {
  const params = await props.params
  const data = await getData(params)

  if (!data?.thisIssueData) {
    // Check for redirect before returning empty metadata
    const redirect = await getRedirect(RedirectTypes.Issue, params.issueSlug)
    if (redirect) {
      await AddRedirect(redirect)
    }
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
  const params = await props.params
  const data = await getData(params)

  if (!data?.thisIssueData) {
    const redirect = await getRedirect(RedirectTypes.Issue, params.issueSlug)
    if (redirect) {
      await AddRedirect(redirect)
    }
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

    return {
      navData,
      thisIssueData,
      issueSections,
      tributesData,
      allIssues,
      permalink,
      currentSection: null,
    }
  } catch (error) {
    console.error("Error fetching issue data:", error)
    return undefined
  }
}

export async function generateStaticParams() {
  const allIssues = await getAllIssues()
  if (!allIssues) {
    return []
  }
  return allIssues.map((issue) => ({
    issueSlug: issue.slug,
  }))
}
