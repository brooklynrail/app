import PromoStandard from "../promo/standard"
import { Articles } from "../../../lib/types"
import { PromoProps } from "."

const FeaturedArticles = (props: PromoProps) => {
  const { dateSlug, currentArticles } = props

  // Get only the Featured articles from currentArticles
  const featuredArticles: Array<Articles> = []
  currentArticles.forEach((article: Articles) => {
    if (article.featured) {
      featuredArticles.push(article)
    }
  })

  return (
    <section className="collection">
      {featuredArticles.map((article: Articles, i: number) => {
        return (
          <PromoStandard
            key={`featured-${i}`}
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

export default FeaturedArticles
