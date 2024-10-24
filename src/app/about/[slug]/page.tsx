import { notFound } from "next/navigation"
import { Homepage, Issues, Pages, PagesQuotes } from "../../../../lib/types"
import Page from "../../components/page"
import { getCurrentIssueData, getPermalink, PageType } from "../../../../lib/utils"
import { getNavData } from "../../../../lib/utils/homepage"
import { getAllPages, getPageData } from "../../../../lib/utils/pages"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 48600 : 0
export interface PageProps {
  navData: Homepage
  pageData: Pages
  quotes?: PagesQuotes[] | null
  allPagesData: Pages[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

interface PageParams {
  slug: string
  thisIssueData: Issues
}

export default async function ChildPage({ params }: { params: PageParams }) {
  const data = await getData({ params })

  if (!data.thisIssueData || !data.pageData || !data.permalink) {
    return notFound()
  }

  return <Page {...data} />
}

interface PageParams {
  slug: string
}

async function getData({ params }: { params: PageParams }) {
  const slug = String(params.slug)

  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const pageData = await getPageData(slug)
  if (!pageData) {
    return notFound()
  }

  const aboutPageData = await getPageData("about")
  if (!aboutPageData) {
    return notFound()
  }

  const quotes = aboutPageData.quotes

  const allPagesData = await getAllPages()
  if (!allPagesData) {
    return notFound()
  }

  const thisIssueData = await getCurrentIssueData()
  if (!thisIssueData) {
    return notFound()
  }

  const permalink = getPermalink({
    slug: pageData.slug,
    type: PageType.ChildPage,
  })

  return {
    navData,
    pageData,
    quotes,
    allPagesData,
    thisIssueData,
    permalink,
  }
}
