"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import { Ads } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import { getAds, getPermalink, PageType } from "../../../../lib/utils"
import { useEffect, useState } from "react"
import ArticleHead from "./articleHead"
import ArticleBody from "./articleBody"
import NextPrev from "./nextPrev"
import Ad970 from "../ads/ad970"
import Header, { HeaderType } from "../header"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"

const Article = (props: ArticleProps) => {
  const { articleData, thisIssueData } = props
  const { section } = articleData
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  const { theme, setTheme } = useTheme()

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

  const issuePermalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    type: PageType.Issue,
  })

  return (
    <>
      <div className={`paper ${issueClass}`}>
        <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-10">
            <aside className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-3 ">
              <IssueRail thisIssueData={thisIssueData} />
            </aside>

            <div className="col-span-4 tablet-lg:col-span-9 ">
              <Header type={HeaderType.Article} />

              <Ad970 currentAds={currentAds} />
              <article className="border-t rail-border divide-y rail-divide my-6">
                <NextPrev {...props} currentSection={section} />

                <ArticleBody {...props} />

                <NextPrev {...props} currentSection={section} />
              </article>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <ThemeToggle {...{ theme, setTheme }} />
      <CoversPopup />
    </>
  )
}

export default Article
