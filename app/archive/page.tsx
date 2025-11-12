import ArchivePage from "@/components/archive"
import { ArchivePageProps } from "@/lib/railTypes"
import { getAllIssues, getPermalink, PageType } from "@/lib/utils"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 2592000 // 30 days

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()
  if (!data) {
    return {}
  }

  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`
  const ogtitle = "All Issues"

  return {
    title: ogtitle,
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: ogtitle,
      url: data.permalink,
      type: "website",
      images: share_card,
    },
    twitter: {
      images: share_card,
    },
  }
}

export default async function Archive() {
  const data = await getData()

  if (!data.issues || !data.permalink) {
    return notFound()
  }

  return <ArchivePage {...data} />
}

async function getData(): Promise<ArchivePageProps> {
  const navData = await getNavDataFromAPI()
  if (!navData) {
    return notFound()
  }

  const allIssuesData = await getAllIssues()
  if (!allIssuesData) {
    return notFound()
  }

  return {
    navData,
    issues: allIssuesData,
    permalink: getPermalink({ type: PageType.Archive }),
  }
}
