import EventsPage from "@/components/events"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Exhibitions, Homepage } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getEventTypes, getPastEvents, getUpcomingEvents } from "@/lib/utils/events"
import { getNavData } from "@/lib/utils/homepage"
import { get } from "http"
import { getAllExhibitions } from "@/lib/utils/exhibitions"
import ExhibitionsPage from "@/components/exhibitions"

export interface ExhibitionsProps {
  navData: Homepage
  allExhibitions: Exhibitions[]
  permalink: string
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data || !data.permalink) {
    return {}
  }

  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

  const ogtitle = "Exhibitions - The Brooklyn Rail"

  return {
    title: `${ogtitle}`,
    alternates: {
      canonical: `${data.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
      url: data.permalink,
      images: share_card,
    },
    twitter: {
      images: share_card,
    },
  }
}

export default async function EventsController() {
  const data = await getData()
  if (!data.allExhibitions || !data.permalink) {
    return notFound()
  }

  return <ExhibitionsPage {...data} />
}

async function getData() {
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const allExhibitions = await getAllExhibitions()
  if (!allExhibitions) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Exhibitions,
  })

  return {
    navData,
    allExhibitions,
    permalink,
  }
}
