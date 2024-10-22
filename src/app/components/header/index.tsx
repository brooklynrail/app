import Link from "next/link"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import Banner from "./banner"
import NavBar from "./navBar"
import { PaperType } from "../paper"
import MenuButton from "./menuButton"
import Subhead from "./subhead"
import HomeBanner from "./homeBanner"
import styles from "./header.module.scss"
import VideoBG from "./videobg"

interface HeaderProps {
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

const HeaderHomepage = (props: HeaderProps) => {
  const { title, type, banners, currentIssue, navData } = props
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

        <div className="h-[calc(100vh-21rem)] tablet:h-[calc(100vh-7.5rem)] relative">
          <VideoBG />
          <div className="sticky top-0">
            <div className="p-3 tablet:px-6">
              <Link href={permalink} className="w-full space-y-3">
                <HomeBanner type={type} />
                <Subhead />
              </Link>
            </div>
          </div>
        </div>
        {banners && currentIssue && <FeaturedBanner banners={banners} currentIssue={currentIssue} />}
      </header>
      <NavBar navData={navData} />
    </>
  )
}

const HeaderDefault = (props: HeaderProps) => {
  const { title, type, navData } = props
  const permalink = getPermalink({
    type: PageType.Home,
  })
  return (
    <>
      <header id={styles.rail_header} className={`border-b rail-border rail-header-${type}`}>
        <div>
          <div className="hidden">
            <h1>The Brooklyn Rail </h1>
            <h2>Critical Perspectives on Art, Politics and Culture</h2>
            {title && <h3>{title}</h3>}
          </div>
          <div className="px-3 py-3 tablet-lg:px-6">
            <div className="flex w-full items-center space-x-4">
              <Link href={permalink} className="w-full">
                <Banner type={type} />
              </Link>
              <div className="tablet:hidden">
                <MenuButton classes={`w-[7vw] h-[7vw]`} collections={navData.collections} />
              </div>
            </div>
          </div>
          <div className="hidden tablet:block px-3 tablet-lg:px-6 pb-3">
            <div className="flex space-x-3 justify-between">
              <div className="flex flex-col items-end tablet:flex-row tablet:items-center justify-center w-full space-y-3 tablet:space-y-0 tablet:space-x-6 desktop:space-x-6">
                <Subhead />
                <div className="flex items-center space-x-3 desktop:space-x-6">
                  <SubscribeButton />
                  <DonateButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <NavBar navData={navData} />
    </>
  )
}

const SubscribeButton = () => {
  return (
    <Link href={"/subscribe"}>
      <button
        className={`shadow-lg bg-white text-zinc-800 font-medium text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
      >
        Subscribe
      </button>
    </Link>
  )
}

const DonateButton = () => {
  return (
    <Link href={"/donate"}>
      <button
        className={`shadow-lg bg-red-500 text-white font-medium text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
      >
        Donate
      </button>
    </Link>
  )
}

export default Header
