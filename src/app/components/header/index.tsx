import Link from "next/link"
import { Covers, HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import { PaperType } from "../paper"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
import Subhead from "./subhead"
import CoverArt from "./coverArt"
import { VideoProvider } from "@/app/context/videoProvider"

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

  const permalink = getPermalink({
    type: PageType.Home,
  })

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
                <HomeBanner type={type} covers={covers} />
                <Subhead />
              </Link>
            </div>
          </div>
        </div>

        {banners && currentIssue && <FeaturedBanner banners={banners} currentIssue={currentIssue} />}
      </header>
    </VideoProvider>
  )
}

export default Header
