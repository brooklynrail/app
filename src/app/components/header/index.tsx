import Link from "next/link"
import Banner from "./banner"
import styles from "./header.module.scss"
import Button, { ButtonType } from "../button"
import ButtonMenu from "../button-menu"
import OldNav from "./oldNav"
import OldLogo from "./oldLogo"
import { useEffect, useState } from "react"
import OldMenu from "./oldMenu"
import { Issues } from "../../../../lib/types"
import MenuButton from "./menuButton"
import Subhead from "./subhead"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
  useOldLogo?: boolean
}

const Header = (props: HeaderProps) => {
  const { title, useOldLogo } = props

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
              <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
                <div className="col-span-4 tablet-lg:col-span-4 desktop:col-span-5">
                  <div className="rail_logo">
                    <Link href="/">{useOldLogo ? <OldLogo /> : <Banner />}</Link>
                  </div>
                </div>
                <div className="col-span-4 tablet-lg:col-span-8 desktop:col-span-7">
                  <div className="flex flex-row h-full justify-between tablet-lg:justify-end">
                    <div className="block tablet-lg:hidden">
                      <MenuButton />
                    </div>

                    <div className="tablet-lg:hidden flex space-x-3 items-center">
                      <Button link={`/subscribe`} text={"Subscribe"} type={ButtonType.Subscribe}></Button>
                      <Button link={`/donate`} text={"Donate"} type={ButtonType.Donate}></Button>
                    </div>

                    <div className="hidden tablet-lg:flex flex-col h-full justify-center">
                      <OldNav />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pb-1.5 tablet:py-3 px-3 tablet:px-6">
              <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-1">
                <div className="col-span-4 tablet-lg:col-span-12">
                  <Link href="/">
                    <Banner />
                    <div className="block desktop:hidden w-full ">
                      <Subhead />
                    </div>
                  </Link>
                </div>
                <div className="col-span-4 tablet-lg:col-span-12">
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
          )}
        </div>
      </header>
    </>
  )
}

export default Header
