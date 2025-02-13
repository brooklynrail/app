import { Contributors, Issues } from "../../../lib/types"
import { getAllContributors, getCurrentIssueData, getPermalink, PageType } from "../../../lib/utils"
import { notFound } from "next/navigation"
import ContributorsPage from "../components/contributors"
import { Metadata } from "next"

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_BRANCH_URL}`
  const navData = await fetch(`${baseUrl}/api/nav/`, {
    cache: "no-store", // Avoids caching issues during SSR
  }).then((res) => res.json())
  console.log("Nav data", navData)

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
