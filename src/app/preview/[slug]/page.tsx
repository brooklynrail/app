import { stripHtml } from "string-strip-html"
import { PageType, getArticle, getOGImage, getPermalink, getPreviewPassword } from "../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../lib/types"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import ArticlePreview from "@/app/components/preview/article"

export interface ArticlePreviewProps {
  articleData: Articles
  currentIssue?: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: PreviewParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag } = data.articleData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(excerpt).result}`
  const ogimageprops = { ogimage: featured_image, title }
  const ogimages = getOGImage(ogimageprops)

  const authors = contributors.map((contributor: any) => {
    const contribPermalink = getPermalink({ type: PageType.Contributor, slug: contributor.contributors_id.slug })
    return contribPermalink
  })

  return {
    title: `PREVIEW: ${ogtitle} `,
    description: ogdescription,
    alternates: {
      canonical: `${data.permalink}`,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title: `${ogtitle} | The Brooklyn Rail`,
      description: ogdescription,
      url: data.permalink,
      images: ogimages,
      type: `article`,
      publishedTime: date_created,
      modifiedTime: date_updated,
      section: data.currentSection && data.currentSection.name,
      authors: authors,
    },
  }
}

export default async function ArticlePreviewPage({ params }: { params: PreviewParams }) {
  const { isEnabled } = draftMode()

  const data = await getData({ params })

  const { articleData, currentIssue, permalink, currentSection, directusUrl, previewPassword } = data
  if (!articleData || !permalink || !previewPassword || !directusUrl) {
    return { props: { errorCode: 400, errorMessage: "This article does not exist" } }
  }

  const articlePreviewProps = {
    articleData,
    currentIssue,
    permalink,
    currentSection,
    directusUrl,
    previewPassword,
    isEnabled,
  }

  return <ArticlePreview {...articlePreviewProps} />
}

interface PreviewParams {
  year: string
  month: string
  section: string
  slug: string
}

async function getData({ params }: { params: PreviewParams }) {
  const slug = String(params.slug)

  const articleData = await getArticle(slug, "draft")

  const currentIssue = articleData.issues && articleData.issues[0] && articleData.issues[0].issues_id
  const currentSection = articleData.sections && articleData.sections[0] && articleData.sections[0].sections_id

  const permalink = getPermalink({
    slug: articleData.slug,
    type: PageType.Preview,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    articleData,
    currentSection,
    currentIssue,
    permalink,
    previewPassword,
    directusUrl,
  }
}
