"use client"
import { MenuProvider } from "@/app/hooks/useMenu"
import { CSPostHogProvider } from "@/app/providers/posthog"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import Ad970 from "../ads/ad970"
import Footer from "../footer"
import Menu from "../menu/menu"
import NavBar from "../navBar"
import PopupDonate from "../popupDonate"
import { PopupProvider } from "../popupProvider"
import Header from "../header"
import { usePathname } from "next/navigation"
import PreviewHeader from "../preview/previewHead"
import { AdVisibilityProvider } from "@/app/hooks/adVisibilityContext"

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
  const { pageClass, children, hidePopup, navData, type, banners, currentIssue, previewURL } = props
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  return (
    <CSPostHogProvider>
      <AdVisibilityProvider>
        <PopupProvider hidePopup={hidePopup}>
          <MenuProvider>
            <div className={`relative theme ${pageClass}`}>
              {previewURL ? (
                <PreviewHeader previewURL={previewURL} />
              ) : (
                <>
                  <Header type={type ? type : PaperType.Default} banners={banners} currentIssue={currentIssue} />
                  <NavBar navData={navData} isHomepage={isHomepage} />
                </>
              )}

              {children}
              <Ad970 />
              <Footer />
            </div>
            <Menu collections={navData.collections} />
            {!isHomepage && <PopupDonate />}
          </MenuProvider>
        </PopupProvider>
      </AdVisibilityProvider>
    </CSPostHogProvider>
  )
}

export default Paper
