import PromoStandard from "../promo/standard"

const InConversation = (props: any) => {
  const { inConversation, currentIssue } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

  return (
    <section className="collection">
      {inConversation.map((article: any, i: number) => {
        return <PromoStandard key={i} article={article} dateSlug={dateSlug} />
      })}
    </section>
  )
}

export default InConversation
