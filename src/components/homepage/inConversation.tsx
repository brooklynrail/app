import { HomepageProps } from "@/pages"
import PromoStandard from "../promo/standard"

const InConversation = (props: HomepageProps) => {
  const { inConversation, currentIssue } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

  return (
    <section className="collection">
      {inConversation.map((article: any, i: number) => {
        return <PromoStandard key={i} article={article} dateSlug={dateSlug} showImage={true} showSection={true} />
      })}
    </section>
  )
}

export default InConversation
