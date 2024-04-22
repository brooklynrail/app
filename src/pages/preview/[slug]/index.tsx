import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"
import Error from "next/error"
import { PageType, getArticle, getOGImage, getPermalink, getPreviewPassword } from "../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../lib/types"
import ArticlePreview from "@/components/preview/article"

export interface ArticlePreviewProps {
  articleData: Articles
  currentIssue?: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
  draftMode: boolean
  previewPassword: string
  directusUrl: string
}

function ArticlePreviewController(props: ArticlePreviewProps) {
  if (props.errorCode && props.errorMessage) {
    return <Error statusCode={props.errorCode} title={props.errorMessage} />
  }
  const { articleData, permalink, currentSection } = props
  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag } = articleData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(excerpt).result}`
  const ogimageprops = { ogimage: featured_image, title }
  const ogimages = getOGImage(ogimageprops)

  const authors = contributors.map((contributor: any) => {
    const contribPermalink = getPermalink({ type: PageType.Contributor, slug: contributor.contributors_id.slug })
    return contribPermalink
  })
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={`${ogtitle} | The Brooklyn Rail`}
        description={ogdescription}
        canonical={`${permalink}`}
        openGraph={{
          title: `${ogtitle} | The Brooklyn Rail`,
          description: ogdescription,
          url: permalink,
          images: ogimages,
          type: `article`,
          article: {
            publishedTime: date_created,
            modifiedTime: date_updated,
            section: currentSection && currentSection.name,
            authors: authors,
          },
        }}
      />
      <ArticlePreview {...props} />
    </>
  )
}

export default ArticlePreviewController

export async function getServerSideProps(context: any) {
  const slug: string = context.params.slug

  const articleData = await getArticle(slug)

  const currentIssue = articleData.issues && articleData.issues[0] && articleData.issues[0].issues_id
  const currentSection = articleData.sections && articleData.sections[0] && articleData.sections[0].sections_id

  const permalink = getPermalink({
    slug: articleData.slug,
    type: PageType.Preview,
  })

  const previewPassword = await getPreviewPassword()
  const draftMode = context.draftMode ? context.draftMode : false
  const directusUrl = process.env.BASE_DIRECTUS_URL

  return {
    props: {
      articleData,
      currentSection: currentSection ? currentSection : null,
      currentIssue: currentIssue ? currentIssue : null,
      permalink,
      draftMode: draftMode,
      previewPassword: previewPassword,
      directusUrl: directusUrl,
    },
  }
}
