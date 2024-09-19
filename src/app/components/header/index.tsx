import Link from "next/link"
import Banner from "./banner"
import styles from "./header.module.scss"
import Button from "../button"
import ButtonMenu from "../button-menu"
import ThemeToggle from "../themeToggle"
import { useState } from "react"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
}

const Header = (props: HeaderProps) => {
  const { title } = props
  const [theme, setTheme] = useState<string | null>(null)

  const themeSettings = { theme, setTheme }

  return (
    <>
      <header className={`${styles.head} border-b-2 border-black dark:border-white border-dotted`}>
        <div className="logo">
          <div id={styles.textflag}>
            <h1>The Brooklyn Rail </h1>
            <h2>Critical Perspectives on Art, Politics and Culture</h2>
            {title && <h3>{title}</h3>}
          </div>
          <Link href="/">
            <Banner theme={theme} />
          </Link>
          <div className="px-4">
            <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-6 gap-y-4">
              <div className="col-span-12">
                <div className="flex justify-between items-center">
                  <ButtonMenu />
                  <h2 className={styles.subhead}>
                    Critical Perspectives on Arts, Politics, and Culture <span>·</span> Independent and Free
                  </h2>
                  <div className="flex space-x-4">
                    <Button text="Subscribe" />
                    <Button text="Donate" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ThemeToggle {...themeSettings} />
    </>
  )
}

export default Header
