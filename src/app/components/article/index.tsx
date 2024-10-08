"use client"
import { Ads } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import { getAds } from "../../../../lib/utils"
import { useEffect, useState } from "react"
import Ad970 from "../ads/ad970"
import Header, { HeaderType } from "../header"
import { useTheme } from "../theme"
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

  return (
    <Paper pageClass="paper-article">
      <header role="banner">
        <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
          <div className="col-span-12">
            <Header type={HeaderType.Default} />
          </div>
        </div>
      </header>
      <main className="">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2">
            {/* <Ad970 currentAds={currentAds} /> */}

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
    </Paper>
  )
}

export default Article
