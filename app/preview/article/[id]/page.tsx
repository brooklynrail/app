import ArticlePreview from "@/components/preview/article"
import { ArticlePreviewProps } from "@/lib/railTypes"
import { PageType, getOGImage, getPermalink } from "@/lib/utils"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { getPreviewArticle, getPreviewPassword } from "@/lib/utils/preview"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface PreviewParams {
  id: string
}

// Force dynamic rendering, no caching
export const dynamic = "force-dynamic"
export const revalidate = 0

// Metadata Generation
export async function generateMetadata(props: { params: Promise<PreviewParams> }): Promise<Metadata> {
  const params = await props.params;
  const data = await getData(params)

  if (!data?.articleData) {
    return {}
  }

  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag } = data.articleData
  const ogtitle = `PREVIEW: ${title_tag ? stripHtml(title_tag).result : stripHtml(title).result}`
  const ogdescription = stripHtml(excerpt).result

  return {
    title: ogtitle,
    description: ogdescription,
    alternates: {
      canonical: data.permalink,
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
      title: ogtitle,
      description: ogdescription,
      url: data.permalink,
      images: getOGImage({ ogimage: featured_image, title }),
      type: "article",
      publishedTime: date_created,
      modifiedTime: date_updated,
      section: data.currentSection?.name,
    },
  }
}

// Main Page Component
export default async function ArticlePreviewPage(props: { params: Promise<PreviewParams> }) {
  const params = await props.params;
  const isEnabled = await draftMode()

  // Verify draft mode is enabled
  if (!isEnabled) {
    redirect("/")
  }

  const data = await getData(params)

  if (!data?.articleData || !data.previewPassword) {
    notFound()
  }

  return <ArticlePreview {...data} />
}

// Data Fetching
async function getData(params: PreviewParams): Promise<ArticlePreviewProps | undefined> {
  try {
    const id = String(params.id)

    // Parallel fetch of initial data
    const [navData, articleData, previewPassword] = await Promise.all([
      getNavDataFromAPI(),
      getPreviewArticle(id),
      getPreviewPassword(),
    ])

    if (!navData || !articleData || !previewPassword) {
      return undefined
    }

    const thisIssueData = articleData.issue
    const currentSection = articleData.section
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

    if (!directusUrl) {
      throw new Error("Missing DIRECTUS_URL environment variable")
    }

    const permalink = getPermalink({
      articleId: articleData.id,
      type: PageType.PreviewArticle,
    })

    return {
      navData,
      articleData,
      currentSection,
      thisIssueData,
      permalink,
      previewPassword,
      directusUrl,
      isEnabled: true,
    }
  } catch (error) {
    console.error("Error fetching preview article data:", error)
    return undefined
  }
}
