import ExhibitionPage from "@/components/exhibition"
import { ExhibitionProps } from "@/lib/railTypes"
import { getOGImage, getPermalink, PageType } from "@/lib/utils"
import { getAllExhibitions, getExhibition } from "@/lib/utils/exhibitions"
import { getNavData } from "@/lib/utils/homepage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface ExhibitionParams {
  slug: string
}

// Page Configuration
export const revalidate = 86400 // revalidate every day

// Metadata Generation
export async function generateMetadata(props: { params: Promise<ExhibitionParams> }): Promise<Metadata> {
  const params = await props.params
  const data = await getData(params)

  if (!data?.exhibitionData) {
    return {}
  }

  const { title, summary, date_created, date_updated, title_tag, featured_image } = data.exhibitionData

  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = stripHtml(summary).result
  const ogimages = getOGImage({ ogimage: featured_image, title })

  return {
    title: ogtitle,
    description: ogdescription,
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: ogtitle,
      description: ogdescription,
      url: data.permalink,
      images: ogimages,
      type: "article",
      publishedTime: date_created,
      modifiedTime: date_updated,
    },
    twitter: {
      images: ogimages,
    },
  }
}

// Main Page Component
export default async function Exhibition(props: { params: Promise<ExhibitionParams> }) {
  const params = await props.params
  const data = await getData(params)

  if (!data?.exhibitionData) {
    notFound()
  }

  return <ExhibitionPage {...data} />
}

// Data Fetching
async function getData(params: ExhibitionParams): Promise<ExhibitionProps | undefined> {
  try {
    const slug = params.slug.toString()

    const [navData, exhibitionData] = await Promise.all([getNavData(), getExhibition(slug)])

    if (!navData || !exhibitionData) {
      return undefined
    }

    const permalink = getPermalink({
      type: PageType.Exhibition,
      slug: exhibitionData.slug,
    })

    const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/exhibition/${exhibitionData.id}/`

    return {
      navData,
      exhibitionData,
      permalink,
      previewURL,
    }
  } catch (error) {
    console.error("Error fetching exhibition data:", error)
    return undefined
  }
}

export async function generateStaticParams() {
  const allExhibitions = await getAllExhibitions()
  if (!allExhibitions) {
    return []
  }
  return allExhibitions.map((exhibition) => ({
    slug: exhibition.slug,
  }))
}
