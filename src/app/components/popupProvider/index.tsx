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

const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key)
}

const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value)
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

  // Read localStorage value once on mount
  useEffect(() => {
    const count = parseInt(getLocalStorageItem("viewDonatePopup") || "0", 10) || 0
    setViewedDonateCount(count)
  }, [])

  // Trigger donation popup if conditions are met
  useEffect(() => {
    if (viewedDonateCount !== null && viewedDonateCount < 2) {
      setPopupType("donate")
      setShowPopup(true)
      const newCount = viewedDonateCount + 1
      setViewedDonateCount(newCount)
      setLocalStorageItem("viewDonatePopup", newCount.toString()) // Store in localStorage
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
