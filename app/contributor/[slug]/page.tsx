import ContributorPage from "@/components/contributor"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getContributor } from "@/lib/utils/people"
import { getRedirect, RedirectTypes } from "@/lib/utils/redirects"
import { AddRedirect } from "@/app/actions/redirect"

interface ContributorParams {
  slug: string
}

export async function generateMetadata(props: { params: Promise<ContributorParams> }): Promise<Metadata> {
  const data = await getData({ params: await props.params })

  if (!data.contributorData || !data.permalink) {
    return {}
  }

  const { first_name, last_name, bio } = data.contributorData
  const ogtitle = `${first_name && stripHtml(first_name).result} ${last_name && stripHtml(last_name).result}`
  const ogdescription = `${bio && stripHtml(bio).result}`
  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

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
      images: share_card,
    },
    twitter: {
      images: share_card,
    },
  }
}

export default async function Contributor(props: { params: Promise<ContributorParams> }) {
  const data = await getData({ params: await props.params })
  const contributorData = data.contributorData
  const currentArticles = data.articles

  if (!currentArticles || currentArticles.length === 0) {
    return <></>
  }

  return <ContributorPage contributorData={contributorData} currentArticles={currentArticles} navData={data.navData} />
}

async function getData({ params }: { params: ContributorParams }) {
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
    // If the slug is incorrect, but the dates in the URL are correct,
    // check if a redirect exists that includes this slug
    // Note: this does not account for changes to the year/month of the URL
    const redirect = await getRedirect(RedirectTypes.Contributor, slug)
    if (redirect) {
      await AddRedirect(redirect)
    }
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

export async function generateStaticParams() {
  return []
}
