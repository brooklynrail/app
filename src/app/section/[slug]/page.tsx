import { notFound } from "next/navigation"
import { Issues, Sections } from "../../../../lib/types"
import { getAllIssues, getPermalink, getSectionData, PageType } from "../../../../lib/utils"
import ArchivePage from "../../components/archive"
import { Metadata, Viewport } from "next"
import SearchPage from "../../components/search"
import Section from "@/app/components/section"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 600 : 0

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
  const sectionData = await getSectionData({ slug: slug })

  if (!sectionData) {
    return notFound()
  }

  const permalink = getPermalink({
    sectionSlug: slug,
    type: PageType.SuperSection,
  })

  return {
    sectionData,
    permalink,
  }
}
