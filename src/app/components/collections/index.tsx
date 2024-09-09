"use client"
import { Articles, Sections } from "../../../../lib/types"
import styles from "./collection.module.scss"
import PromoBasic from "./promos/basic"
import PromoFeatured from "./promos/featured"

export interface CollectionsProps {
  collectionsData: Sections[]
}

const Collections = (props: CollectionsProps) => {
  const { collectionsData } = props

  // for each issueSections, create a collection of articles
  const collections = collectionsData.map((section) => {
    // get the first article in the section.articles array
    const firstArticle = section.articles[0]
    // get the list of articles in the section.articles array minus the first article
    const restOfArticles = section.articles.slice(1)

    return (
      <section
        key={section.id}
        className={`${styles.collection} pb-16 px-6 bg-gray-100 border-t-2 border-dotted border-gray-700`}
      >
        <div className="grid-row">
          <div className="grid grid-cols-4 tablet:grid-cols-12">
            <div className="col-span-12">
              <h2 className="py-4 pb-5 text-xl font-bold">{section.name}</h2>
            </div>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid grid-cols-4 tablet:grid-cols-12 tablet:divide-x-2 tablet:divide-dotted tablet:divide-gray-700">
            <div className="tablet:pr-4 col-span-6">
              <PromoFeatured article={firstArticle} />
            </div>
            <div className="tablet:pl-4 col-span-6 divide-y-2 divide-dotted divide-gray-700">
              <Promos articles={restOfArticles} />
            </div>
          </div>
        </div>
      </section>
    )
  })

  return <>{collections}</>
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article) => {
    return <PromoBasic article={article} />
  })
  return <>{articles}</>
}

export default Collections
