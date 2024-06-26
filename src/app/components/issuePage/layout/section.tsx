import { ArticlesIssues } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import PromoSection from "../../promo/section"

import { LayoutProps } from "./issue"

const SectionLayout = (props: LayoutProps) => {
  const { issueData, currentSection } = props

  if (!currentSection) {
    return <></>
  }

  const { year, month } = issueData

  // get the articles that belong to the current section
  const currentArticles = issueData.articles.filter((article: ArticlesIssues) => {
    return article.articles_slug.sections[0].sections_id.slug === currentSection.slug
  })

  const allArticles = (
    <section className="collection">
      {currentArticles.map((articleIssue: ArticlesIssues, i: number) => {
        const order = articleIssue.order
        const article = articleIssue.articles_slug
        const permalink = getPermalink({
          year: year,
          month: month,
          section: article.sections[0].sections_id.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        const sectionPermalink = getPermalink({
          year: year,
          month: month,
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
            order={order}
          />
        )
      })}
    </section>
  )

  return (
    <div className="grid-col-8">
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">
          <header className="section">
            <h2>{currentSection.name}</h2>
          </header>
        </div>
      </div>
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">{allArticles}</div>
      </div>
    </div>
  )
}

export default SectionLayout
