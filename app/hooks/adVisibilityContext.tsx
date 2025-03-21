"use client"
import { usePathname } from "next/navigation"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"

// Utility functions for cookies
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null
  }
  return null
}

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

interface AdVisibilityContextProps {
  isAdVisible: boolean
  closeAd: () => void
}

const AdVisibilityContext = createContext<AdVisibilityContextProps | undefined>(undefined)

export const AdVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [isAdVisible, setIsAdVisible] = useState<boolean>(true)

  const days = 0.041 // roughly 1 hour

  const closeAd = useCallback(() => {
    setIsAdVisible(false)
    if (typeof document !== "undefined") {
      setCookie("isAdVisible", JSON.stringify(false), days)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      const storedValue = getCookie("isAdVisible")
      setIsAdVisible(storedValue !== null ? JSON.parse(storedValue) : true)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      const shouldShowAd =
        pathname === "/" ||
        pathname.startsWith("/section/") ||
        pathname.startsWith("/events/") ||
        pathname.startsWith("/issue/")

      if (shouldShowAd) {
        setIsAdVisible(true)
        setCookie("isAdVisible", JSON.stringify(true), days)
      }
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
