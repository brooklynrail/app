import parse from "html-react-parser"
import { ArticlesContributors, Contributors } from "../../../../lib/types"
import { getAllContributors, getContributor, getPermalink, PageType } from "../../../../lib/utils"
import PromoSection from "@/app/components/promo/section"

export default async function Contributor({ params }: { params: ContributorsParams }) {
  const data = await getData({ params })
  const contributorData = data.props.contributorData
  const currentArticles = contributorData.articles

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

  return (
    <>
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">
          <header className="section">
            <h2>
              {contributorData.first_name} {contributorData.last_name}
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
  const contributorData: Contributors = await getContributor(slug)
  const permalink = getPermalink({
    slug: contributorData.slug,
    type: PageType.Contributor,
  })
  return {
    props: {
      contributorData,
      permalink,
    },
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
