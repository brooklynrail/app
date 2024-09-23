import { PageLayout } from "@/app/page"
import { PageType, getAllIssues, getIssueData, getOGImage, getPermalink, getTributes } from "../../../../../lib/utils"
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
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 600 : 0

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

  return (
    <IssuePage
      {...data.props}
      layout={data.props.thisIssueData.special_issue ? PageLayout.SpecialSection : PageLayout.Section}
    />
  )
}

interface SectionParams {
  issueSlug: string
  section: string
}

async function getData({ params }: { params: SectionParams }) {
  const issueSlug = params.issueSlug
  const section = params.section.toString()

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
      thisIssueData,
      issueSections,
      tributesData,
      currentSection,
      allIssues,
      permalink,
    },
  }
}
