"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

// Define the shape of your context
interface VideoContextProps {
  isVideoPaused: boolean
  toggleVideoState: () => void
  isVideoVisible: boolean
  toggleVideoVisibility: () => void
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined)

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider")
  }
  return context
}

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(false)
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(false) // Ensure initial state is set to false

  // Load video state from localStorage on mount
  useEffect(() => {
    const storedState = localStorage.getItem("videoState")
    if (storedState === "paused") {
      setIsVideoPaused(true)
    }
  }, [])

  useEffect(() => {
    const storedVisibility = localStorage.getItem("videoVisibility")
    if (storedVisibility) {
      setIsVideoVisible(storedVisibility === "visible")
    }
  }, [])

  // Save video state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("videoState", isVideoPaused ? "paused" : "playing")
  }, [isVideoPaused])

  useEffect(() => {
    localStorage.setItem("videoVisibility", isVideoVisible ? "visible" : "hidden")
  }, [isVideoVisible])

  // Toggle video state between paused and playing
  const toggleVideoState = () => {
    setIsVideoPaused((prev) => !prev)
  }

  // Toggle video visibility between visible and hidden
  const toggleVideoVisibility = () => {
    setIsVideoVisible((prev) => !prev)
  }

  return (
    <VideoContext.Provider value={{ isVideoPaused, toggleVideoState, isVideoVisible, toggleVideoVisibility }}>
      {children}
    </VideoContext.Provider>
  )
}
