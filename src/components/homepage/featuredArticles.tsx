import PromoStandard from "../promo/standard"
import { Articles, Sections } from "../../../lib/types"

interface FeaturedArticlesProps {
  currentSections: Array<Sections>
  dateSlug: string
}
const FeaturedArticles = (props: FeaturedArticlesProps) => {
  const { currentSections, dateSlug } = props

  // Get only the Featured articles from each section in currentSections
  const featuredArticles: Array<Articles> = []
  currentSections.forEach((section) => {
    section.articles.forEach((article) => {
      if (article.articles_slug.featured) {
        featuredArticles.push(article.articles_slug)
      }
    })
  })

  return (
    <section className="collection">
      {featuredArticles.map((article: any, i: number) => {
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
