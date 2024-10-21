import { useState } from "react"
import OldMenu from "./oldMenu"

interface MenuButtonProps {
  classes: string
}

const MenuButton = (props: MenuButtonProps) => {
  const { classes } = props
  const pathfill = "fill-zinc-900 dark:fill-slate-100"
  const strokefill = "stroke-zinc-900 dark:stroke-slate-100"

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
    <div className="">
      <div
        className={`${classes} max-w-8 max-h-8 rounded-sm p-1 bg-white dark:bg-zinc-700 hover:cursor-pointer shadow-sm`}
      >
        <svg onClick={openMenu} className="" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8H12" className={strokefill} strokeLinecap="round" />
          <path d="M4 14H12" className={strokefill} strokeLinecap="round" />
          <path d="M4 21H18" className={strokefill} strokeLinecap="round" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.056 10.1863C14.2524 12.3401 15.347 14.7375 17.5008 15.5411C19.6545 16.3446 22.0519 15.2501 22.8555 13.0963C23.659 10.9425 22.5645 8.54513 20.4107 7.74157C18.2569 6.93801 15.8596 8.03257 15.056 10.1863ZM14.1191 9.83678C13.1225 12.508 14.48 15.4814 17.1512 16.478C18.5496 16.9997 20.0308 16.8763 21.2678 16.2569L22.2525 18.4136C22.3672 18.6648 22.6638 18.7755 22.915 18.6608C23.1662 18.5461 23.2769 18.2495 23.1622 17.9983L22.1218 15.7197C22.8551 15.1515 23.4443 14.3788 23.7924 13.4459C24.789 10.7746 23.4315 7.80128 20.7603 6.80466C18.0891 5.80804 15.1157 7.16557 14.1191 9.83678Z"
            className={pathfill}
          />
        </svg>
      </div>

      {isMenuOpen && (
        <>
          <div
            onClick={closeMenu}
            className="bg-zinc-800 opacity-80 cursor-pointer fixed z-50 w-screen h-screen top-0 bottom-0 right-0 left-0"
          ></div>
          <OldMenu closeMenu={closeMenu} />
        </>
      )}
    </div>
  )
}

export default MenuButton
