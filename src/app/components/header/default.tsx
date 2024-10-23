import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import Banner from "./banner"
import styles from "./header.module.scss"
import MenuButton from "./menuButton"
import NavBar from "./navBar"
import Subhead from "./subhead"
import { HeaderProps } from "."

const HeaderDefault = (props: HeaderProps) => {
  const { title, type, navData } = props
  const permalink = getPermalink({
    type: PageType.Home,
  })
  return (
    <>
      <header id={styles.rail_header} className={`border-b rail-border rail-header-${type}`}>
        <div className="hidden">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>
        <div className="relative">
          <div className="p-3 tablet:px-6">
            <Link href={permalink} className="w-full space-y-3">
              <Banner type={type} />
              <Subhead />
            </Link>
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

export default HeaderDefault
