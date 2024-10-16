"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface PopupContextType {
  showPopup: boolean
  setShowPopup: (show: boolean) => void
  popupType: string | null
  setPopupType: (type: string | null) => void
  images: any[]
  setImages: (images: any[]) => void
  togglePopup: (type: string) => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const usePopup = () => {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider")
  }
  return context
}

const getCookie = (name: string): string | null => {
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

export const PopupProvider = ({ children, hidePopup }: PopupProviderProps) => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<string | null>(null)
  const [images, setImages] = useState<any[]>([])
  const [viewedDonateCount, setViewedDonateCount] = useState<number | null>(null)

  // Read cookie value once on mount
  useEffect(() => {
    const count = parseInt(getCookie("viewDonatePopup") || "0", 10) || 0
    setViewedDonateCount(count)
  }, [])

  // Trigger donation popup if conditions are met
  useEffect(() => {
    if (viewedDonateCount !== null && viewedDonateCount < 2) {
      setPopupType("donate")
      setShowPopup(true)
      const newCount = viewedDonateCount + 1
      setViewedDonateCount(newCount)
      setCookie("viewDonatePopup", newCount.toString(), 1) // Expires in 1 hour
    }
  }, [viewedDonateCount])

  const togglePopup = (type: string) => {
    setPopupType(type)
    setShowPopup((prev) => !prev)
  }

  const value: PopupContextType = {
    showPopup,
    setShowPopup,
    popupType,
    setPopupType,
    images,
    setImages,
    togglePopup,
  }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
