import { notFound } from "next/navigation"
import { getAllIssues, getPermalink, PageType } from "../../../lib/utils"
import ArchivePage from "../components/archive"
import { Metadata } from "next"

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
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <ArchivePage {...data} />
}

async function getData() {
  let navData
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nav/`, {
      next: { revalidate: 86400, tags: ["homepage"] }, // 24 hours in seconds (24 * 60 * 60)
    })

    if (!response.ok) {
      console.error(`Nav API returned status: ${response.status}`)
      navData = {} // Provide a fallback value
    } else {
      navData = await response.json()
    }
  } catch (error) {
    console.error("Error fetching nav data:", error)
    navData = {} // Provide a fallback value
  }

  const allIssuesData = await getAllIssues()
  if (!allIssuesData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Archive,
  })

  return {
    navData,
    issues: allIssuesData,
    permalink,
  }
}
