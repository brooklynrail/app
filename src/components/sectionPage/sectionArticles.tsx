import { Articles } from "../../../lib/types"
import { PageType, getPermalink } from "../../../lib/utils"
import { PromoProps } from "../issuePage"
import PromoSection from "../promo/section"

const SectionArticles = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  return (
    <section className="collection">
      {currentArticles.map((article: Articles, i: number) => {
        const permalink = getPermalink({
          year: year,
          month: month,
          section: article.sections[0].sections_id.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        return (
          <PromoSection
            key={`article-${i}`}
            article={article}
            permalink={permalink}
            year={year}
            month={month}
            showImage={true}
            showSection={true}
          />
        )
      })}
    </section>
  )
}

export default SectionArticles
