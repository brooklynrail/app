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

// Helper to retrieve and parse local storage item
const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key)
}

// Helper to set item in local storage
const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

// Define expiration time (1 hour in milliseconds)
const ONE_HOUR = 60 * 60 * 1000

interface PopupProviderProps {
  children: ReactNode
  hidePopup?: boolean
}

export const PopupProvider = ({ children, hidePopup }: PopupProviderProps) => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<string | null>(null)
  const [images, setImages] = useState<any[]>([])
  const [viewedDonateCount, setViewedDonateCount] = useState<number | null>(null)

  // Initialize viewedDonateCount and handle expiration logic
  useEffect(() => {
    const storedCount = parseInt(getLocalStorageItem("donatePopup") || "0", 10) || 0
    const storedTimestamp = parseInt(getLocalStorageItem("donatePopupTimestamp") || "0", 10)

    const currentTime = Date.now()
    if (storedTimestamp && currentTime - storedTimestamp < ONE_HOUR) {
      // If within expiration period, use stored count
      setViewedDonateCount(storedCount)
    } else {
      // If expired, reset count and timestamp
      setViewedDonateCount(0)
      setLocalStorageItem("donatePopup", "0")
      setLocalStorageItem("donatePopupTimestamp", currentTime.toString())
    }
  }, [])

  // Trigger donation popup if conditions are met
  useEffect(() => {
    if (viewedDonateCount !== null && viewedDonateCount < 2) {
      setPopupType("donate")
      setShowPopup(true)

      // Increment count and reset timestamp in local storage
      const newCount = viewedDonateCount + 1
      const currentTime = Date.now()
      setViewedDonateCount(newCount)
      setLocalStorageItem("donatePopup", newCount.toString())
      setLocalStorageItem("donatePopupTimestamp", currentTime.toString())
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
