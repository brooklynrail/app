import Link from "next/link"
import { HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import { PaperType } from "../paper"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
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
}

const Header = (props: HeaderProps) => {
  const { title, type, banners, currentIssue } = props

  switch (type) {
    case PaperType.Homepage:
      return <HeaderHomepage title={title} type={type} banners={banners} currentIssue={currentIssue} />
    default:
      return <HeaderDefault title={title} type={type} />
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
  const { title, type, banners, currentIssue } = props
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

  const play = (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
    </svg>
  )

  const pause = (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 5H9V19H6V5Z" fill="currentColor" />
      <path d="M15 5H18V19H15V5Z" fill="currentColor" />
    </svg>
  )

  return (
    <header className={`tablet:pt-0 relative rail-header-${type}`}>
      <div className="hidden">
        <h1>The Brooklyn Rail </h1>
        <h2>Critical Perspectives on Art, Politics and Culture</h2>
        {title && <h3>{title}</h3>}
      </div>

      <div className="relative h-[calc(100vh-16rem)] tablet-lg:h-[calc(100vh-11.5rem)]">
        <VideoBG videoRef={videoRef} />
        <div className="sticky top-0">
          <div className="p-3 pb-9 tablet:px-6">
            <Link href={permalink} className="w-full space-y-3">
              <HomeBanner type={type} />
              <Subhead />
            </Link>
          </div>
        </div>
        <button
          onClick={handleVideoToggle}
          className="absolute font-sm bottom-3 right-3 bg-zinc-700 w-6 h-6 text-center rounded-full text-white z-10 flex justify-center items-center"
        >
          {isPaused ? play : pause}
        </button>
      </div>

      {banners && currentIssue && <FeaturedBanner banners={banners} currentIssue={currentIssue} />}
    </header>
  )
}

export default Header
