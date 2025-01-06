"use client"
import { MenuProvider } from "@/app/hooks/useMenu"
import { usePathname } from "next/navigation"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import AdFixedBanner from "../ads/adFixedBanner"
import Footer from "../footer"
import Menu from "../menu/menu"
import NavBar from "../navBar"
import PopupDonate from "../popupDonate"
import Header from "../header"
import PreviewHeader from "../preview/previewHead"
import { AdVisibilityProvider } from "@/app/hooks/adVisibilityContext"
import ScreenIndicator from "../screenIndicator"
import Banners from "../banner"

export interface PaperProps {
  pageClass: string
  hidePopup?: boolean
  navData: Homepage
  currentIssue?: Issues
  banners?: HomepageBanners[]
  children: React.ReactNode
  type?: PaperType
  previewURL?: string
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
  const { pageClass, children, navData, type, banners, currentIssue, previewURL } = props
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  return (
    <AdVisibilityProvider>
      <MenuProvider>
        <div className={`relative theme ${pageClass}`}>
          {previewURL ? (
            <PreviewHeader previewURL={previewURL} />
          ) : (
            <>
              <Header type={type ? type : PaperType.Default} currentIssue={currentIssue} />
              {banners && isHomepage && currentIssue && <Banners currentIssue={currentIssue} banners={banners} />}
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
      </MenuProvider>
    </AdVisibilityProvider>
  )
}

export default Paper
