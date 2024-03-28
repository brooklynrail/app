import Link from "next/link"
import { Articles, ArticlesIssues, Issues, Sections } from "../../../lib/types"
import { PageType, getPermalink } from "../../../lib/utils"
import PromoSlim from "../promo/slim"

interface TableOfContentsProps {
  currentSections: Array<Sections>
  currentArticles: Array<Articles>
  permalink: string
  year: number
  month: number
}

interface IssueSectionProps {
  section: Sections
  permalink: string
  articles: Array<Articles>
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
        {articles.map((article, i) => {
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.sections[0].sections_id.slug,
            slug: article.slug,
            type: PageType.Article,
          })
          return <PromoSlim key={`toc-article-${i}`} article={article} permalink={permalink} />
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
        // get the articles from the currentArticles that are in the `section.slug`
        const articles = currentArticles.filter((article) => {
          return article.sections[0].sections_id.slug === section.slug
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
