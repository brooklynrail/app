"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import { Ads } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import { getAds } from "../../../../lib/utils"
import { useEffect, useState } from "react"
import Ad970 from "../ads/ad970"
import Header, { HeaderType } from "../header"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"
import { PopupProvider } from "../issueRail/popupProvider"
import Paper from "../paper"
import ArticleBody, { BodyTypes } from "./articleBody"

const Article = (props: ArticleProps) => {
  const { thisIssueData, articleData, permalink } = props
  const { theme, setTheme } = useTheme()
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = getAds()
        // Fetch all the data in parallel
        const [fetchedAds] = await Promise.all([ads])
        // Update the state with the fetched data as it becomes available
        setCurrentAds(fetchedAds)
      }
    }

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch Ad data on Article page:", error))
  }, [currentAds])

  const issueClass = `issue-${thisIssueData.slug.toLowerCase()}`

  return (
    <>
      <PopupProvider>
        <Paper pageClass="paper-article">
          <div className={`paper ${issueClass}`}>
            <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
              <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
                <aside className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-4 desktop-lg:col-span-3 relative">
                  <IssueRail key={thisIssueData.id} thisIssueData={thisIssueData} />
                </aside>

                <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
                  <Header type={HeaderType.Default} />

                  <Ad970 currentAds={currentAds} />

                  <ArticleBody
                    articles={thisIssueData.articles}
                    currentSection={articleData.section}
                    thisIssueData={thisIssueData}
                    type={BodyTypes.Article}
                    articleData={articleData}
                    permalink={permalink}
                  />
                </div>
              </div>
            </main>
            <Footer />
          </div>
          <ThemeToggle {...{ theme, setTheme }} />
          <CoversPopup />
        </Paper>
      </PopupProvider>
    </>
  )
}

export default Article
