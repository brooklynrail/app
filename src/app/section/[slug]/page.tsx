import { notFound } from "next/navigation"
import { getPermalink, PageType } from "../../../../lib/utils"
import { getArticlesBySection, getSectionData } from "../../../../lib/utils/sections/utils"

import Section from "@/app/components/section"
import { getNavData } from "../../../../lib/utils/homepage"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 42600 : 0

export default async function SectionPage({ params }: { params: SectionParams }) {
  const data = await getData({ params })

  if (!data.sectionData) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <Section {...data} />
}

interface SectionParams {
  slug: string
}

async function getData({ params }: { params: SectionParams }) {
  const slug = params.slug.toString()

  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const sectionData = await getSectionData({ slug: slug })
  if (!sectionData) {
    return notFound()
  }
  const articlesData = await getArticlesBySection({ slug: slug, limit: 32, offset: 0 })
  if (!articlesData) {
    return notFound()
  }

  const permalink = getPermalink({
    sectionSlug: slug,
    type: PageType.SuperSection,
  })

  return {
    navData,
    sectionData,
    articlesData,
    permalink,
  }
}
