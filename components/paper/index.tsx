"use client"
import { AdVisibilityProvider } from "@/app/hooks/adVisibilityContext"
import { MenuProvider } from "@/app/hooks/useMenu"
import { Homepage, Issues } from "@/lib/types"
import { usePathname } from "next/navigation"
import { CSSProperties } from "react"
import AdFixedBanner from "../ads/adFixedBanner"
import Banners from "../banner"
import Footer from "../footer"
import Header from "../header"
import Menu from "../menu/menu"
import NavBar from "../navBar"
import PreviewHeader from "../preview/previewHead"
import ScreenIndicator from "../screenIndicator"
import PopupNewsletter from "../popups/newsletter"
import { EventsBreakDetails } from "@/lib/railTypes"

export interface PaperProps {
  pageClass: string
  hidePopup?: boolean
  navData: Homepage
  currentIssue?: Issues
  homepageHeaderData?: Homepage
  children: React.ReactNode
  type?: PaperType
  previewURL?: string
  collectionsData?: Homepage
  pageStyle?: CSSProperties
  eventsBreakDetails?: EventsBreakDetails
}

export enum PaperType {
  Default = "default",
  Homepage = "homepage",
  Article = "article",
  Events = "events",
  Preview = "preview",
  People = "people",
  CriticsPage = "criticspage",
  Page = "Page",
}

const Paper = (props: PaperProps) => {
  const {
    pageClass,
    children,
    navData,
    pageStyle,
    type,
    homepageHeaderData,
    currentIssue,
    previewURL,
    collectionsData,
    eventsBreakDetails,
  } = props
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  return (
    <AdVisibilityProvider>
      <MenuProvider>
        <div className={`relative theme ${pageClass}`} style={pageStyle}>
          {previewURL ? (
            <>
              <PreviewHeader previewURL={previewURL} />
              {type === PaperType.Homepage && (
                <>
                  <Header
                    type={type}
                    currentIssue={currentIssue}
                    collectionsData={collectionsData}
                    homepageHeaderData={homepageHeaderData}
                  />
                  {homepageHeaderData && isHomepage && currentIssue && eventsBreakDetails && (
                    <Banners
                      currentIssue={currentIssue}
                      homepageHeaderData={homepageHeaderData}
                      eventsBreakDetails={eventsBreakDetails}
                    />
                  )}
                  <NavBar navData={navData} isHomepage={isHomepage} />
                </>
              )}
            </>
          ) : (
            <>
              <Header
                type={type ? type : PaperType.Default}
                currentIssue={currentIssue}
                collectionsData={collectionsData}
                homepageHeaderData={homepageHeaderData}
              />
              {homepageHeaderData && isHomepage && currentIssue && eventsBreakDetails && (
                <Banners
                  currentIssue={currentIssue}
                  homepageHeaderData={homepageHeaderData}
                  eventsBreakDetails={eventsBreakDetails}
                />
              )}
              <NavBar navData={navData} isHomepage={isHomepage} />
            </>
          )}

          {children}
          {!previewURL && <AdFixedBanner />}
          <Footer />
          <ScreenIndicator />
        </div>
        <Menu collections={navData.collections} />
        {/* {!previewURL && <PopupDonate />} */}
        {!previewURL && type == PaperType.Article && <PopupNewsletter />}
      </MenuProvider>
    </AdVisibilityProvider>
  )
}

export default Paper
