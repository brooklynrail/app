import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Link from "next/link"
import { Articles, Issues, Sections } from "@/lib/types"
import { PageType, getPermalink } from "@/lib/utils"
import PromoSlim from "./slim"

interface TableOfContentsProps {
  articles: Articles[]
  currentSections?: Array<Sections>
  permalink: string
  year: number
  month: number
  issueSlug: string
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

  const tributes: string[] = []
  if (section.slug === "in-memoriam") {
    const inMemoriamArticles = articles.filter((article: Articles) => {
      if (article.tribute && !tributes.includes(article.tribute.slug)) {
        tributes.push(article.tribute.slug)
        return article
      }
      if (!article.tribute) {
        return article
      }
    })
    articles.length = 0
    articles.push(...inMemoriamArticles)
  }

  return (
    <div className="tablet-lg:px-6 py-6 space-y-3">
      <h3 className="font-medium text-lg uppercase">
        <Link href={sectionPermalink} title={`Go to ${sectionName}`}>
          {sectionName}
        </Link>
      </h3>

      <ul className="space-y-3 tablet-lg:space-y-1">
        {articles.map((article: Articles, i: number) => {
          let permalink = getPermalink({
            year: year,
            month: month,
            section: article.section.slug,
            slug: article.slug,
            type: PageType.Article,
          })

          if (article.status === "draft") {
            permalink = getPermalink({
              articleId: article.id,
              type: PageType.PreviewArticle,
            })
          }

          if (article.tribute && section.slug === "in-memoriam") {
            permalink = getPermalink({
              tributeSlug: article.tribute.slug,
              type: PageType.Tribute,
            })
            return (
              <li key={`toc-article-${i}`} className={`text-xs`} itemType="http://schema.org/Article">
                <h4 className="text-xl">
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
  const { articles, currentSections, permalink, year, month, issueSlug } = props

  const currentArticles = articles

  return (
    <div className="border-t rail-border tablet-lg:border-t-0">
      <div className="divide-y rail-divide">
        {currentSections &&
          currentSections.map((section, i) => {
            // Filter the currentArticles to get only the articles in the current section
            const articles = currentArticles.filter((articleIssue: Articles) => {
              return articleIssue.section.slug === section.slug
            })
            if (articles.length === 0) {
              return null
            }
            return (
              <IssueSection
                key={`toc-section-${i}`}
                section={section}
                articles={articles}
                permalink={permalink}
                year={year}
                month={month}
                issueSlug={issueSlug}
              />
            )
          })}
      </div>
    </div>
  )
}

export default TableOfContents
