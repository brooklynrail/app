import { notFound } from "next/navigation"
import { getPermalink, PageType } from "../../../../lib/utils"
import { getArticlesBySection, getSectionData } from "../../../../lib/utils/sections"
import Section from "@/app/components/section"
import { getNavData } from "../../../../lib/utils/homepage"

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
  const { slug } = await params

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
