import Link from "next/link"
import { HomepageCollections } from "../../../../lib/types"
import SearchField from "../search/searchField"
import CurrentEvents from "./currentEvents"
import Settings from "./settings"
import { useMenu } from "@/app/hooks/useMenu"
import CurrentNavigation from "./currentNavigation"

interface MenuProps {
  collections: HomepageCollections[]
}

const Menu = (props: MenuProps) => {
  const { collections } = props
  const { isMenuOpen, toggleMenu } = useMenu()

  const arrow = (
    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.646447 9.64645C0.451184 9.84171 0.451184 10.1583 0.646447 10.3536L3.82843 13.5355C4.02369 13.7308 4.34027 13.7308 4.53553 13.5355C4.7308 13.3403 4.7308 13.0237 4.53553 12.8284L1.70711 10L4.53553 7.17157C4.7308 6.97631 4.7308 6.65973 4.53553 6.46447C4.34027 6.2692 4.02369 6.2692 3.82843 6.46447L0.646447 9.64645ZM1 10.5H13V9.5H1V10.5Z"
        className="fill-zinc-900 dark:fill-slate-50"
      />
    </svg>
  )

  return (
    <>
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="bg-zinc-800 opacity-80 cursor-pointer fixed z-50 w-screen h-screen top-0 bottom-0 right-0 left-0 transition-opacity duration-300"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen z-[999] w-[calc(100vw-6rem)] max-w-[400px] overflow-y-auto bg-slate-50 dark:bg-zinc-700 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Settings />
        <div className="theme grid grid-cols-3 gap-x-3">
          <div className="col-span-3">
            <div className="p-6 space-y-6">
              <div className="relative flex flex-row-reverse justify-between w-full">
                <p
                  onClick={toggleMenu}
                  className="hover:underline font-bold text-xs uppercase flex items-center space-x-1"
                >
                  {arrow} <span>Close</span>
                </p>
                <p>
                  <Link className="font-bold text-sm uppercase" href="/">
                    Home
                  </Link>
                </p>
              </div>
              <SearchField />
            </div>
          </div>
          <CurrentEvents />
          <div className="col-span-3">
            <div className="divide-y rail-divide">
              <CurrentNavigation />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
