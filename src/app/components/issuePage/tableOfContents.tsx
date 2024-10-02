import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Link from "next/link"
import { Articles, Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"
import PromoSlim from "../promo/slim"

interface TableOfContentsProps {
  thisIssueData: Issues
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
  issueSlug: string
}
const IssueSection = (props: IssueSectionProps) => {
  const { section, articles, year, month, issueSlug } = props
  const sectionName = section.name

  const sectionPermalink = getPermalink({
    issueSlug: issueSlug,
    section: section.slug,
    type: PageType.Section,
  })

  let tributes: string[] = []
  if (section.slug === "in-memoriam") {
    const inMemoriamArticles = articles.filter((article: Articles) => {
      if (article.tribute && !tributes.includes(article.tribute.slug)) {
        tributes.push(article.tribute.slug)
        return article
      }
      if (!article.tribute) return article
    })
    articles.length = 0
    articles.push(...inMemoriamArticles)
  }

  return (
    <div className="py-1 pb-3 border-t-[1px] rail-border">
      <h3 className="font-bold text-sm px-1 pb-2">
        <Link prefetch={false} href={sectionPermalink} title={`Go to ${sectionName}`}>
          {sectionName}
        </Link>
      </h3>

      <ul>
        {articles.map((article: Articles, i: number) => {
          let permalink = getPermalink({
            year: year,
            month: month,
            section: article.section.slug,
            slug: article.slug,
            type: PageType.Article,
          })

          if (article.tribute && section.slug === "in-memoriam") {
            permalink = getPermalink({
              tributeSlug: article.tribute.slug,
              type: PageType.Tribute,
            })
            return (
              <li className={`py-1 px-1 text-xs`} itemType="http://schema.org/Article">
                <h4 className="font-medium inline">
                  <Link href={permalink} itemProp="name" title={`Visit ${stripHtml(article.tribute.title).result}`}>
                    {parse(article.tribute.title)}
                  </Link>
                </h4>
              </li>
            )
          }
          return <PromoSlim key={`toc-article-${i}`} article={article} permalink={permalink} prefetch={false} />
        })}
      </ul>
    </div>
  )
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { thisIssueData, currentSections, permalink, year, month } = props

  const loading = <div className="loading">Loading...</div>

  const currentArticles = thisIssueData.articles

  return (
    <div className="pt-12 pb-20">
      <h2 className="font-bold text-xl py-4">Table of Contents</h2>
      <div className="">
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
                  issueSlug={thisIssueData.slug}
                />
              )
            })
          : loading}
      </div>
    </div>
  )
}

export default TableOfContents
