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
import { useEffect, useState } from "react"
import Password from "../preview/password"

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

  // PASSWORD
  // cookieSlug is the cookie that gets set after you enter the password
  const cookieSlug = `rail_preview_site`
  const [password, setPassword] = useState("")
  const [isViewable, setIsViewable] = useState(false)
  const [isStudioPreview, setIsStudioPreview] = useState(false)
  const [passwordError, setPasswordError] = useState<string | undefined>()

  // the isStudioPreview param is set to `true` when you are logged in to Directus
  // if either of these cookies are set, the article will be viewable
  useEffect(() => {
    // get the URL of the current page
    const currentUrl = window.location.href

    // Read the cookie
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
    const previewCookie = cookies.find((cookie) => cookie.includes(cookieSlug))

    // If the Preview Password has been previously entered, the preview cookie should be set
    // then the article should be viewable
    if (previewCookie) {
      setIsViewable(true)
    }

    // If the Preview Password has been previously entered, the preview cookie should be set
    if (isViewable) {
      setIsViewable(true)
    }
  }, [isStudioPreview, isViewable])

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Check if the `password` is the same as `previewPassword`
    if (password === `juniper`) {
      // Redirect to the article preview
      setIsViewable(true)
      // set a cookie
      document.cookie = `${cookieSlug}=true; path=/; max-age=3600; SameSite=None; Secure`
    } else {
      // Show an error message for incorrect password
      setPasswordError("Incorrect password")
    }
  }

  const passwordProps = { password, passwordError, setPassword, handlePasswordSubmit }

  const isPreviewSite = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"

  // only show the password form if the site is a preview site
  if (isPreviewSite) {
    if (!isViewable) {
      return <Password {...passwordProps} />
    }
  }
  return <Password {...passwordProps} />

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
