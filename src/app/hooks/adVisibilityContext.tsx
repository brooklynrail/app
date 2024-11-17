import { usePathname } from "next/navigation"
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { getCookie, setCookie } from "../../../lib/utils/cookies"

interface AdVisibilityContextProps {
  isAdVisible: boolean
  closeAd: () => void
}

const AdVisibilityContext = createContext<AdVisibilityContextProps | undefined>(undefined)

export const AdVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  // Initialize from cookies
  const [isAdVisible, setIsAdVisible] = useState<boolean>(() => {
    const storedValue = getCookie("isAdVisible")
    return storedValue !== null ? JSON.parse(storedValue) : true
  })

  const days = 0.041 // roughly 1 hour

  const closeAd = useCallback(() => {
    setIsAdVisible(false)
    setCookie("isAdVisible", JSON.stringify(false), days)
  }, [])

  useEffect(() => {
    // Check if the current path is '/' or starts with '/section/'
    const shouldShowAd =
      pathname === "/" ||
      pathname.startsWith("/section/") ||
      pathname.startsWith("/events/") ||
      pathname.startsWith("/issue/")

    if (shouldShowAd) {
      setIsAdVisible(true)
      setCookie("isAdVisible", JSON.stringify(true), days)
    }
  }, [pathname])

  return <AdVisibilityContext.Provider value={{ isAdVisible, closeAd }}>{children}</AdVisibilityContext.Provider>
}

export const useAdVisibility = () => {
  const context = useContext(AdVisibilityContext)
  if (!context) {
    throw new Error("useAdVisibility must be used within an AdVisibilityProvider")
  }
  return context
}
