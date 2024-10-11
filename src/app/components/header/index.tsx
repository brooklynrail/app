import Link from "next/link"
import Banner from "./banner"
import styles from "./header.module.scss"
import Button, { ButtonType } from "../button"
import MenuButton from "./menuButton"
import Subhead from "./subhead"
import { getPermalink, PageType } from "../../../../lib/utils"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  type: HeaderType
}

export enum HeaderType {
  Default = "default",
  Alt = "alt",
  Events = "events",
}

const Header = (props: HeaderProps) => {
  const { title, type } = props

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return (
    <header id={styles.rail_header} className="border-b-[1px] rail-border">
      <div className="relative">
        <div className="hidden">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>

        <div className={`pb-1.5 tablet:py-3 px-3 tablet:px-6 rail-header-${type}`}>
          <div className="">
            <Link href={permalink}>
              <Banner type={type} />
              <div className="block desktop:hidden w-full ">
                <Subhead />
              </div>
            </Link>
          </div>
          <div className="">
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
        </div>
      </div>
    </header>
  )
}

export default Header
