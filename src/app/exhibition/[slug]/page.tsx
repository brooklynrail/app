import { notFound } from "next/navigation"
import { getPermalink, PageType } from "../../../../lib/utils"
import { getNavData } from "../../../../lib/utils/homepage"
import { getExhibition } from "../../../../lib/utils/exhibitions"
import ExhibitionPage from "@/app/components/exhibition"
import { Exhibitions, Homepage } from "../../../../lib/types"

export interface ExhibitionProps {
  navData: Homepage
  exhibitionData: Exhibitions
  permalink: string
}

interface ExhibitionParams {
  slug: string
}

export default async function Exhibition({ params }: { params: ExhibitionParams }) {
  const data = await getData({ params })

  if (!data.exhibitionData || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <ExhibitionPage {...data} />
}

async function getData({ params }: { params: ExhibitionParams }) {
  const slug: string = params.slug.toString()
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const exhibitionData = await getExhibition(slug)

  if (!exhibitionData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Exhibition,
    slug: "test",
  })

  return {
    navData,
    exhibitionData,
    permalink,
  }
}
