import ExhibitionsPage from "@/components/exhibitions"
import { getPermalink, PageType } from "@/lib/utils"
import { getAllExhibitions } from "@/lib/utils/exhibitions"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data || !data.permalink) {
    return {}
  }

  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

  const ogtitle = "Exhibitions"

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

export default async function ExhibitionsController() {
  const data = await getData()
  if (!data.allExhibitions || !data.permalink) {
    return notFound()
  }

  return <ExhibitionsPage {...data} />
}

async function getData() {
  const navData = await getNavDataFromAPI()
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
