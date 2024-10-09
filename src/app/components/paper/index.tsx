"use client"

import Ad970 from "../ads/ad970"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import DonatePopup from "../popup"
import { PopupProvider } from "../popupProvider"
import { useTheme } from "../theme"
import ThemeToggle from "../themeToggle"

export interface PaperProps {
  pageClass: string
  children: React.ReactNode
}

const Paper = (props: PaperProps) => {
  const { pageClass, children } = props
  const { theme, setTheme } = useTheme()

  return (
    <PopupProvider>
      <div className={`paper ${pageClass}`}>
        {children}
        <Footer />
        <Ad970 />
        <ThemeToggle {...{ theme, setTheme }} />
        <CoversPopup />
        <DonatePopup />
      </div>
    </PopupProvider>
  )
}

export default Paper
