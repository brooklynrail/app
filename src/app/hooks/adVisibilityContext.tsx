import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"

interface AdVisibilityContextProps {
  isAdVisible: boolean
  closeAd: () => void
}

const AdVisibilityContext = createContext<AdVisibilityContextProps | undefined>(undefined)

export const AdVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isAdVisible, setIsAdVisible] = useState(true)

  useEffect(() => {
    // Reset visibility to true on each page load
    setIsAdVisible(true)
  }, [])

  const closeAd = useCallback(() => {
    setIsAdVisible(false)
  }, [])

  return <AdVisibilityContext.Provider value={{ isAdVisible, closeAd }}>{children}</AdVisibilityContext.Provider>
}

export const useAdVisibility = () => {
  const context = useContext(AdVisibilityContext)
  if (!context) {
    throw new Error("useAdVisibility must be used within an AdVisibilityProvider")
  }
  return context
}
