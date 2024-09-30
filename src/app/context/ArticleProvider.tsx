import React, { createContext, useContext, useEffect, useState } from "react"

import { useArticleSwitcher } from "../hooks/useArticleSwitcher"
import { Articles } from "../../../lib/types"

interface ArticleContextProps {
  currentArticle: Articles
  setArticleSlug: (slug: string) => void
  setArticleRef: (ref: HTMLDivElement | null) => void
}

const ArticleContext = createContext<ArticleContextProps | undefined>(undefined)

export const ArticleProvider = ({ children, initialArticle, tributeSlug }: any) => {
  const { currentArticle, setArticleSlug } = useArticleSwitcher(initialArticle, tributeSlug)

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
    <ArticleContext.Provider value={{ currentArticle, setArticleSlug, setArticleRef }}>
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
