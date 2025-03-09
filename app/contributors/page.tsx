import ContributorsPage from "@/components/contributors"
import { ContributorsPageProps } from "@/lib/railTypes"
import { Contributors } from "@/lib/types"
import { getCurrentIssueData, getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getAllContributors } from "@/lib/utils/people"
import { Metadata } from "next"
import { notFound } from "next/navigation"

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

export default async function ContributorsController() {
  const data = await getData()
  return <ContributorsPage {...data} />
}

async function getData(): Promise<ContributorsPageProps> {
  const [navData, allContributors, thisIssueData] = await Promise.all([
    getNavData(),
    getAllContributors(),
    getCurrentIssueData(),
  ])

  if (!navData || !allContributors || !thisIssueData) {
    return notFound()
  }

  // Filter out contributors with no articles
  const filteredContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)

  return {
    navData,
    thisIssueData,
    allContributors: filteredContributors,
    permalink: getPermalink({ type: PageType.Contributors }),
  }
}
