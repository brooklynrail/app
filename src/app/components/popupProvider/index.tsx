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
  showArticleSlideShow: boolean
  setShowArticleSlideShow: (show: boolean) => void
  toggleArticleSlideShow: (id?: string) => void
  slideId: string | null
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
  const [showPopup, setShowPopup] = useState(true)
  const [popupType, setPopupType] = useState<string | null>(null)
  const [images, setImages] = useState<any[]>([])
  const [viewedDonateCount, setViewedDonateCount] = useState<number | null>(null)
  const [showArticleSlideShow, setShowArticleSlideShow] = useState(false)
  const [slideId, setSlideId] = useState<string | null>(null)

  // Initialize viewedDonateCount and handle expiration logic
  // useEffect(() => {
  //   const storedCount = parseInt(getLocalStorageItem("donatePopup") || "0", 10) || 0
  //   const storedTimestamp = parseInt(getLocalStorageItem("donatePopupTimestamp") || "0", 10)

  //   const currentTime = Date.now()
  //   if (storedTimestamp && currentTime - storedTimestamp < ONE_HOUR) {
  //     setViewedDonateCount(storedCount)
  //   } else {
  //     setViewedDonateCount(0)
  //     setLocalStorageItem("donatePopup", "0")
  //     setLocalStorageItem("donatePopupTimestamp", currentTime.toString())
  //   }
  // }, [])

  useEffect(() => {
    setPopupType("donate")
    setShowPopup(true)
    // if (viewedDonateCount !== null && viewedDonateCount < 2) {
    //   const newCount = viewedDonateCount + 1
    //   const currentTime = Date.now()
    //   setViewedDonateCount(newCount)
    //   setLocalStorageItem("donatePopup", newCount.toString())
    //   setLocalStorageItem("donatePopupTimestamp", currentTime.toString())
    // }
  }, [viewedDonateCount])

  const togglePopup = (type: string) => {
    setPopupType(type)
    setShowPopup((prev) => !prev)
  }

  // Toggle function for the ArticleSlideShow popup with optional ID
  const toggleArticleSlideShow = (id?: string) => {
    setShowArticleSlideShow((prev) => !prev)
    if (id !== undefined) setSlideId(id)
  }

  const value: PopupContextType = {
    showPopup,
    setShowPopup,
    popupType,
    setPopupType,
    images,
    setImages,
    togglePopup,
    showArticleSlideShow,
    setShowArticleSlideShow,
    toggleArticleSlideShow,
    slideId,
  }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
