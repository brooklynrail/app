import { useState, useEffect, useMemo, useCallback } from "react"
import { Articles } from "../../../lib/types"
import { useSwipeable } from "react-swipeable"
import { getPermalink, PageType } from "../../../lib/utils"

export const useArticleSwitcher = (initialArticle: Articles, articles: Articles[]) => {
  const [currentArticle, setCurrentArticle] = useState<Articles>(initialArticle)
  const [articleSlug, setArticleSlug] = useState<string>(initialArticle.slug)

  // Memoize the current index to avoid recalculating on each key press
  const currentIndex = useMemo(() => {
    return articles.findIndex((article) => article.slug === currentArticle.slug)
  }, [articles, currentArticle.slug])

  // Function to fetch and set a new article
  const fetchAndSetArticle = useCallback(
    async (slug: string) => {
      if (slug === currentArticle.slug) return // Avoid unnecessary fetch if slug is the same
      try {
        const response = await fetch(`/api/article/${slug}`)
        if (!response.ok) throw new Error("Failed to fetch article")

        const newArticle: Articles = await response.json()
        setCurrentArticle(newArticle)

        // Generate permalink
        let articlePermalink = getPermalink({
          year: newArticle.issue.year,
          month: newArticle.issue.month,
          section: newArticle.section.slug,
          slug: newArticle.slug,
          type: PageType.Article,
        })
        if (newArticle.tribute) {
          articlePermalink = getPermalink({
            tributeSlug: newArticle.tribute.slug,
            slug: newArticle.slug,
            type: PageType.TributeArticle,
          })
        }

        // Update the URL without reloading the page
        window.history.pushState({}, "", articlePermalink)
      } catch (error) {
        console.error("Failed to fetch new article data:", error)
      }
    },
    [currentArticle.slug],
  )

  // Effect to fetch the article when articleSlug changes
  useEffect(() => {
    fetchAndSetArticle(articleSlug)
  }, [articleSlug, fetchAndSetArticle])

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentIndex < articles.length - 1) {
        setArticleSlug(articles[currentIndex + 1].slug)
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setArticleSlug(articles[currentIndex - 1].slug)
      }
    },
    [articles, currentIndex],
  )

  // Attach the keyboard event listener once
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < articles.length - 1) {
        setArticleSlug(articles[currentIndex + 1].slug)
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setArticleSlug(articles[currentIndex - 1].slug)
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
  })

  return {
    currentArticle,
    setArticleSlug,
    swipeHandlers,
  }
}
