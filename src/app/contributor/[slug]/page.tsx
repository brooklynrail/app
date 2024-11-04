import { getContributor, getCurrentIssueData, getPermalink, PageType } from "../../../../lib/utils"
import { Metadata } from "next"
import { stripHtml } from "string-strip-html"
import { notFound } from "next/navigation"
import ContributorPage from "@/app/components/contributor"
import { getNavData } from "../../../../lib/utils/homepage"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.contributorData || !data.permalink) {
    return {}
  }

  const { first_name, last_name, bio, date_updated, date_created } = data.contributorData
  const ogtitle = `${first_name && stripHtml(first_name).result} ${last_name && stripHtml(last_name).result}`
  const ogdescription = `${bio && stripHtml(bio).result}`

  return {
    title: `${ogtitle}`,
    description: ogdescription,
    creator: `${first_name && stripHtml(first_name).result} ${last_name && stripHtml(last_name).result}`,
    authors: [
      {
        name: `${first_name && stripHtml(first_name).result} ${last_name && stripHtml(last_name).result}`,
        url: data.permalink,
      },
    ],
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.permalink,
      type: `website`,
    },
  }
}

export default async function Contributor({ params }: { params: ContributorsParams }) {
  const data = await getData({ params })
  const contributorData = data.contributorData
  const currentArticles = data.articles

  if (!currentArticles || currentArticles.length === 0) {
    return <></>
  }

  return <ContributorPage contributorData={contributorData} currentArticles={currentArticles} navData={data.navData} />
}

interface ContributorsParams {
  slug: string
}

async function getData({ params }: { params: ContributorsParams }) {
  const slug = params.slug

  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  // Get all contributors
  // NOTE: There are multiple contributors with the same slug
  // This returns all contributors with the same slug, but their specific name and bio information may be different
  const allContributors = await getContributor(slug)
  if (!allContributors || allContributors.length == 0) {
    return notFound()
  }

  // This gets the contributor with the greatest `old_id`, which assumes that this is the most recent version of this person's name and bio
  const contributorData = allContributors.reduce((prev, current) => {
    return prev.old_id > current.old_id ? prev : current
  })

  // Get all articles for this contributor
  // This is an array of all articles for all contributors with the same slug
  const allArticles = allContributors.flatMap((contributor) => contributor.articles)

  // Sort the articles by the Issue published date, most recent first
  allArticles.sort((a, b) => {
    const dateA = a.articles_contributors_id?.issue?.published
      ? new Date(a.articles_contributors_id.issue.published).getTime()
      : -Infinity // Use -Infinity for null dates to sort them to the end
    const dateB = b.articles_contributors_id?.issue?.published
      ? new Date(b.articles_contributors_id.issue.published).getTime()
      : -Infinity

    return dateB - dateA // Sort descending by date
  })

  const permalink = getPermalink({
    slug: contributorData.slug,
    type: PageType.Contributor,
  })

  return {
    navData,
    contributorData,
    articles: allArticles,
    permalink,
  }
}

// export async function generateStaticParams() {
//   let allContributors = await getAllContributors()
//   // filter out contributors with no articles
//   allContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)
//   return allContributors.map((contributor: Contributors) => {
//     return {
//       slug: contributor.slug,
//     }
//   })
// }
