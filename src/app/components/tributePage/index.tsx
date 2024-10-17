"use client"
import { useEffect, useState } from "react"
import { Ads } from "../../../../lib/types"
import { getAds } from "../../../../lib/utils"
import Paper from "../paper"
import Header, { HeaderType } from "../header"
import styles from "./tribute.module.scss"
import { useTheme } from "../theme"
import TributeHead from "./tributeHead"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import TributeBody from "./tributeBody"
import PreviewHeader from "../preview/previewHead"

const TributePage = (props: TributePageProps) => {
  const { thisTributeData, previewURL } = props

  const { slug } = thisTributeData
  const tributeClass = `tribute-${slug.toLowerCase()}`

  return (
    <Paper pageClass={`paper-tribute ${tributeClass}`}>
      {previewURL && <PreviewHeader previewURL={previewURL} />}
      <div className="rail-divide divide-y">
        <Header type={HeaderType.Alt} />
        <section id="main" className={`${styles.main}`}>
          <div className="rail-divide divide-y">
            <div className="py-3 px-6">
              <TributeHead thisTributeData={thisTributeData} articleData={thisTributeData.articles[0]} />
            </div>
            <TributeBody {...props} />
          </div>
        </section>
      </div>
    </Paper>
  )
}

export default TributePage
