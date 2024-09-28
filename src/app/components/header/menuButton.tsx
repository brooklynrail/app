import { useTheme } from "@/app/components/theme"
import { useState } from "react"
import OldMenu from "./oldMenu"
import { Issues } from "../../../../lib/types"

const MenuButton = () => {
  const { theme } = useTheme()
  const pathfill = "fill-zinc-900"
  const strokefill = "stroke-zinc-900"

  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        className=" flex-none w-[50px] h-[51px] tablet-lg:w-[66px] tablet-lg:h-[67px] relative -left-1"
        onClick={openMenu}
        viewBox="0 0 66 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_2293_3928)">
          <rect x="6" y="4.58936" width="54" height="54" rx="4" fill="white" shape-rendering="crispEdges" />
          <path d="M15 20.6636H31" className={strokefill} stroke-width="2" stroke-linecap="round" />
          <path d="M15 31.6636H31" className={strokefill} stroke-width="2" stroke-linecap="round" />
          <path d="M15 43.6636H42" className={strokefill} stroke-width="2" stroke-linecap="round" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35.826 24.1824C34.3793 28.06 36.3499 32.3762 40.2274 33.8229C44.105 35.2696 48.4212 33.299 49.8679 29.4214C51.3146 25.5438 49.344 21.2277 45.4664 19.781C41.5888 18.3343 37.2727 20.3049 35.826 24.1824ZM33.9521 23.4833C32.1193 28.3958 34.6159 33.8639 39.5283 35.6967C42.0717 36.6456 44.764 36.434 47.0237 35.3275L48.8328 39.2901C49.0622 39.7925 49.6554 40.0138 50.1578 39.7844C50.6602 39.5551 50.8815 38.9618 50.6522 38.4594L48.7318 34.2534C50.0514 33.2133 51.1115 31.8097 51.7417 30.1205C53.5745 25.2081 51.078 19.7399 46.1655 17.9071C41.2531 16.0743 35.785 18.5709 33.9521 23.4833Z"
            className={pathfill}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_2293_3928"
            x="0"
            y="0.589355"
            width="66"
            height="66"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.654902 0 0 0 0 0.67451 0 0 0 0 0.694118 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2293_3928" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2293_3928" result="shape" />
          </filter>
        </defs>
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
