"use client"
import { Articles, Sections } from "../../../../lib/types"
import styles from "./collection.module.scss"
import PromoBasic from "./promos/basic"

export interface CollectionsProps {
  collectionsData: Sections[]
}

const Collections = (props: CollectionsProps) => {
  const { collectionsData } = props

  // for each issueSections, create a collection of articles
  const collections = collectionsData.map((section) => {
    return (
      <section key={section.id} className={styles.collection}>
        <div className="grid-row">
          <div className="grid grid-cols-4 lg:grid-cols-12">
            <div className="col-span-12">
              <h2>{section.name}</h2>
            </div>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 gap-y-4">
            <Promos articles={section.articles} />
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
    return (
      <div key={article.slug} className="col-span-1">
        <PromoBasic article={article} />
      </div>
    )
  })
  return <>{articles}</>
}

export default Collections
