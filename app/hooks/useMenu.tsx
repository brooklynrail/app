import { useState, createContext, useContext, ReactNode } from "react"

// Define the shape of the context's value
interface MenuContextType {
  isMenuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

// Create context with a default value
const MenuContext = createContext<MenuContextType>({
  isMenuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  toggleMenu: () => {},
})

// Custom hook to use the Menu context
export const useMenu = (): MenuContextType => {
  return useContext(MenuContext)
}

// Provider component to wrap around parts of the app that need menu access
interface MenuProviderProps {
  children: ReactNode
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev) // Toggle state

  return <MenuContext.Provider value={{ isMenuOpen, openMenu, closeMenu, toggleMenu }}>{children}</MenuContext.Provider>
}
