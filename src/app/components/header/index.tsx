import Link from "next/link"
import { Covers, HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import { PaperType } from "../paper"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
import Subhead from "./subhead"
import CoverArt from "./coverArt"
import { useRef } from "react"
import { VideoProvider } from "@/app/context/VideoProvider"
import { useTheme } from "../theme"

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
  const { title, type, banners, currentIssue, covers } = props
  const { theme } = useTheme()
  const bannerRef = useRef<HTMLDivElement>(null)

  const permalink = getPermalink({
    type: PageType.Home,
  })

  const defaultColor = `#27272a`
  const primaryColor = covers ? covers[0].primary_color : defaultColor
  const secondaryColor = covers ? covers[0].secondary_color : defaultColor

  // let pathfill = theme === "dark" ? "fill-none" : "fill-none"
  // let textfill = theme ===
  const headFill = theme === "dark" ? primaryColor : primaryColor
  const subheadFill = theme === "dark" ? secondaryColor : secondaryColor

  return (
    <VideoProvider>
      <header className={`tablet:pt-0 relative rail-header-${type}`}>
        <div className="hidden">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>

        <div className="relative h-[calc(100vh)]">
          <CoverArt covers={covers} />
          <div className="sticky top-0">
            <div className="p-3 pb-9 tablet:px-6">
              <Link href={permalink} className="w-full space-y-3">
                <HomeBanner fill={headFill} />
                <Subhead fill={subheadFill} />
              </Link>
            </div>
          </div>
        </div>

        {banners && currentIssue && (
          <FeaturedBanner bannerRef={bannerRef} banners={banners} currentIssue={currentIssue} />
        )}
      </header>
    </VideoProvider>
  )
}

export default Header
