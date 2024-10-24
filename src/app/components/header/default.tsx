import Link from "next/link"
import { HeaderProps } from "."
import { getPermalink, PageType } from "../../../../lib/utils"
import Banner from "./banner"
import styles from "./header.module.scss"
import Subhead from "./subhead"

const HeaderDefault = (props: HeaderProps) => {
  const { title, type } = props
  const permalink = getPermalink({
    type: PageType.Home,
  })
  return (
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
  )
}

export default HeaderDefault
