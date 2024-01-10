import React, { ReactComponentElement, createContext, useContext, useState } from "react"

const PopupContext = createContext({
  showPopup: false,
  setShowPopup: (show: boolean) => {},
  images: [],
  setImages: (images: any[]) => {},
})

export const usePopup = () => useContext(PopupContext)

export const PopupProvider = ({ children }: any) => {
  const [showPopup, setShowPopup] = useState(false)
  const [images, setImages] = useState([])

  const value = { showPopup, setShowPopup, images, setImages }

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
