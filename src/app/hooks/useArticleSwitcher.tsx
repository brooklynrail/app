import { useState, useEffect, useMemo, useCallback } from "react"
import { Articles } from "../../../lib/types"
import { useSwipeable } from "react-swipeable"
import { getPermalink, PageType } from "../../../lib/utils"
import { sendGAEvent } from "@next/third-parties/google"

export const useArticleSwitcher = (initialArticle: Articles, articles: Articles[]) => {
  const [currentArticle, setCurrentArticle] = useState<Articles>(initialArticle)
  const [articleSlug, setArticleSlug] = useState<string>(initialArticle.slug)
  const [animationState, setAnimationState] = useState("article-active") // New state for animations

  // Memoize the current index
  const currentIndex = useMemo(() => {
    return articles.findIndex((article) => article.slug === articleSlug)
  }, [articles, articleSlug])

  const handleGAEvent = (
    action: "page_view" | "article_navigation",
    method: "swipe" | "keyboard" | "click",
    article: Articles,
  ) => {
    const articlePermalink = getPermalink({
      year: article.issue.year,
      month: article.issue.month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    // Log page view
    if (action === "page_view") {
      sendGAEvent("page_view", articlePermalink, {
        page_path: articlePermalink,
        page_title: article.title,
      })
    }

    // Log navigation event
    if (action === "article_navigation") {
      sendGAEvent("event", "article_navigation", {
        event_category: "navigation",
        event_label: article.title,
        method: method,
        page_path: articlePermalink,
      })
    }
  }

  const fetchAndSetArticle = useCallback(async (slug: string, method: "swipe" | "keyboard" | "click") => {
    try {
      setAnimationState("article-exit") // Set exit animation

      const response = await fetch(`/api/article/${slug}`)
      if (!response.ok) throw new Error("Failed to fetch article")

      const newArticle: Articles = await response.json()
      setTimeout(() => {
        setCurrentArticle(newArticle) // Update article after exit animation
        setAnimationState("article-enter") // Set enter animation
      }, 300) // Duration of the exit animation

      // Update URL
      const articlePermalink = getPermalink({
        year: newArticle.issue.year,
        month: newArticle.issue.month,
        section: newArticle.section.slug,
        slug: newArticle.slug,
        type: PageType.Article,
      })
      window.history.pushState({}, "", articlePermalink)
      setArticleSlug(slug)

      // Trigger GA events
      handleGAEvent("page_view", method, newArticle)
      handleGAEvent("article_navigation", method, newArticle)

      // Reset to active animation
      setTimeout(() => setAnimationState("article-active"), 300) // Duration of the enter animation
    } catch (error) {
      console.error("Failed to fetch new article data:", error)
    }
  }, [])

  useEffect(() => {
    if (articleSlug !== currentArticle.slug) {
      fetchAndSetArticle(articleSlug, "click")
    }
  }, [articleSlug, fetchAndSetArticle, currentArticle.slug])

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentIndex < articles.length - 1) {
        fetchAndSetArticle(articles[currentIndex + 1].slug, "keyboard")
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        fetchAndSetArticle(articles[currentIndex - 1].slug, "keyboard")
      }
    },
    [articles, currentIndex, fetchAndSetArticle],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < articles.length - 1) {
        fetchAndSetArticle(articles[currentIndex + 1].slug, "swipe")
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        fetchAndSetArticle(articles[currentIndex - 1].slug, "swipe")
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
  })

  return {
    currentArticle,
    setArticleSlug,
    swipeHandlers,
    animationState, // Return animation state
  }
}
