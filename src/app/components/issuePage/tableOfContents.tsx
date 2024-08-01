import Link from "next/link"
import { Articles, Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"
import PromoSlim from "../promo/slim"

interface TableOfContentsProps {
  issueData: Issues
  currentSections?: Array<Sections>
  permalink: string
  year: number
  month: number
}

interface IssueSectionProps {
  section: Sections
  permalink: string
  articles: Articles[]
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
        {articles.map((article: Articles, i: number) => {
          const order = article.sort
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.section.slug,
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
  const { issueData, currentSections, permalink, year, month } = props

  const loading = <div className="loading">Loading...</div>

  const currentArticles = issueData.articles

  return (
    <div className="collection table-of-contents">
      <h2>Table of Contents</h2>
      {currentSections
        ? currentSections.map((section, i) => {
            // Filter the currentArticles to get only the articles in the current section
            const articles = currentArticles.filter((articleIssue: Articles) => {
              return articleIssue.section.slug === section.slug
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
          })
        : loading}
    </div>
  )
}

export default TableOfContents
