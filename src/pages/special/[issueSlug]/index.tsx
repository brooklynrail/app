import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import IssuePage from "@/components/issuePage"
import { IssuePageProps } from "@/pages"
import {
  PageType,
  getAds,
  getIssueData,
  getIssues,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
} from "../../../../lib/utils"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"
import { ArticlesIssues } from "../../../../lib/types"

function SpecialIssue(props: IssuePageProps) {
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
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/special/${slug}/`}
        openGraph={{
          title: ogtitle,
          description: ogdescription,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/special/${slug}/`,
          images: ogimages,
          type: `website`,
        }}
      />
      <IssuePage {...props} />
    </>
  )
}

export default SpecialIssue

export async function getStaticProps({ params }: any) {
  const issueSlug: string = params.issueSlug

  const allIssues = await getIssues()
  const issueData = await getIssueData({ year: undefined, month: undefined, slug: issueSlug })

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(issueData.id)

  const currentArticles = issueData.articles

  // Get the published Ads
  const ads = await getAds()

  // Filter the currentArticles to get only the articles with a slideshow image
  const currentSlides: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.slideshow_image) {
      currentSlides.push(articleIssue)
    }
  })

  const currentIssue = issueData

  const permalink = getPermalink({
    issueSlug: currentIssue.slug,
    type: PageType.SpecialIssue,
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
      fields: ["slug", "special_issue"],
    }),
  )
  const specialIssues = issues.filter((issue) => issue.special_issue)

  const paths = specialIssues.map((issue) => {
    return {
      params: {
        issueSlug: issue.slug,
      },
    }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
