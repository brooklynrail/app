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

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<string | null>(null) // Tracks the type of popup
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    // Prevent body scroll when the popup is active
    document.body.style.overflow = showPopup ? "hidden" : "auto"
  }, [showPopup])

  useEffect(() => {
    // Check if the donate popup has been shown before
    const hasDonatePopup = document.cookie.split("; ").find((row) => row.startsWith("hasDonatePopup="))
    if (!hasDonatePopup) {
      // Show the donate popup if it's the user's first visit
      setPopupType("donate")
      setShowPopup(true)
      // Set a session cookie to prevent popup from showing again
      const expires = new Date()
      expires.setHours(expires.getHours() + 1)
      document.cookie = `hasDonatePopup=true; expires=${expires.toUTCString()}; path=/`
    }
  }, [])

  // Function to toggle the donate popup
  const toggleDonatePopup = () => {
    setPopupType("donate") // Set popup type to "donate"
    setShowPopup((prev) => !prev) // Toggle popup visibility
  }

  const value = {
    showPopup,
    setShowPopup,
    popupType,
    setPopupType,
    images,
    setImages,
    toggleDonatePopup, // Add toggleDonatePopup to the context value
  }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
