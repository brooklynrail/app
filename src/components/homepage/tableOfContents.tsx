import { Articles, ArticlesIssues, Issues, Sections } from "../../../lib/types"
import PromoSlim from "../promo/slim"

interface TableOfContentsProps {
  currentIssue: Issues
  currentSections: Array<Sections>
  currentArticles: Array<Articles>
  dateSlug: string
}

interface IssueSectionProps {
  section: Sections
  dateSlug: string
  articles: Array<any>
}
const IssueSection = (props: IssueSectionProps) => {
  const { section, dateSlug, articles } = props
  const sectionSlug = section.slug
  const sectionName = section.name

  const permalink = `/${dateSlug}/${sectionSlug}`
  return (
    <>
      <h3>
        <a href={permalink} title={`Go to ${sectionName}`}>
          {sectionName}
        </a>
      </h3>
      <ul>
        {articles.map((article, i) => {
          return <PromoSlim key={`toc-article-${i}`} article={article} dateSlug={dateSlug} />
        })}
      </ul>
    </>
  )
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { currentSections, currentIssue, currentArticles, dateSlug } = props

  return (
    <div className="collection table-of-contents">
      <h2>Table of Contents</h2>
      {currentSections.map((section, i) => {
        // get the articles from the currentArticles that are in the `section.slug`
        const articles = currentArticles.filter((article) => {
          return article.sections[0].sections_id.slug === section.slug
        })
        return <IssueSection key={`toc-section-${i}`} section={section} articles={articles} dateSlug={dateSlug} />
      })}
    </div>
  )
}

export default TableOfContents
