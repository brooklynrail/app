import { notFound } from "next/navigation"
import { Homepage, HomepageBanners, Issues } from "../../lib/types"
import { getBaseUrl, getPermalink, PageType } from "../../lib/utils"
import { getCurrentIssueData, getHomepageData } from "../../lib/utils/homepage"
import HomePage from "./components/homepage"

export interface HomePageProps {
  navData: Homepage
  homepageData: Homepage
  currentIssue: Issues
  banners: HomepageBanners[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export default async function HomepagePage() {
  const data = await getData()

  return <HomePage {...data} />
}

async function getData() {
  const currentIssue = await getCurrentIssueData()
  if (!currentIssue) {
    return notFound()
  }

  const baseUrl = getBaseUrl()
  console.log("baseUrl ===========================", baseUrl)

  const isPreview = process.env.VERCEL_ENV === "preview"
  const authHeaders = isPreview
    ? {
        Authorization: `Basic ${Buffer.from(`${process.env.VERCEL_AUTH_USER}:${process.env.VERCEL_AUTH_PASS}`).toString(
          "base64",
        )}`,
      }
    : {}

  const navData = await fetch(`${baseUrl}/api/nav/`, {
    cache: "no-store",
    headers: authHeaders as HeadersInit,
  })
    .then(async (res) => {
      if (!res.ok) {
        // Log the actual response for debugging
        const text = await res.text()
        console.error("API Response:", text)
        throw new Error(`API returned ${res.status}: ${text}`)
      }
      return res.json()
    })
    .catch((error) => {
      console.error("Failed to fetch nav data:", error, "baseUrl:", baseUrl)
      return null
    })

  if (!navData) {
    return notFound()
  }

  const homepageData = await getHomepageData(currentIssue)
  if (!homepageData) {
    return notFound()
  }

  const banners = homepageData.banners
  if (!banners) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    navData,
    homepageData,
    banners,
    currentIssue,
    permalink,
  }
}
