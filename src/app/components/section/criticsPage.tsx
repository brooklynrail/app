"use client"
import { SectionProps } from "."
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Excerpt from "../collections/promos/excerpt"
import Title from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import Frame from "../frames/frame"

// Group articles by issue
const groupByIssue = (articles: Articles[]) => {
  return articles.reduce((acc: Record<string, Articles[]>, article) => {
    const issueId = article.issue.id // or any unique identifier for the issue
    if (!acc[issueId]) {
      acc[issueId] = []
    }
    acc[issueId].push(article)
    return acc
  }, {})
}

const SectionCriticsPage = (props: SectionProps) => {
  const { articlesData } = props

  // Group articles by their respective issue
  const articlesByIssue = groupByIssue(articlesData)

  return (
    <div className="divide-y rail-divide">
      {Object.keys(articlesByIssue).map((issueId, index) => {
        const issueArticles = articlesByIssue[issueId]

        // get the first article where featured is true, if none, get the first article in the array
        const featuredArticle = issueArticles.find((article) => article.featured === true) || issueArticles[0]
        const featuredContributor = featuredArticle.contributors[0].contributors_id
        const guestCritic = featuredContributor
          ? `${featuredContributor.first_name} ${featuredContributor.last_name}`
          : null

        return (
          <div key={index} className="py-6">
            <div className="px-6 py-3">
              <h2 className="font-serif font-medium text-4xl">{`Guest Critic: ${guestCritic}`}</h2>
            </div>
            <div className="hidden tablet-lg:block">
              <Frame
                LeadPromo={<LeadPromo article={featuredArticle} />}
                Promos={<Promos articles={issueArticles} />}
                alt={false}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface LeadPromoProps {
  article: Articles
}
const LeadPromo = (props: LeadPromoProps) => {
  const { article } = props
  const { title, issue, section, featured_artwork, featured_image } = article

  const artwork = featured_artwork ? featured_artwork : featured_image
  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <>
      <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-6 gap-y-3">
        <div className="col-span-4 tablet:col-span-2" itemType="http://schema.org/Article">
          {artwork && (
            <div className="">
              <FeaturedImage image={artwork} hideCaption={true} title={title} permalink={permalink} />
            </div>
          )}
        </div>
        <div className="col-span-4 ">
          <div className="flex flex-col space-y-3">
            <div className="space-y-1">
              <Title
                h2
                title={article.title}
                permalink={permalink}
                classes="font-normal font-serif text-4xl desktop:text-5xl"
              />
            </div>
            <Excerpt excerpt={article.excerpt} classes="excerpt-lg" />
          </div>
        </div>
      </div>
    </>
  )
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, featured_artwork, featured_image } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className={`col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop:col-span-3`}>
        <div className="p-3 flex flex-col space-y-6">
          <div className="flex flex-col space-y-1">
            <Bylines article={article} type={BylineType.CriticsPagePromos} hideBy={true} />
            <Title title={article.title} permalink={permalink} classes="text-sm font-medium pl-3" />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default SectionCriticsPage
