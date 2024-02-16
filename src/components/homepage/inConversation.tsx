import { HomepageProps } from "@/pages"
import PromoStandard from "../promo/standard"

const InConversation = (props: HomepageProps) => {
  const { inConversation, dateSlug } = props

  return (
    <section className="collection">
      {inConversation.map((article: any, i: number) => {
        return (
          <PromoStandard
            key={`inconversation-${i}`}
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

export default InConversation
