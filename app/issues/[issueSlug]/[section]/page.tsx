import IssuePage from "@/components/issuePage"
import { IssueSectionPageProps } from "@/lib/railTypes"
import { Sections } from "@/lib/types"
import { PageType, getAllIssues, getIssueData, getOGImage, getPermalink, getTributes } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface SectionParams {
  issueSlug: string
  section: string
}

// Page Configuration
export const revalidate = 3600 // revalidate every hour

// Metadata Generation
export async function generateMetadata({ params }: { params: SectionParams }): Promise<Metadata> {
  const data = await getData(params)

  if (!data?.currentSection || !data?.thisIssueData) {
    return {}
  }

  const { name } = data.currentSection
  const { title, cover_1, issue_number } = data.thisIssueData

  const ogtitle = `${name} – ${stripHtml(title).result}`
  const ogdescription = `The ${name} section of issue #${issue_number} of The Brooklyn Rail`
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
export default async function SectionPage({ params }: { params: SectionParams }) {
  const data = await getData(params)

  if (!data) {
    notFound()
  }

  return <IssuePage {...data} />
}

// Data Fetching
async function getData(params: SectionParams): Promise<IssueSectionPageProps | undefined> {
  try {
    const { issueSlug, section } = params

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

    // Process sections - extract unique sections from articles
    const issueSections = thisIssueData.articles
      .map((article) => article.section)
      .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

    const currentSection = issueSections.find((s: Sections) => s.slug === section)

    if (!currentSection) {
      return undefined
    }

    const permalink = getPermalink({
      issueSlug,
      section: currentSection.slug,
      type: PageType.Section,
    })

    const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/issue/${issueSlug}/section/${section}/`

    return {
      navData,
      thisIssueData,
      issueSections,
      tributesData,
      currentSection,
      allIssues,
      permalink,
      previewURL,
    }
  } catch (error) {
    console.error("Error fetching section data:", error)
    return undefined
  }
}
