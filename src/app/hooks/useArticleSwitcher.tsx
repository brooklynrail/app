"use client"
import { sendGAEvent } from "@next/third-parties/google"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo } from "react"
import { SwipeableHandlers, useSwipeable } from "react-swipeable"
import { Articles } from "../../../lib/types"
import { getPermalink, PageType } from "../../../lib/utils"

// Define event types for GA
type GAEventAction = "page_view" | "article_navigation"
type NavigationMethod = "swipe" | "keyboard" | "click"

export const useArticleSwitcher = (initialArticle: Articles, collection: Articles[], collectionPermalink: string) => {
  const router = useRouter()

  // Find current article index
  const currentIndex = useMemo(
    () => collection.findIndex((article) => article.slug === initialArticle.slug),
    [collection, initialArticle.slug],
  )

  const nextArticle = collection[currentIndex + 1]
  const prevArticle = collection[currentIndex - 1]

  // Generate permalinks for next and previous articles
  const nextArticlePermalink = nextArticle
    ? getPermalink({
        year: nextArticle.issue.year,
        month: nextArticle.issue.month,
        section: nextArticle.section.slug,
        slug: nextArticle.slug,
        type: PageType.Article,
      })
    : null

  const prevArticlePermalink = prevArticle
    ? getPermalink({
        year: prevArticle.issue.year,
        month: prevArticle.issue.month,
        section: prevArticle.section.slug,
        slug: prevArticle.slug,
        type: PageType.Article,
      })
    : null

  // GA Tracking Event Handler
  const handleGAEvent = useCallback((action: GAEventAction, method: NavigationMethod, article: Articles) => {
    const articlePermalink = getPermalink({
      year: article.issue.year,
      month: article.issue.month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    sendGAEvent("event", "article_navigation", {
      event_category: "navigation",
      event_label: article.title,
      method,
      page_path: articlePermalink,
    })
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && nextArticle) {
        router.push(nextArticlePermalink!)
        handleGAEvent("article_navigation", "keyboard", nextArticle)
      } else if (e.key === "ArrowLeft" && prevArticle) {
        router.push(prevArticlePermalink!)
        handleGAEvent("article_navigation", "keyboard", prevArticle)
      }
    },
    [nextArticle, prevArticle, nextArticlePermalink, prevArticlePermalink, router, handleGAEvent],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Swipeable handlers for touch/swipe navigation
  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (nextArticle) {
        router.push(nextArticlePermalink!)
        handleGAEvent("article_navigation", "swipe", nextArticle)
      }
    },
    onSwipedRight: () => {
      if (prevArticle) {
        router.push(prevArticlePermalink!)
        handleGAEvent("article_navigation", "swipe", prevArticle)
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
  })

  return {
    nextArticlePermalink,
    prevArticlePermalink,
    collectionPermalink,
    swipeHandlers,
  }
}
