import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface PopupContextType {
  showPopup: boolean
  setShowPopup: (show: boolean) => void
  popupType: string | null
  setPopupType: (type: string | null) => void
  images: any[]
  setImages: (images: any[]) => void
  toggleDonatePopup: () => void
}

const PopupContext = createContext<PopupContextType>({
  showPopup: false,
  setShowPopup: () => {},
  popupType: null,
  setPopupType: () => {},
  images: [],
  setImages: () => {},
  toggleDonatePopup: () => {},
})

export const usePopup = () => useContext(PopupContext)

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : null
}

const setCookie = (name: string, value: string, hours: number) => {
  const expires = new Date()
  expires.setHours(expires.getHours() + hours)
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`
}

interface PopupProviderProps {
  children: ReactNode
  hidePopup?: boolean
}

export const PopupProvider = (props: PopupProviderProps) => {
  const { children, hidePopup } = props
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<string | null>(null)
  const [viewCount, setViewCount] = useState<number>(0)
  const [viewCountUpdated, setViewCountUpdated] = useState(false) // New flag to track updates
  const [images, setImages] = useState<any[]>([])
  useEffect(() => {
    if (!hidePopup) {
      document.body.style.overflow = showPopup ? "hidden" : "auto"
    }
  }, [showPopup])

  useEffect(() => {
    // Retrieve view count from cookies
    const viewedDonateCount = parseInt(getCookie("viewCount") || "0", 10)

    if (isNaN(viewedDonateCount)) {
      console.error("Invalid cookie value for view count")
      return
    }

    // Check if the view count has already been updated during this session
    if (viewCountUpdated) {
      return
    }

    // If view count is less than 4, show the popup and update the cookie
    if (viewedDonateCount < 2) {
      setPopupType("donate")
      setShowPopup(true)
      const newCount = viewedDonateCount + 1
      setViewCount(newCount)
      setViewCountUpdated(true) // Mark that we've updated the count
      setCookie("viewCount", newCount.toString(), 1) // Set cookie to expire in 1 hour
    }
  }, [viewCountUpdated]) // Only re-run this effect if `viewCountUpdated` changes

  const toggleDonatePopup = () => {
    setPopupType("donate")
    setShowPopup((prev) => !prev)
  }

  const value = {
    showPopup,
    setShowPopup,
    popupType,
    setPopupType,
    images,
    setImages,
    toggleDonatePopup,
  }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
