import React, { createContext, useContext, useState } from "react"

const PopupContext = createContext({
  showPopup: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setShowPopup: (show: boolean) => {},
  images: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setImages: (images: any[]) => {},
})

export const usePopup = () => useContext(PopupContext)

export const PopupProvider = ({ children }: any) => {
  const [showPopup, setShowPopup] = useState(false)
  const [images, setImages] = useState([])

  const value = { showPopup, setShowPopup, images, setImages }

  console.log("PopupProvider", value)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
