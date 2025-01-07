import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { PaperType } from "../paper"
import { useTheme } from "../theme"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
import Subhead from "./subhead"
import VideoBG from "./videobg"

export interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  type: PaperType
  currentIssue?: Issues
}

const Header = (props: HeaderProps) => {
  const { title, type, currentIssue } = props

  switch (type) {
    case PaperType.Homepage:
      return <HeaderHomepage title={title} type={type} currentIssue={currentIssue} />
    default:
      return <HeaderDefault title={title} type={type} />
  }
}

const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key)
}

const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key)
}

const HeaderHomepage = (props: HeaderProps) => {
  const { title, type, currentIssue } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const { theme } = useTheme()
  const subheadFill = theme === "dark" ? "fill-white" : "fill-white"

  useEffect(() => {
    // Check if the localStorage item is already set for video pause
    const isVideoPaused = getLocalStorageItem("homepageVideoPaused")
    if (isVideoPaused === "true" && videoRef.current) {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }, [])

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play()
        removeLocalStorageItem("homepageVideoPaused")
      } else {
        videoRef.current.pause()
        setLocalStorageItem("homepageVideoPaused", "true") // Set localStorage item
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
      <path d="M6 5H9V19H6V5Z" className="fill-zinc-800" />
      <path d="M15 5H18V19H15V5Z" className="fill-zinc-800" />
    </svg>
  )

  return (
    <header className={`tablet:pt-0 relative rail-header-${type}`}>
      <div className="hidden">
        <h1>The Brooklyn Rail </h1>
        <h2>Critical Perspectives on Art, Politics and Culture</h2>
        {title && <h3>{title}</h3>}
      </div>

      <div className="relative h-[calc(100vh-26.5rem)] tablet-lg:h-[calc(100vh-20.5rem)]">
        <div className="absolute inset-0 bg-black bg-opacity-15 z-[1]" />
        <VideoBG videoRef={videoRef} />
        <div className="sticky top-0 z-[2]">
          <div className="p-3 pb-9 tablet:px-6">
            <Link href={permalink} className="w-full space-y-3">
              <HomeBanner />
              <Subhead fill={subheadFill} />
            </Link>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-tl-sm p-0.5 pl-1.5 py-0.5 absolute bottom-0 right-0 z-10 flex justify-center items-center space-x-3">
          <p className="text-white text-xs">
            Shirin Neshat, <em>"Do U Dare!,"</em> 2024–25.
          </p>
          <button
            onClick={handleVideoToggle}
            className="font-sm bg-zinc-400 w-6 h-6 text-center text-white flex justify-center items-center"
          >
            {isPaused ? play : pause}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
