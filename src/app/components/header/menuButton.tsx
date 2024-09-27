import { useTheme } from "@/app/components/theme"
import { useState } from "react"
import OldMenu from "./oldMenu"
import { Issues } from "../../../../lib/types"

const MenuButton = () => {
  const { theme } = useTheme()
  const pathfill = theme === "dark" ? "fill-white" : "fill-zinc-900"
  const strokefill = theme === "dark" ? "stroke-white" : "stroke-zinc-900"

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  console.log("isMenuOpen", isMenuOpen)

  // Function to open the menu
  const openMenu = () => {
    setIsMenuOpen(true)
  }

  // Function to close the menu (either by clicking the overlay or menu close button)
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <svg
        className="tablet-lg:hidden"
        onClick={openMenu}
        width="54"
        height="49"
        viewBox="0 0 54 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 13.6636H25" className={strokefill} strokeWidth="2" strokeLinecap="round" />
        <path d="M9 24.6636H25" className={strokefill} strokeWidth="2" strokeLinecap="round" />
        <path d="M9 36.6636H36" className={strokefill} strokeWidth="2" strokeLinecap="round" />
        <path
          className={pathfill}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.826 17.1824C28.3793 21.06 30.3499 25.3762 34.2274 26.8229C38.105 28.2696 42.4212 26.299 43.8679 22.4214C45.3146 18.5438 43.344 14.2277 39.4664 12.781C35.5888 11.3343 31.2727 13.3049 29.826 17.1824ZM27.9521 16.4833C26.1193 21.3958 28.6159 26.8639 33.5283 28.6967C36.0717 29.6456 38.764 29.434 41.0237 28.3275L42.8328 32.2901C43.0622 32.7925 43.6554 33.0138 44.1578 32.7844C44.6602 32.5551 44.8815 31.9618 44.6522 31.4594L42.7318 27.2534C44.0514 26.2133 45.1115 24.8097 45.7417 23.1205C47.5745 18.2081 45.078 12.7399 40.1655 10.9071C35.2531 9.07432 29.785 11.5709 27.9521 16.4833Z"
          fill="#18181B"
        />
      </svg>

      {isMenuOpen && (
        <>
          <div
            onClick={closeMenu}
            className="bg-zinc-800 opacity-80 cursor-pointer fixed z-50 w-screen h-screen top-0 bottom-0 right-0 left-0"
          ></div>
          <OldMenu />
        </>
      )}
    </>
  )
}

export default MenuButton
