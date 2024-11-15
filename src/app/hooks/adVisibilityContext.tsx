import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"

interface AdVisibilityContextProps {
  isAdVisible: boolean
  closeAd: () => void
}

const AdVisibilityContext = createContext<AdVisibilityContextProps | undefined>(undefined)

export const AdVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  // Initialize from sessionStorage once per session
  const [isAdVisible, setIsAdVisible] = useState<boolean>(() => {
    const storedValue = sessionStorage.getItem("isAdVisible")
    return storedValue !== null ? JSON.parse(storedValue) : true
  })

  const closeAd = useCallback(() => {
    setIsAdVisible(false)
    sessionStorage.setItem("isAdVisible", JSON.stringify(false))
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
      sessionStorage.setItem("isAdVisible", JSON.stringify(true))
    }
  }, [pathname])

  // No need for an additional useEffect because session storage persists the value for the current session
  return <AdVisibilityContext.Provider value={{ isAdVisible, closeAd }}>{children}</AdVisibilityContext.Provider>
}

export const useAdVisibility = () => {
  const context = useContext(AdVisibilityContext)
  if (!context) {
    throw new Error("useAdVisibility must be used within an AdVisibilityProvider")
  }
  return context
}
