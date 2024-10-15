"use client"

import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import PopupDonate from "../popupDonate"
import { PopupProvider, usePopup } from "../popupProvider"
import { useTheme } from "../theme"
import ThemeToggle from "../themeToggle"

export interface PaperProps {
  pageClass: string
  hidePopup?: boolean
  children: React.ReactNode
}

const Paper = (props: PaperProps) => {
  const { pageClass, children, hidePopup } = props
  const { theme, setTheme } = useTheme()
  // const { showPopup, popupType } = usePopup()

  return (
    <PopupProvider hidePopup={hidePopup}>
      <div className={`paper ${pageClass}`}>
        {children}
        <Footer />
        <ThemeToggle {...{ theme, setTheme }} />
        <PopupDonate />
      </div>
    </PopupProvider>
  )
}

export default Paper
