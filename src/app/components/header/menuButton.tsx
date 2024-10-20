import { useState } from "react"
import OldMenu from "./oldMenu"

const MenuButton = () => {
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
        onClick={openMenu}
        // className=" flex-none w-[40px] h-[41px] tablet:w-[50px] tablet:h-[51px] tablet-lg:w-[66px] tablet-lg:h-[67px] relative -left-1"
        className="hover:bg-slate-100"
        width="28"
        height="20"
        viewBox="0 0 28 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 4.00098H10" className={strokefill} strokeWidth="2" strokeLinecap="round" />
        <path d="M1 11H10" className={strokefill} strokeWidth="2" strokeLinecap="round" />
        <path d="M1 19H17" className={strokefill} strokeWidth="2" strokeLinecap="round" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.2191 6.40223C13.43 8.51714 14.5048 10.8713 16.6197 11.6604C18.7347 12.4494 21.0888 11.3746 21.8779 9.25969C22.6669 7.14477 21.5921 4.79063 19.4772 4.00156C17.3623 3.21249 15.0081 4.28731 14.2191 6.40223ZM12.3452 5.70311C11.1701 8.85291 12.7708 12.359 15.9206 13.5342C17.4311 14.0977 19.0234 14.0229 20.4014 13.4451L21.5621 15.9872C21.7915 16.4896 22.3847 16.711 22.8871 16.4816C23.3895 16.2522 23.6108 15.659 23.3814 15.1566L22.1084 12.3682C22.8213 11.7313 23.3943 10.9167 23.7517 9.9588C24.9269 6.809 23.3261 3.30291 20.1763 2.12773C17.0265 0.952553 13.5204 2.5533 12.3452 5.70311Z"
          className={pathfill}
        />
      </svg>

      {isMenuOpen && (
        <>
          <div
            onClick={closeMenu}
            className="bg-zinc-800 opacity-80 cursor-pointer fixed z-50 w-screen h-screen top-0 bottom-0 right-0 left-0"
          ></div>
          <OldMenu closeMenu={closeMenu} />
        </>
      )}
    </>
  )
}

export default MenuButton
