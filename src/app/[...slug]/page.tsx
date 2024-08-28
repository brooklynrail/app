import { notFound } from "next/navigation"
import { Issues, Pages } from "../../../lib/types"
import { getCurrentIssueData, getPageData, getPermalink, PageType } from "../../../lib/utils"
import Page from "../components/page"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60
export interface PageProps {
  pageData: Pages
  issueBasics: Issues
  permalink: string
  errorCode?: number
  errorMessage?: string
}

interface PageParams {
  slug: string
  issueBasics: Issues
}

export default async function SinglePage({ params }: { params: PageParams }) {
  const data = await getData({ params })

  if (!data.issueBasics || !data.pageData || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This page does not exist" } }
  }

  return <Page {...data} />
}

interface PageParams {
  slug: string
}

async function getData({ params }: { params: PageParams }) {
  const slug = String(params.slug)
  const pageData = await getPageData(slug)

  if (!pageData) {
    return notFound()
  }

  const issueBasics = await getCurrentIssueData()

  if (!issueBasics) {
    return notFound()
  }

  const permalink = getPermalink({
    slug: pageData.slug,
    type: PageType.Page,
  })

  return {
    pageData,
    issueBasics,
    permalink,
  }
}
