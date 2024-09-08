"use client"
import CoversPopup from "../issueRail/coversPopup"
import { HomePageProps, PageLayout } from "@/app/page"
import Header from "../header"
import { Ads, Articles } from "../../../../lib/types"
import { useEffect, useState } from "react"
import { getAds } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import PreviewHeader from "../preview/previewHead"
import Collections from "../collections"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

const Homepage = (props: HomePageProps) => {
  const { collectionsData, thisIssueData } = props
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
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [currentAds])

  const { slug } = thisIssueData
  const issueClass = `issue-${slug.toLowerCase()}`

  return (
    <>
      <PopupProvider>
        <div className={`paper ${issueClass}`}>
          <div className="wrapper home">
            <header role="banner">
              <div className="grid-row">
                <div className="grid grid-cols-4 lg:grid-cols-12">
                  <div className="col-span-12">
                    <Header
                      special_issue={thisIssueData.special_issue}
                      issue_number={thisIssueData.issue_number}
                      title={thisIssueData.title}
                    />
                  </div>
                </div>
              </div>
            </header>
            <main>
              <Collections collectionsData={collectionsData} />
            </main>
          </div>
        </div>
        <CoversPopup />
      </PopupProvider>
    </>
  )
}

export default Homepage
