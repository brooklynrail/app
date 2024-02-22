import { HomepageProps } from "@/pages"
import PromoStandard from "../promo/standard"

const FeaturedArticles = (props: HomepageProps) => {
  const { featuredArticles, dateSlug } = props

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
