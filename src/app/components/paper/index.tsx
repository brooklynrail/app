"use client"
import Ad970 from "../ads/ad970"
import Footer from "../footer"
import PopupDonate from "../popupDonate"
import { PopupProvider } from "../popupProvider"
import Header from "../header"
import { Covers, Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import NavBar from "../navBar"
import { usePathname } from "next/navigation"
import PreviewHeader from "../preview/previewHead"

export interface PaperProps {
  pageClass: string
  hidePopup?: boolean
  navData: Homepage
  currentIssue?: Issues
  banners?: HomepageBanners[]
  children: React.ReactNode
  type: PaperType
  previewURL?: string
  covers?: Covers[]
}

export enum PaperType {
  Default = "default",
  Homepage = "homepage",
  Events = "events",
  Preview = "preview",
  People = "people",
  CriticsPage = "criticspage",
  Page = "Page",
}

const Paper = (props: PaperProps) => {
  const { pageClass, children, hidePopup, navData, type, banners, currentIssue, previewURL, covers } = props
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  return (
    <PopupProvider hidePopup={hidePopup}>
      <div className={`theme ${pageClass}`}>
        {previewURL ? (
          <PreviewHeader previewURL={previewURL} />
        ) : (
          <>
            <Header type={type} banners={banners} currentIssue={currentIssue} covers={covers} />
            <NavBar navData={navData} isHomepage={isHomepage} />
          </>
        )}

        {children}
        <Footer />
        <Ad970 />
        {!isHomepage && <PopupDonate />}
      </div>
    </PopupProvider>
  )
}

export default Paper
