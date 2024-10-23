import Link from "next/link"
import { Homepage, HomepageBanners, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedBanner from "../homepage/featuredBanner"
import { PaperType } from "../paper"
import HeaderDefault from "./default"
import HomeBanner from "./homeBanner"
import NavBar from "./navBar"
import Subhead from "./subhead"
import VideoBG from "./videobg"

// Utility to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000) // Expire in x days
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

// Utility to get a cookie
const getCookie = (name: string): string | null => {
  const nameEQ = name + "="
  const cookies = document.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === " ") cookie = cookie.substring(1, cookie.length)
    if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length)
  }
  return null
}

export interface HeaderProps {
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

        <div className="relative h-[calc(100vh-11.5rem)]">
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

export default Header
