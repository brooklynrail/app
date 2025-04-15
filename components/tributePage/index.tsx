"use client"
import { TributePageProps } from "@/lib/railTypes"
import Paper from "../paper"
import styles from "./tribute.module.scss"
import TributeHead from "./tributeHead"
import TributeBodyBlock from "./tributeBody"

const TributePage = (props: TributePageProps) => {
  const { thisTributeData, navData, previewURL } = props

  const { slug } = thisTributeData
  const tributeClass = `tribute-${slug.toLowerCase()}`

  return (
    <Paper pageClass={`theme-tribute ${tributeClass}`} navData={navData} previewURL={previewURL}>
      <div className="rail-divide divide-y">
        <section id="main" className={`${styles.main}`}>
          <div className="rail-divide divide-y">
            <div className="py-3 px-6">
              <TributeHead thisTributeData={thisTributeData} articleData={thisTributeData.articles[0]} />
            </div>
            <TributeBodyBlock {...props} currentArticleSlug={thisTributeData.articles[0].slug} />
          </div>
        </section>
      </div>
    </Paper>
  )
}

export default TributePage
