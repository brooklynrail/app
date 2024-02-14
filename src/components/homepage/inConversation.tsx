import { CoverImage } from "../issueRail"
import CoversPopup from "../issueRail/coversPopup"
import Footer from "../footer"

const PromoStandard = (props: any) => {
  const { title, excerpt, dateSlug, slug, sections } = props
  const sectionSlug = "art"
  const section = "Art"
  const kicker = "In Conversation"
  const permalink = `/${dateSlug}/${sectionSlug}/${slug}`

  return (
    <>
      <div className="promo promo-standard" itemType="http://schema.org/Article">
        <p className="article_type">
          <a className="section" href={`/${dateSlug}/${sectionSlug}`} title={`Go to the ${section} section`}>
            {section}
          </a>
          <span className="divider"></span>
          <span className="type">{kicker}</span>
        </p>
        <div className="media">
          <a href={permalink}>
            <img src="https://placehold.co/316x96/C57AFF/9D20FF" alt="" />
          </a>
        </div>
        <h4>
          <a href={permalink}>{title}</a>
        </h4>
        <p className="excerpt">{excerpt}</p>
      </div>
    </>
  )
}

const InConversation = (props: any) => {
  const { inConversation, currentIssue } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

  return (
    <section className="collection">
      {inConversation.map((article: any, i: number) => {
        return <PromoStandard key={i} {...article} dateSlug={dateSlug} />
      })}
    </section>
  )
}

export default InConversation
