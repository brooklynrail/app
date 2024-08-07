import { Articles } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import PromoSpecialSection from "../../promo/specialSection"
import SubscribeAd from "../subscribeAd"
import { LayoutProps } from "./issue"

const SpecialSection = (props: LayoutProps) => {
  const { issueData, currentSection } = props

  if (!currentSection) {
    return <></>
  }

  const { year, month } = issueData
  const currentArticles = issueData.articles

  const allArticles = (
    <section className="collection">
      {currentArticles.map((articleIssue: Articles, i: number) => {
        const order = articleIssue.sort
        const article = articleIssue
        const permalink = getPermalink({
          year: year,
          month: month,
          section: article.section.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        const sectionPermalink = getPermalink({
          year: year,
          month: month,
          section: article.section.slug,
          type: PageType.Section,
        })
        return (
          <PromoSpecialSection
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
      <SubscribeAd />
    </div>
  )
}

export default SpecialSection
