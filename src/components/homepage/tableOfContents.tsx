import { Issues, Sections } from "../../../lib/types"
import PromoSlim from "../promo/slim"

interface TableOfContentsProps {
  currentIssue: Issues
  currentSections: Array<Sections>
  dateSlug: string
}

interface IssueSectionProps {
  section: Sections
  dateSlug: string
}
const IssueSection = (props: IssueSectionProps) => {
  const { section, dateSlug } = props
  const sectionSlug = section.slug
  const sectionName = section.name

  // const permalink = `/${dateSlug}/${sectionSlug}/${slug}`
  const permalink = `/${dateSlug}/${sectionSlug}`
  return (
    <>
      <h3>
        <a href={permalink} title={`Go to ${sectionName}`}>
          {sectionName}
        </a>
      </h3>
      <ul>
        {section.articles.map((article, i) => {
          return <PromoSlim key={`toc-article-${i}`} article={article.articles_slug} dateSlug={dateSlug} />
        })}
      </ul>
    </>
  )
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { currentIssue, currentSections, dateSlug } = props

  return (
    <div className="collection table-of-contents">
      <h2>Table of Contents</h2>
      {currentSections.map((section, i) => {
        return <IssueSection key={`toc-section-${i}`} section={section} dateSlug={dateSlug} />
      })}
    </div>
  )
}

export default TableOfContents
