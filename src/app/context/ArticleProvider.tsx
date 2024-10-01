import React, { createContext, useContext, useEffect, useState } from "react"

import { useArticleSwitcher } from "../hooks/useArticleSwitcher"
import { Articles } from "../../../lib/types"
import { SwipeableHandlers } from "react-swipeable"

interface ArticleContextProps {
  currentArticle: Articles
  setArticleSlug: (slug: string) => void
  setArticleRef: (ref: HTMLDivElement | null) => void
  swipeHandlers: SwipeableHandlers
}

const ArticleContext = createContext<ArticleContextProps | undefined>(undefined)

interface ArticleProviderProps {
  initialArticle: Articles
  articles: Articles[]
  children: React.ReactNode
}

export const ArticleProvider = ({ children, initialArticle, articles }: ArticleProviderProps) => {
  const { currentArticle, setArticleSlug, swipeHandlers } = useArticleSwitcher(initialArticle, articles)

  // Track the ref for the current article element
  const [articleRef, setArticleRef] = useState<HTMLDivElement | null>(null)

  // Scroll into view when the article changes,
  // skip if the initial article is the same as the current article
  useEffect(() => {
    if (currentArticle.slug !== initialArticle.slug && articleRef) {
      articleRef.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [currentArticle, articleRef])

  return (
    <ArticleContext.Provider value={{ currentArticle, setArticleSlug, setArticleRef, swipeHandlers }}>
      {children}
    </ArticleContext.Provider>
  )
}

// Custom hook to access article context
export const useArticleContext = () => {
  const context = useContext(ArticleContext)
  if (context === undefined) {
    throw new Error("useArticleContext must be used within an ArticleProvider")
  }
  return context
}
