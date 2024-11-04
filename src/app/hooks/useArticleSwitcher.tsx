"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Articles } from "../../../lib/types"
import { useSwipeable, SwipeableHandlers } from "react-swipeable"
import { getPermalink, PageType } from "../../../lib/utils"
import { sendGAEvent } from "@next/third-parties/google"

// Define event types for GA
type GAEventAction = "page_view" | "article_navigation"
type NavigationMethod = "swipe" | "keyboard" | "click"

interface PreloadedArticles {
  [slug: string]: Articles
}

export const useArticleSwitcher = (initialArticle: Articles, articles: Articles[]) => {
  const [currentArticle, setCurrentArticle] = useState<Articles>(initialArticle)
  const [articleSlug, setArticleSlug] = useState<string>(initialArticle.slug)
  const [animationState, setAnimationState] = useState<string>("active")
  const [preloadedArticles, setPreloadedArticles] = useState<PreloadedArticles>({})

  const currentIndex = useMemo(
    () => articles.findIndex((article) => article.slug === articleSlug),
    [articles, articleSlug],
  )
  const nextArticle = articles[currentIndex + 1]
  const prevArticle = articles[currentIndex - 1]

  // Preload adjacent articles
  const preloadAdjacentArticles = useCallback(() => {
    const preloadArticle = async (slug: string) => {
      if (slug && !preloadedArticles[slug]) {
        const response = await fetch(`/api/article/${slug}`)
        if (response.ok) {
          const articleData: Articles = await response.json()
          setPreloadedArticles((prev) => ({ ...prev, [slug]: articleData }))
        }
      }
    }

    if (nextArticle) preloadArticle(nextArticle.slug)
    if (prevArticle) preloadArticle(prevArticle.slug)
  }, [nextArticle, prevArticle, preloadedArticles])

  useEffect(() => {
    preloadAdjacentArticles()
  }, [currentArticle, preloadAdjacentArticles])

  const handleGAEvent = (action: GAEventAction, method: NavigationMethod, article: Articles) => {
    const articlePermalink = getPermalink({
      year: article.issue.year,
      month: article.issue.month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    // Log page view
    sendGAEvent(action, articlePermalink, {
      page_path: articlePermalink,
      page_title: article.title,
    })
  }

  // Set article from preloaded data if available, else fetch
  const fetchAndSetArticle = useCallback(
    async (slug: string, method: NavigationMethod) => {
      // Use preloaded article data if available
      const articleData = preloadedArticles[slug] || currentArticle

      // If articleData is undefined or does not match the requested slug, fetch it
      if (!articleData || articleData.slug !== slug) {
        const response = await fetch(`/api/article/${slug}`)
        if (response.ok) {
          const fetchedArticleData: Articles = await response.json()
          setPreloadedArticles((prev) => ({ ...prev, [slug]: fetchedArticleData }))
          setCurrentArticle(fetchedArticleData)
        }
      } else {
        setCurrentArticle(articleData)
      }

      // Update state and animations
      setAnimationState("exit") // Trigger exit animation
      setTimeout(() => {
        setAnimationState("enter") // Trigger enter animation
      }, 300)

      const articlePermalink = getPermalink({
        year: articleData.issue.year,
        month: articleData.issue.month,
        section: articleData.section.slug,
        slug: articleData.slug,
        type: PageType.Article,
      })
      window.history.pushState({}, "", articlePermalink)
      setArticleSlug(slug)
      handleGAEvent("page_view", method, articleData)
      handleGAEvent("article_navigation", method, articleData)

      setTimeout(() => setAnimationState("active"), 300)
    },
    [preloadedArticles, currentArticle],
  )

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && nextArticle) {
        fetchAndSetArticle(nextArticle.slug, "keyboard")
      } else if (e.key === "ArrowLeft" && prevArticle) {
        fetchAndSetArticle(prevArticle.slug, "keyboard")
      }
    },
    [nextArticle, prevArticle, fetchAndSetArticle],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => nextArticle && fetchAndSetArticle(nextArticle.slug, "swipe"),
    onSwipedRight: () => prevArticle && fetchAndSetArticle(prevArticle.slug, "swipe"),
    preventScrollOnSwipe: true,
    trackMouse: false,
  })

  return {
    currentArticle,
    nextArticle: preloadedArticles[nextArticle?.slug] || nextArticle,
    prevArticle: preloadedArticles[prevArticle?.slug] || prevArticle,
    swipeHandlers,
    animationState,
  }
}
