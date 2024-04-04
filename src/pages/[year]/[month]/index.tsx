import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import IssuePage from "@/components/issuePage"
import { IssuePageProps } from "@/pages"
import {
  PageType,
  getAds,
  getArticles,
  getIssueData,
  getIssues,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
} from "../../../../lib/utils"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"

function Issue(props: IssuePageProps) {
  const { title, cover_1, issue_number, slug } = props.currentIssue
  const ogtitle = `${stripHtml(title).result} | The Brooklyn Rail`
  const ogdescription = `Issue #${issue_number} of The Brooklyn Rail`
  const ogimageprops = { ogimage: cover_1, title }
  const ogimages = getOGImage(ogimageprops)

  return (
    <>
      <NextSeo
        title={ogtitle}
        description={ogdescription}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/`}
        openGraph={{
          title: ogtitle,
          description: ogdescription,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/`,
          images: ogimages,
          type: `website`,
        }}
      />
      <IssuePage {...props} />
    </>
  )
}

export default Issue

export async function getStaticProps({ params }: any) {
  const year = params.year
  const month = params.month

  const allIssues = await getIssues()
  const issueData = await getIssueData(year, month)

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(issueData.id)

  // Filter the articles within each section to only include those that are in the current issue
  currentSections.map((section: any) => {
    const filteredArticles = section.articles.filter(
      (article: any) => article.articles_slug && article.articles_slug.issues.issues_id.id === issueData.id,
    )
    return { ...section, articles: filteredArticles }
  })

  // Sort the articles within each section by their `sort` order
  // Note: the `sort` field is nested under `articles_slug`
  currentSections.forEach((section: any) => {
    section.articles.sort((a: any, b: any) => a.articles_slug.sort - b.articles_slug.sort)
  })

  const currentArticles = await getArticles(issueData.id)

  // Get the published Ads
  const ads = await getAds()

  // Get only the articles from `currentArticles` that have a `slideshow_image`
  const currentSlides = currentArticles.filter((article) => {
    return article.slideshow_image
  })

  const currentIssue = issueData

  const permalink = getPermalink({
    year: currentIssue.year,
    month: currentIssue.month,
    type: PageType.Issue,
  })

  return {
    props: {
      allIssues,
      currentIssue,
      currentSections,
      currentArticles,
      currentSlides,
      ads,
      permalink,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const issues = await directus.request(
    readItems("issues", {
      fields: ["year", "month"],
    }),
  )

  const paths = issues.map((issue) => {
    const month = issue.month
    return {
      params: {
        year: String(issue.year),
        month: month < 10 ? `0${month}` : month,
      },
    }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
