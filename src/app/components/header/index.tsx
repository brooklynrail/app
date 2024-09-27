import Link from "next/link"
import Banner from "./banner"
import styles from "./header.module.scss"
import Button from "../button"
import ButtonMenu from "../button-menu"
import OldNav from "./oldNav"
import OldLogo from "./oldLogo"
import { useEffect, useState } from "react"
import OldMenu from "./oldMenu"
import { Issues } from "../../../../lib/types"
import MenuButton from "./menuButton"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  useOldLogo?: boolean
  thisIssueData: Issues
}

const Header = (props: HeaderProps) => {
  const { title, useOldLogo, thisIssueData } = props

  return (
    <>
      <header id={styles.rail_header} className="border-b-[1px] rail-border">
        <div className="relative">
          <div className="hidden">
            <h1>The Brooklyn Rail </h1>
            <h2>Critical Perspectives on Art, Politics and Culture</h2>
            {title && <h3>{title}</h3>}
          </div>

          {useOldLogo ? (
            <div className="py-4">
              <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-4 desktop:gap-6 gap-y-4">
                <div className="col-span-4 tablet-lg:col-span-4 desktop:col-span-5">
                  <div className="rail_logo">
                    <Link href="/">{useOldLogo ? <OldLogo /> : <Banner />}</Link>
                  </div>
                  <MenuButton />
                </div>
                <div className="hidden tablet-lg:block col-span-12 tablet-lg:col-span-8 desktop:col-span-7">
                  <div className="flex flex-col h-full justify-center">
                    <OldNav />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-0">
              <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-6 gap-y-4">
                <div className="col-span-12">
                  <div className="px-9">
                    <Link href="/">
                      <Banner />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
