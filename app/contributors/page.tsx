import { notFound } from "next/navigation"
import { Contributors } from "@/lib/types"
import { getCurrentIssueData, getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import Metadata from "next"
import ContributorsPage from "@/components/contributors"
import { getAllContributors } from "@/lib/utils/people"

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data) {
    return {}
  }
  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

  const ogtitle = "All Contributors"
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

export default async function ContributorsIndex() {
  const data = await getData()

  return (
    <ContributorsPage
      thisIssueData={data.thisIssueData}
      allContributors={data.allContributors}
      navData={data.navData}
    />
  )
}

async function getData() {
  let allContributors = await getAllContributors()
  if (!allContributors || allContributors.length === 0) {
    return notFound()
  }
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }
  // filter out contributors with no articles
  allContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)
  const thisIssueData = await getCurrentIssueData()

  if (!thisIssueData) {
    return notFound()
  }

  const permalink = getPermalink({ type: PageType.Contributors })

  return {
    navData,
    thisIssueData,
    allContributors,
    permalink,
  }
}
