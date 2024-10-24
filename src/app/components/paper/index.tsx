"use client"
import Ad970 from "../ads/ad970"
import Footer from "../footer"
import PopupDonate from "../popupDonate"
import { PopupProvider } from "../popupProvider"
import { useTheme } from "../theme"
import ThemeToggle from "../themeToggle"
import Header from "../header"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import NavBar from "../navBar"
import { usePathname } from "next/navigation"

export interface PaperProps {
  pageClass: string
  hidePopup?: boolean
  navData: Homepage
  currentIssue?: Issues
  banners?: HomepageBanners[]
  children: React.ReactNode
  type: PaperType
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
  const { pageClass, children, hidePopup, navData, type, banners, currentIssue } = props
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  return (
    <PopupProvider hidePopup={hidePopup}>
      <div className={`paper ${pageClass}`}>
        <Header type={type} banners={banners} currentIssue={currentIssue} />
        <NavBar navData={navData} isHomepage={isHomepage} />
        {children}
        <Footer />
        <Ad970 />
        <ThemeToggle {...{ theme, setTheme }} />
        {!isHomepage && <PopupDonate />}
      </div>
    </PopupProvider>
  )
}

export default Paper
