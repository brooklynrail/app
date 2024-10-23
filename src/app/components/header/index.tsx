import Link from "next/link"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import { PaperType } from "../paper"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
import NavBar from "./navBar"
import Subhead from "./subhead"
import VideoBG from "./videobg"
import { useRef, useState, useEffect } from "react"

export interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  type: PaperType
  banners?: HomepageBanners[]
  currentIssue?: Issues
  navData: Homepage
}

const Header = (props: HeaderProps) => {
  const { title, type, banners, currentIssue, navData } = props

  switch (type) {
    case PaperType.Homepage:
      return (
        <HeaderHomepage title={title} type={type} banners={banners} currentIssue={currentIssue} navData={navData} />
      )
    default:
      return <HeaderDefault title={title} type={type} navData={navData} />
  }
}

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : null
}

const setCookie = (name: string, value: string, hours: number) => {
  const expires = new Date()
  expires.setHours(expires.getHours() + hours)
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

const HeaderHomepage = (props: HeaderProps) => {
  const { title, type, banners, currentIssue, navData } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // Check if the cookie is already set for video pause
    const isVideoPaused = getCookie("videoBGPaused")
    if (isVideoPaused === "true" && videoRef.current) {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }, [])

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play()
        deleteCookie("videoBGPaused")
      } else {
        videoRef.current.pause()
        setCookie("videoBGPaused", "true", 24) // Set cookie for 1 day
      }
      setIsPaused(!isPaused)
    }
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return (
    <>
      <header className={`tablet:pt-0 relative rail-header-${type}`}>
        <div className="hidden">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>

        <div className="relative h-[calc(100vh-11.5rem)]">
          <VideoBG videoRef={videoRef} />
          <div className="sticky top-0">
            <div className="p-3 tablet:px-6">
              <Link href={permalink} className="w-full space-y-3">
                <HomeBanner type={type} />
                <Subhead />
              </Link>
            </div>
          </div>
          <button
            onClick={handleVideoToggle}
            className="absolute font-sm bottom-3 right-3 bg-zinc-700 w-7 h-7 text-center rounded-full text-white z-10"
          >
            {isPaused ? "►" : "❚❚"}
          </button>
        </div>

        {banners && currentIssue && <FeaturedBanner banners={banners} currentIssue={currentIssue} />}
      </header>
      <NavBar navData={navData} />
    </>
  )
}

export default Header
