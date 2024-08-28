import { Articles } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import PromoSection from "../../promo/section"
import SubscribeAd from "../subscribeAd"

import { LayoutProps } from "./issue"

const SectionLayout = (props: LayoutProps) => {
  const { issueData, currentSection } = props

  if (!currentSection) {
    return <></>
  }

  const { year, month } = issueData

  // get the articles that belong to the current section
  const currentArticles = issueData.articles.filter((article: Articles) => {
    return article.section.slug === currentSection.slug
  })

  // If the current section is the Critics Page, add the Editors Message to the beginning of the currentArticles array
  if (currentSection.slug === "criticspage") {
    // find the articles that belong to the Editors Message section
    const editorsMessage = issueData.articles.find((article: Articles) => {
      return article.section.slug === "editorsmessage"
    })
    // add those articles to the beginning of the currentArticles array
    if (editorsMessage) {
      currentArticles.unshift(editorsMessage)
    }
  }

  const AllArticles = () => {
    return (
      <section className="collection">
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
            year: year,
            month: month,
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
      </section>
    )
  }

  return (
    <div className="grid-col-8">
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">
          <header className="section">
            <h2>{currentSection.name}</h2>
          </header>
        </div>
      </div>
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">
          <AllArticles />
        </div>
      </div>
      <SubscribeAd />
    </div>
  )
}

export default SectionLayout
