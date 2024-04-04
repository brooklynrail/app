import Link from "next/link"
import { ArticlesIssues, Sections } from "../../../lib/types"
import { PageType, getPermalink } from "../../../lib/utils"
import PromoSlim from "../promo/slim"

interface TableOfContentsProps {
  currentSections: Array<Sections>
  currentArticles: ArticlesIssues[]
  permalink: string
  year: number
  month: number
}

interface IssueSectionProps {
  section: Sections
  permalink: string
  articles: ArticlesIssues[]
  year: number
  month: number
}
const IssueSection = (props: IssueSectionProps) => {
  const { section, articles, year, month } = props
  const sectionName = section.name

  const sectionPermalink = getPermalink({
    year: year,
    month: month,
    section: section.slug,
    type: PageType.Section,
  })

  return (
    <>
      <h3>
        <Link href={sectionPermalink} title={`Go to ${sectionName}`}>
          {sectionName}
        </Link>
      </h3>
      <ul>
        {articles.map((articleIssue: ArticlesIssues, i: number) => {
          const order = articleIssue.order
          const article = articleIssue.articles_slug
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.sections[0].sections_id.slug,
            slug: article.slug,
            type: PageType.Article,
          })
          return <PromoSlim key={`toc-article-${i}`} article={article} permalink={permalink} order={order} />
        })}
      </ul>
    </>
  )
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { currentSections, currentArticles, permalink, year, month } = props

  return (
    <div className="collection table-of-contents">
      <h2>Table of Contents</h2>
      {currentSections.map((section, i) => {
        // Filter the currentArticles to get only the articles in the current section
        const articles = currentArticles.filter((articleIssue: ArticlesIssues) => {
          return articleIssue.articles_slug.sections[0].sections_id.slug === section.slug
        })
        return (
          <IssueSection
            key={`toc-section-${i}`}
            section={section}
            articles={articles}
            permalink={permalink}
            year={year}
            month={month}
          />
        )
      })}
    </div>
  )
}

export default TableOfContents
