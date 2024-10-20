import Link from "next/link"
import Banner from "./banner"
import styles from "./header.module.scss"
import Button, { ButtonType } from "../button"
import MenuButton from "./menuButton"
import Subhead from "./subhead"
import { getPermalink, PageType } from "../../../../lib/utils"
import { HomepageBanners, Issues } from "../../../../lib/types"
import FeaturedBanner from "../homepage/featuredBanner"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  type: HeaderType
  banners?: HomepageBanners[]
  currentIssue?: Issues
}

export enum HeaderType {
  Default = "default",
  Alt = "alt",
  Events = "events",
}

const Header = (props: HeaderProps) => {
  const { title, type, banners, currentIssue } = props

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return (
    <header id={styles.rail_header} className={`rail-header-${type}`}>
      <div className="px-3 tablet-lg:px-6">
        <div className="hidden">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>
        <Link href={permalink}>
          <Banner type={type} />
        </Link>
      </div>
      <div className="px-3 tablet-lg:px-6 pb-3">
        <div className="flex space-x-3 justify-between">
          <div className="flex flex-col items-end tablet-lg:flex-row tablet-lg:items-center justify-center w-full space-y-3 tablet-lg:space-y-0 space-x-6 ">
            <Subhead />
            <div className="flex items-center space-x-3 desktop:space-x-6">
              <Link href={"/subscribe"}>
                <button
                  className={`bg-white text-zinc-800 font-medium shadow-md shadow-zinc-300 text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
                >
                  Subscribe
                </button>
              </Link>
              <Link href={"/donate"}>
                <button
                  className={`bg-red-500 text-white font-medium shadow-md shadow-zinc-300 text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
                >
                  Donate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {banners && currentIssue && <FeaturedBanner banners={banners} currentIssue={currentIssue} />}
    </header>
  )
}

export default Header
