"use client"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import Paper from "../paper"
import PreviewHeader from "../preview/previewHead"
import styles from "./tribute.module.scss"
import TributeHead from "./tributeHead"
import TributeBodyBlock from "./tributeBody"

const TributePage = (props: TributePageProps) => {
  const { thisTributeData, previewURL, navData } = props

  const { slug } = thisTributeData
  const tributeClass = `tribute-${slug.toLowerCase()}`

  return (
    <Paper pageClass={`theme-tribute ${tributeClass}`} navData={navData}>
      {previewURL && <PreviewHeader previewURL={previewURL} />}
      <div className="rail-divide divide-y">
        <section id="main" className={`${styles.main}`}>
          <div className="rail-divide divide-y">
            <div className="py-3 px-6">
              <TributeHead thisTributeData={thisTributeData} articleData={thisTributeData.articles[0]} />
            </div>
            <TributeBodyBlock {...props} />
          </div>
        </section>
      </div>
    </Paper>
  )
}

export default TributePage
