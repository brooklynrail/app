"use client"
import { useEffect, useState } from "react"
import { Ads } from "../../../../lib/types"
import { getAds } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import Paper from "../paper"
import Header, { HeaderType } from "../header"
import styles from "./tribute.module.scss"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"
import TributeHead from "./tributeHead"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import { ArticleProvider } from "@/app/context/ArticleProvider"
import TributeBody from "./tributeBody"

const TributePage = (props: TributePageProps) => {
  const { thisTributeData, articleData } = props
  const { theme, setTheme } = useTheme()

  // State management for ads and articles
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  // Fetch current ads (if not already fetched)
  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = await getAds()
        setCurrentAds(ads)
      }
    }
    fetchData().catch((error) => console.error("Failed to fetch ads:", error))
  }, [currentAds])

  const { slug } = thisTributeData
  const tributeClass = `tribute-${slug.toLowerCase()}`

  return (
    <>
      <ArticleProvider initialArticle={articleData} tributeSlug={thisTributeData.slug}>
        <PopupProvider>
          <Paper pageClass={`paper-tribute ${tributeClass}`}>
            <div className="">
              <Header type={HeaderType.Default} />
              <section id="main" className={styles.main}>
                <TributeHead {...props} />
                <TributeBody {...props} />
              </section>
            </div>
          </Paper>
          <ThemeToggle {...{ theme, setTheme }} />
        </PopupProvider>
      </ArticleProvider>
    </>
  )
}

export default TributePage
