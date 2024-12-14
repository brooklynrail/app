import { Contributors, Issues } from "../../../lib/types"
import { getAllContributors, getCurrentIssueData, getPermalink, PageType } from "../../../lib/utils"
import { notFound } from "next/navigation"
import ContributorsPage from "../components/contributors"
import { getNavData } from "../../../lib/utils/homepage"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data) {
    return {}
  }

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
