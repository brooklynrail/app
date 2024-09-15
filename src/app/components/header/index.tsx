import Link from "next/link"
import Banner from "./banner"
import styles from "./header.module.scss"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
}

const Header = (props: HeaderProps) => {
  const { special_issue, issue_number, title } = props

  return (
    <div id="header_section">
      <div className="logo">
        <div id={styles.textflag}>
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>
        TKTKHEADER
        <Link href="/">
          <Banner />
        </Link>
      </div>
    </div>
  )
}

export default Header
