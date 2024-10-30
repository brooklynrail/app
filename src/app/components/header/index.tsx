import Link from "next/link"
import { Covers, HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import { PaperType } from "../paper"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
import Subhead from "./subhead"
import { useRef, useState, useEffect } from "react"
import { useTheme } from "../theme"
import VideoBG from "./videobg"
import { deleteCookie, getCookie, setCookie } from "../../../../lib/utils/homepage"

export interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  type: PaperType
  banners?: HomepageBanners[]
  currentIssue?: Issues
  covers?: Covers[]
}

const Header = (props: HeaderProps) => {
  const { title, type, banners, currentIssue, covers } = props

  switch (type) {
    case PaperType.Homepage:
      return <HeaderHomepage title={title} type={type} banners={banners} currentIssue={currentIssue} covers={covers} />
    default:
      return <HeaderDefault title={title} type={type} />
  }
}

const HeaderHomepage = (props: HeaderProps) => {
  const { theme } = useTheme()
  const bannerRef = useRef<HTMLDivElement>(null)
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

  return (
    <header className={`tablet:pt-0 relative rail-header-${type}`}>
      <div className="hidden">
        <h1>The Brooklyn Rail </h1>
        <h2>Critical Perspectives on Art, Politics and Culture</h2>
        {title && <h3>{title}</h3>}
      </div>

      <div className="relative h-[calc(100vh)]">
        <VideoBG videoRef={videoRef} />
        <div className="sticky top-0">
          <div className="p-3 pb-9 tablet:px-6">
            <Link href={permalink} className="w-full space-y-3">
              <HomeBanner fill={`#ffffff`} />

              <Subhead fill={`#ffffff`} />
            </Link>
          </div>
        </div>
      </div>

      {banners && currentIssue && (
        <FeaturedBanner bannerRef={bannerRef} banners={banners} currentIssue={currentIssue} />
      )}
    </header>
  )
}

export default Header
