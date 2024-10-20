"use client"

import Link from "next/link"
import Ad970 from "../ads/ad970"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import PopupDonate from "../popupDonate"
import { PopupProvider, usePopup } from "../popupProvider"
import { useTheme } from "../theme"
import ThemeToggle from "../themeToggle"
import Header from "../header"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"

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
}

const Paper = (props: PaperProps) => {
  const { pageClass, children, hidePopup, navData, type, banners, currentIssue } = props
  const { theme, setTheme } = useTheme()

  return (
    <PopupProvider hidePopup={hidePopup}>
      <div className={`paper ${pageClass}`}>
        <PreviewBar />
        <Header type={type} navData={navData} banners={banners} currentIssue={currentIssue} />
        {children}
        <Footer />
        <Ad970 />
        <ThemeToggle {...{ theme, setTheme }} />
        <PopupDonate />
      </div>
    </PopupProvider>
  )
}

const PreviewBar = () => {
  const copy = "Welcome to our PREVIEW site. "

  return (
    <div className="bg-amber-400 dark:bg-indigo-800">
      <p className="text-center py-1">
        ★ {copy}
        <Link
          href="https://docs.google.com/document/d/1LNd2CRu8yKE68PGxdI8sfrNjuGXuDrAno9Y0GB4i0Y4/edit"
          target="_new"
          className="underline "
        >
          Please leave us feedback
        </Link>{" "}
        »
      </p>
    </div>
  )
}

export default Paper
