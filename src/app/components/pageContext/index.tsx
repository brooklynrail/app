"use client"
import { createContext, useContext, useState, ReactNode } from "react"

interface PageContextType {
  currentContext: string | null
  setCurrentContext: (context: string | null) => void
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export const usePageContext = () => {
  const context = useContext(PageContext)

  if (!context) {
    throw new Error("usePageContext must be used within a PageContextProvider")
  }
  return context
}

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentContext, setCurrentContext] = useState<string | null>(null)

  return <PageContext.Provider value={{ currentContext, setCurrentContext }}>{children}</PageContext.Provider>
}
