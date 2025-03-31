import { Homepage, Issues } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import Link from "next/link"
import { useRef } from "react"
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
  collectionsData?: Homepage
  homepageHeaderData?: Homepage
}

const Header = (props: HeaderProps) => {
  const { title, type, currentIssue, collectionsData, homepageHeaderData } = props

  switch (type) {
    case PaperType.Homepage:
      return (
        <HeaderHomepage
          title={title}
          type={type}
          currentIssue={currentIssue}
          collectionsData={collectionsData}
          homepageHeaderData={homepageHeaderData}
        />
      )
    default:
      return <HeaderDefault title={title} type={type} />
  }
}

const HeaderHomepage = (props: HeaderProps) => {
  const { title, type, homepageHeaderData } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const { theme } = useTheme()
  const subheadFill = theme === "dark" ? "fill-white" : "fill-white"
  const videoCovers = homepageHeaderData && homepageHeaderData.video_covers
  const videoCoversStills = homepageHeaderData && homepageHeaderData.video_covers_stills
  const videoCoversVerticalPosition = homepageHeaderData && homepageHeaderData.video_covers_vertical_position

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
        {videoCovers && videoCoversStills && videoCoversVerticalPosition && (
          <VideoBG
            videoRef={videoRef}
            videoCovers={videoCovers}
            videoCoversStills={videoCoversStills}
            videoCoversVerticalPosition={videoCoversVerticalPosition}
          />
        )}
        <div className="sticky top-0 z-[2]">
          <div className={`${videoCovers && videoCoversStills ? "p-3 pb-9 tablet:px-6" : "p-3"}`}>
            <Link href={permalink} className="w-full space-y-3">
              <HomeBanner />
              <Subhead fill={subheadFill} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
