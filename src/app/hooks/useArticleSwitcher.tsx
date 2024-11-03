"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Articles } from "../../../lib/types"
import { useSwipeable } from "react-swipeable"
import { getPermalink, PageType } from "../../../lib/utils"
import { sendGAEvent } from "@next/third-parties/google"

export const useArticleSwitcher = (initialArticle: Articles, articles: Articles[]) => {
  const [currentArticle, setCurrentArticle] = useState<Articles>(initialArticle)
  const [articleSlug, setArticleSlug] = useState<string>(initialArticle.slug)

  // Memoize the current index to avoid recalculating on each key press
  const currentIndex = useMemo(() => {
    return articles.findIndex((article) => article.slug === articleSlug)
  }, [articles, articleSlug])

  // GA Event tracking function using sendGAEvent
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

    // Log page view in GA
    if (action === "page_view") {
      sendGAEvent("page_view", articlePermalink, {
        page_path: articlePermalink,
        page_title: article.title,
      })
    }

    // Log custom event for navigation method
    if (action === "article_navigation") {
      sendGAEvent("event", "article_navigation", {
        event_category: "navigation",
        event_label: article.title,
        method: method,
        page_path: articlePermalink,
      })
    }
  }

  // Function to fetch and set a new article
  const fetchAndSetArticle = useCallback(async (slug: string, method: "swipe" | "keyboard" | "click") => {
    try {
      const response = await fetch(`/api/article/${slug}`)
      if (!response.ok) throw new Error("Failed to fetch article")

      const newArticle: Articles = await response.json()
      setCurrentArticle(newArticle) // Update the displayed article

      // Update the URL without reloading the page
      const articlePermalink = getPermalink({
        year: newArticle.issue.year,
        month: newArticle.issue.month,
        section: newArticle.section.slug,
        slug: newArticle.slug,
        type: PageType.Article,
      })
      window.history.pushState({}, "", articlePermalink)
      setArticleSlug(slug) // Ensure state sync with the new article slug

      // Trigger Google Analytics events
      handleGAEvent("page_view", method, newArticle) // Log page view
      handleGAEvent("article_navigation", method, newArticle) // Log navigation event
    } catch (error) {
      console.error("Failed to fetch new article data:", error)
    }
  }, [])

  // Trigger article fetching whenever `articleSlug` changes
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

  // Attach the keyboard event listener once
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Swipe handlers
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
  }
}
