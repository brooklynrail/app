import { useState, useEffect } from "react"

const breakpoints = {
  card: 160,
  "card-lg": 240,
  mobile: 320,
  "mobile-lg": 480,
  tablet: 640,
  "tablet-lg": 880,
  desktop: 1024,
  "desktop-lg": 1256,
  widescreen: 1400,
}

// Custom hook to detect screen size
export const useBreakpoints = () => {
  // Get the initial screen size (for client-side rendering)
  const getInitialSize = () => (typeof window !== "undefined" ? window.innerWidth : 0)

  const [screenSize, setScreenSize] = useState(getInitialSize)

  useEffect(() => {
    // Handle resize events to update screen size
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determine the current breakpoint based on screen size
  const sortedBreakpoints = Object.entries(breakpoints)
    .sort(([, sizeA], [, sizeB]) => sizeB - sizeA) // Sort breakpoints in descending order
    .map(([key]) => key)

  const currentBreakpoint = sortedBreakpoints.find((key) => screenSize >= breakpoints[key as keyof typeof breakpoints])

  return currentBreakpoint || "card" // Default to 'card' if no match is found
}
