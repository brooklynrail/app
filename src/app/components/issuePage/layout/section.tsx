import { Articles, Tributes } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import PromoSection from "../../promo/section"
import SubscribeAd from "../subscribeAd"
import parse from "html-react-parser"

import { LayoutProps } from "./issue"

const SectionLayout = (props: LayoutProps) => {
  const { thisIssueData, currentSection } = props

  if (!currentSection) {
    return <></>
  }

  const { year, month } = thisIssueData

  // get the articles that belong to the current section
  const currentArticles = thisIssueData.articles.filter((article: Articles) => {
    return article.section.slug === currentSection.slug
  })

  // If the current section is the Critics Page, add the Editors Message to the beginning of the currentArticles array
  if (currentSection.slug === "criticspage") {
    // find the articles that belong to the Editors Message section
    const editorsMessage = thisIssueData.articles.find((article: Articles) => {
      return article.section.slug === "editorsmessage"
    })
    // add those articles to the beginning of the currentArticles array
    if (editorsMessage) {
      currentArticles.unshift(editorsMessage)
    }
  }

  // if the current section is In Memoriam, show only the articles that do not have a article.tribute or have an empty article.tribute array
  let tributes: string[] = []
  if (currentSection.slug === "in-memoriam") {
    const inMemoriamArticles = currentArticles.filter((article: Articles) => {
      if (article.tribute) {
        // if the article.tribute is not included in the tributes array, return the article
        if (!tributes.includes(article.tribute.slug)) {
          // push the article.tribute to the tributes array without duplicates
          tributes.push(article.tribute.slug)
          return article
        }
      }
      // if the article.tribute is empty, return the article
      if (!article.tribute) {
        return article
      }
    })
    currentArticles.length = 0
    currentArticles.push(...inMemoriamArticles)
  }

  const description = currentSection.description ? (
    <div className={`description`}>{parse(currentSection.description)}</div>
  ) : null

  const AllArticles = () => {
    return (
      <section className="py-3 border-t-[1px] rail-border">
        <div className="divide-y-[1px] rail-divide">
          {currentArticles.map((article: Articles, i: number) => {
            const order = article.sort
            const permalink = getPermalink({
              year: year,
              month: month,
              section: article.section.slug,
              slug: article.slug,
              type: PageType.Article,
            })
            const sectionPermalink = getPermalink({
              issueSlug: article.issue.slug,
              section: article.section.slug,
              type: PageType.Section,
            })
            return (
              <PromoSection
                key={`article-${i}`}
                article={article}
                permalink={permalink}
                sectionPermalink={sectionPermalink}
                showImage={true}
                showSection={true}
                order={order}
              />
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <div className="grid grid-cols-4 tablet-lg:grid-cols-8 gap-6">
      <div className="col-span-4 tablet:col-span-8">
        <header className="pb-6">
          <h2 className="text-4xl tablet-lg:text-5xl font-light">{currentSection.name}</h2>
          {description}
        </header>
        <AllArticles />
      </div>
    </div>
  )
}

export default SectionLayout
