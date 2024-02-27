import { Articles } from "../../../lib/types"
import { PromoProps } from "../issuePage"
import PromoSection from "../promo/section"

const SectionArticles = (props: PromoProps) => {
  const { dateSlug, currentArticles } = props

  return (
    <section className="collection">
      {currentArticles.map((article: Articles, i: number) => {
        return (
          <PromoSection
            key={`article-${i}`}
            article={article}
            dateSlug={dateSlug}
            showImage={true}
            showSection={true}
          />
        )
      })}
    </section>
  )
}

export default SectionArticles
