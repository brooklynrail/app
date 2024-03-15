import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"
import Error from "next/error"
import { PageType, getArticle, getArticles, getIssueData, getOGImage, getPermalink } from "../../../../lib/utils"
import { Articles, Issues, Sections } from "../../../../lib/types"
import ArticlePreview from "@/components/preview/article"

export interface ArticlePreviewProps {
  article: Articles
  currentIssue?: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}

function ArticlePreviewController(props: ArticlePreviewProps) {
  if (props.errorCode && props.errorMessage) {
    return <Error statusCode={props.errorCode} title={props.errorMessage} />
  }
  const { article, permalink, currentSection } = props
  const { title, excerpt, featured_image, date_created, date_updated, contributors, title_tag } = article
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
        title={`${ogtitle} | The Brooklyn Rail`}
        description={ogdescription}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/${permalink}`}
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

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context: any) {
  const slug: string = context.params.slug

  const article = await getArticle(slug)

  const currentIssue: Issues | undefined = article.issues && article.issues[0] && article.issues[0].issues_id
  const currentSection: Sections | undefined =
    article.sections && article.sections[0] && article.sections[0].sections_id

  // const errorCode = currentSection.slug != section && "Section not found"
  // if (errorCode) {
  //   return { props: { errorCode: 404, errorMessage: errorCode } }
  // }

  const permalink = getPermalink({
    slug: article.slug,
    type: PageType.Preview,
  })

  return {
    props: {
      article,
      currentSection: currentSection ? currentSection : null,
      currentIssue: currentIssue ? currentIssue : null,
      permalink,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 2, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const articles = await directus.request(
    readItems("articles", {
      fields: [
        "slug",
        {
          sections: [
            {
              sections_id: ["slug"],
            },
          ],
        },
        {
          issues: [
            {
              issues_id: ["year", "month"],
            },
          ],
        },
      ],
      filter: {
        _and: [{ status: { _eq: "draft" } }],
      },
    }),
  )

  const paths = articles.map((article) => ({
    params: {
      slug: article.slug,
    },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
