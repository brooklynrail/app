import Link from "next/link"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import Banner from "./banner"
import styles from "./header.module.scss"
import NavBar from "./navBar"
import { PaperType } from "../paper"
import MenuButton from "./menuButton"
import Subhead from "./subhead"

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
      <header id={styles.rail_header} className={`relative rail-header-${type}`}>
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
            </div>
          </div>
          <div className="px-3 pb-3 tablet-lg:px-6 flex justify-between items-center w-full space-x-9 tablet:space-x-9">
            <div className="w-full">
              <div className="hidden tablet:block ">
                <Subhead />
              </div>
              <div className="tablet:hidden">
                <p className="uppercase text-white text-sm tracking-wider">
                  Critical Perspectives on Arts, <span className="">Politics, and Culture</span>
                </p>
              </div>
            </div>
            <div className="">
              <div className="hidden tablet:flex justify-center items-center space-x-3 desktop:space-x-6">
                <Link href={"/subscribe"}>
                  <button
                    className={`bg-white text-zinc-800 font-medium text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
                  >
                    Subscribe
                  </button>
                </Link>
                <Link href={"/donate"}>
                  <button
                    className={`bg-red-500 text-white font-medium text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
                  >
                    Donate
                  </button>
                </Link>
              </div>
              <div className="tablet:hidden w-full">
                <MenuButton classes={`w-[9vw] h-[9vw]`} />
              </div>
            </div>
          </div>

          {banners && currentIssue && <FeaturedBanner banners={banners} currentIssue={currentIssue} />}
        </div>
      </header>
      <NavBar navData={navData} />
    </>
  )
}

const HeaderDefault = (props: HeaderProps) => {
  const { title, type } = props
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
                <MenuButton classes={`w-[7vw] h-[7vw]`} />
              </div>
            </div>
          </div>
          <div className="hidden tablet:block px-3 tablet-lg:px-6 pb-3">
            <div className="flex space-x-3 justify-between">
              <div className="flex flex-col items-end tablet:flex-row tablet:items-center justify-center w-full space-y-3 tablet:space-y-0 tablet:space-x-6 desktop:space-x-6">
                <Subhead />
                <div className="flex items-center space-x-3 desktop:space-x-6">
                  <Link href={"/subscribe"}>
                    <button
                      className={`bg-white text-zinc-800 font-medium text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
                    >
                      Subscribe
                    </button>
                  </Link>
                  <Link href={"/donate"}>
                    <button
                      className={`bg-red-500 text-white font-medium text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
                    >
                      Donate
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
