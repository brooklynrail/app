import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import IssuePage from "@/app/components/issuePage"
import { PageLayout } from "@/app/page"
import { PageType, getIssueBasics, getOGImage, getPermalink } from "../../../../lib/utils"
import { stripHtml } from "string-strip-html"
import { Metadata } from "next"

export const dynamicParams = true

export async function generateMetadata({ params }: { params: SpecialSectionParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, cover_1, issue_number } = data.props.issueBasics
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
  const issueBasics = await getIssueBasics({ year: undefined, month: undefined, slug: issueSlug })

  const permalink = getPermalink({
    issueSlug: issueBasics.slug,
    type: PageType.SpecialIssue,
  })

  return {
    props: {
      issueBasics,
      permalink,
    },
  }
}

export async function generateStaticParams() {
  const specialIssues = await directus.request(
    readItems("issues", {
      fields: ["slug", "special_issue", "status"],
      filter: {
        _and: [{ special_issue: { _eq: true }, status: { _eq: "published" } }],
      },
    }),
  )

  return specialIssues.map((issue) => {
    return {
      issueSlug: issue.slug,
    }
  })
}
