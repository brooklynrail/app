"use client"
import CoversPopup from "../issueRail/coversPopup"
import { IssuePageProps, PageLayout } from "@/app/page"
import AdsTile from "../ads/adsTile"
import IssueSelect from "./issueSelect"
import CurrentSections from "./currentSections"
import RailPartners from "./railPartners"
import RailProjects from "./railProjects"
import Ad970 from "../ads/ad970"
import { Ads, Articles } from "../../../../lib/types"
import Link from "next/link"
import IssueLayout from "./layout/issue"
import SectionLayout from "./layout/section"
import { useEffect, useState } from "react"
import { getAds } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import { CoverImage } from "../issueRail/coverImage"
import PreviewHeader from "../preview/previewHead"
import TableOfContentsPage from "./layout/tableOfContentsPage"
import Footer from "../footer"
import ThemeToggle from "../themeToggle"
import { useTheme } from "@/app/components/theme"
import Header from "../header"
import OldMenu from "../header/oldMenu"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { thisIssueData, currentSection, issueSections, previewURL, allIssues } = props
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
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [currentAds])

  const { slug } = thisIssueData
  const issueClass = `issue-${slug.toLowerCase()}`

  let layout
  switch (props.layout) {
    case PageLayout.Section:
      layout = <SectionLayout thisIssueData={thisIssueData} currentSection={currentSection} />
      break
    case PageLayout.TableOfContents:
      layout = <TableOfContentsPage {...props} />
      break
    default:
      layout = <IssueLayout {...props} />
      break
  }

  return (
    <>
      <PopupProvider>
        <div className={`paper paper-old ${issueClass}`}>
          {previewURL && <PreviewHeader previewURL={previewURL} />}

          <div className="px-0 desktop:w-desktop mx-auto">
            <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-6">
              <div className="col-span-4 tablet-lg:col-span-12">
                <div className="px-3">
                  <Header useOldLogo={true} thisIssueData={thisIssueData} />
                  <Ad970 currentAds={currentAds} />
                </div>
              </div>

              <div className="col-span-4 hidden tablet-lg:block tablet-lg:col-span-2">
                <div className="flex flex-col space-y-2 pl-3">
                  <IssueSelect currentIssueSlug={slug} allIssues={allIssues} />
                  <CoverImage thisIssueData={thisIssueData} />
                  <CurrentSections issueSections={issueSections} thisIssueData={thisIssueData} />
                </div>
                <div className="py-4 flex flex-col space-y-2 pl-3">
                  <Link
                    className="font-medium text-sm py-1 text-center inline-block border-[1px] rail-border-solid rounded-sm"
                    href="/search"
                    title="Search All Issues"
                  >
                    <span>Search</span> <i className="fas fa-search"></i>
                  </Link>
                  <Link
                    className="font-medium text-sm py-1 text-center inline-block border-[1px] rail-border-solid rounded-sm"
                    href="/archive"
                    title="View Archive"
                  >
                    <span>View Archive</span>
                  </Link>
                  <RailProjects />
                  <RailPartners />
                </div>
              </div>
              <div className="col-span-4 tablet-lg:col-span-8">
                <div className="px-3 tablet-lg:px-0">{layout}</div>
              </div>
              <div className="col-span-4 hidden tablet-lg:block tablet-lg:col-span-2">
                <div className="pr-3">
                  <AdsTile currentAds={currentAds} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ThemeToggle {...{ theme, setTheme }} />
        <CoversPopup />
      </PopupProvider>
    </>
  )
}

export default IssuePage
