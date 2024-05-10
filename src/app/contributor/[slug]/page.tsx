import parse from "html-react-parser"
import { ArticlesContributors, Contributors } from "../../../../lib/types"
import { getAllContributors, getContributor, getPermalink, PageType } from "../../../../lib/utils"
import PromoSection from "@/app/components/promo/section"
import { Metadata } from "next"
import { stripHtml } from "string-strip-html"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.contributorData || !data.permalink) {
    return {}
  }

  const { first_name, last_name, bio, date_updated, date_created } = data.contributorData
  const ogtitle = `${first_name && stripHtml(first_name).result} ${last_name && stripHtml(last_name).result}`
  const ogdescription = `${bio && stripHtml(bio).result}`

  return {
    title: `${ogtitle} | The Brooklyn Rail`,
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
      title: `${ogtitle} | The Brooklyn Rail`,
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

  if (!currentArticles) {
    return <></>
  }

  const allArticles = (
    <section className="collection">
      {currentArticles.map((articleContributor: ArticlesContributors, i: number) => {
        const article = articleContributor.articles_slug
        const issue = article.issues[0].issues_id
        const permalink = getPermalink({
          year: issue.year,
          month: issue.month,
          section: article.sections[0].sections_id.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        const sectionPermalink = getPermalink({
          year: issue.year,
          month: issue.month,
          section: article.sections[0].sections_id.slug,
          type: PageType.Section,
        })
        return (
          <PromoSection
            key={`article-${i}`}
            article={article}
            permalink={permalink}
            sectionPermalink={sectionPermalink}
            showImage={true}
            showSection={true}
          />
        )
      })}
    </section>
  )

  const first_name = contributorData.first_name ? parse(contributorData.first_name) : null
  const last_name = contributorData.last_name ? parse(contributorData.last_name) : null

  return (
    <>
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">
          <header className="section">
            <h2>
              {first_name} {last_name}
            </h2>
            {contributorData.bio && <div className="bio">{parse(contributorData.bio)}</div>}
          </header>
        </div>
      </div>
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">{allArticles}</div>
      </div>
    </>
  )
}

interface ContributorsParams {
  slug: string
}

async function getData({ params }: { params: ContributorsParams }) {
  const slug = params.slug

  // Get all contributors
  // NOTE: There are multiple contributors with the same slug
  // This returns all contributors with the same slug, but their specific name and bio information may be different
  const allContributors: Contributors[] = await getContributor(slug)

  // This gets the contributor with the greatest `old_id`, which assumes that this is the most recent version of this person's name and bio
  const contributorData = allContributors.reduce((prev, current) => {
    return prev.old_id > current.old_id ? prev : current
  })

  // Get all articles for this contributor
  // This is an array of all articles for all contributors with the same slug
  const allArticles = allContributors.flatMap((contributor) => contributor.articles)

  const permalink = getPermalink({
    slug: contributorData.slug,
    type: PageType.Contributor,
  })
  return {
    contributorData,
    articles: allArticles,
    permalink,
  }
}

export async function generateStaticParams() {
  const allContributors = await getAllContributors()

  return allContributors.map((contributor: Contributors) => {
    return {
      slug: contributor.slug,
    }
  })
}
