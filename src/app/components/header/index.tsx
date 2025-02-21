import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Homepage, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { PaperType } from "../paper"
import { useTheme } from "../theme"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
import Subhead from "./subhead"
import VideoBG from "./videobg"
import VideoControls from "./videoControls"

export interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  type: PaperType
  currentIssue?: Issues
  homepageData?: Homepage
}

const Header = (props: HeaderProps) => {
  const { title, type, currentIssue, homepageData } = props

  switch (type) {
    case PaperType.Homepage:
      return <HeaderHomepage title={title} type={type} currentIssue={currentIssue} homepageData={homepageData} />
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
  const { title, type, homepageData } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const { theme } = useTheme()
  const subheadFill = theme === "dark" ? "fill-white" : "fill-white"
  const videoCovers = homepageData && homepageData.video_covers
  const videoCoversStills = homepageData && homepageData.video_covers_stills

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

  return (
    <header className={`tablet:pt-0 relative rail-header-${type}`}>
      <div className="hidden">
        <h1>The Brooklyn Rail </h1>
        <h2>Critical Perspectives on Art, Politics and Culture</h2>
        {title && <h3>{title}</h3>}
      </div>

      <div
        className={`relative ${videoCovers && videoCoversStills ? "h-[calc(100vh-26.5rem)] tablet-lg:h-[calc(100vh-20.5rem)]" : ""}`}
      >
        <div
          className={`absolute inset-0 bg-zinc-900 z-[1] ${videoCovers && videoCoversStills ? "bg-opacity-10" : ""}`}
        />
        {videoCovers && videoCoversStills && (
          <VideoBG videoRef={videoRef} videoCovers={videoCovers} videoCoversStills={videoCoversStills} />
        )}
        <div className="sticky top-0 z-[2]">
          <div className={`${videoCovers && videoCoversStills ? "p-3 pb-9 tablet:px-6" : "p-3"}`}>
            <Link href={permalink} className="w-full space-y-3">
              <HomeBanner />
              <Subhead fill={subheadFill} />
            </Link>
          </div>
        </div>
        {videoCovers && videoCoversStills && (
          <VideoControls
            videoRef={videoRef}
            videoCovers={videoCovers}
            isPaused={isPaused}
            handleVideoToggle={handleVideoToggle}
          />
        )}
      </div>
    </header>
  )
}

export default Header
