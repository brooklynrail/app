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
      <div className="px-6">
        <div className="hidden">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>
        <Link href={permalink}>
          <Banner type={type} />
          <div className="block desktop:hidden w-full ">
            <Subhead />
          </div>
        </Link>
      </div>
      <div className="px-6">
        <div className="flex space-x-3 justify-between">
          <MenuButton />
          <div className="flex desktop:w-full space-x-6">
            <div className="hidden desktop:flex flex-col justify-center w-full ">
              <Subhead />
            </div>
            <div className="flex items-center space-x-3 desktop:space-x-6">
              <Button link={`/subscribe`} text={"Subscribe"} type={ButtonType.Subscribe}></Button>
              <Button link={`/donate`} text={"Donate"} type={ButtonType.Donate}></Button>
            </div>
          </div>
        </div>
      </div>
      {banners && currentIssue && <FeaturedBanner banners={banners} currentIssue={currentIssue} />}
    </header>
  )
}

export default Header
