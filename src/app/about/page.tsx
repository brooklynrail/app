import { notFound } from "next/navigation"
import { Issues } from "../../../lib/types"
import { getPermalink, PageType } from "../../../lib/utils"
import { getNavData } from "../../../lib/utils/homepage"
import { getAllPages, getPageData } from "../../../lib/utils/pages"
import Page from "../components/page"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 48000 : 0

interface PageParams {
  slug: string
  thisIssueData: Issues
}

export default async function AboutPage({ params }: { params: PageParams }) {
  const data = await getData()
  if (!data.pageData || !data.permalink) {
    return notFound()
  }

  return <Page {...data} />
}

interface PageParams {
  slug: string
}

async function getData() {
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const pageData = await getPageData("about")
  if (!pageData) {
    return notFound()
  }

  const quotes = pageData.quotes

  const allPagesData = await getAllPages()
  if (!allPagesData) {
    return notFound()
  }

  const permalink = getPermalink({
    slug: pageData.slug,
    type: PageType.Page,
  })

  return {
    navData,
    quotes,
    pageData,
    allPagesData,
    permalink,
  }
}
