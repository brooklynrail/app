"use client"
import { sendGAEvent } from "@next/third-parties/google"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { SwipeableHandlers, useSwipeable } from "react-swipeable"
import { Articles } from "../../../lib/types"
import { getPermalink, PageType } from "../../../lib/utils"

// Define event types for GA
type GAEventAction = "page_view" | "article_navigation"
type NavigationMethod = "swipe" | "keyboard" | "click"

interface PreloadedArticles {
  [slug: string]: Articles
}

export const useArticleSwitcher = (initialArticle: Articles, articles: Articles[]) => {
  const router = useRouter()
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
      // check if article is not already preloaded
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

  // GA Tracking Event Handler
  const handleGAEvent = (action: GAEventAction, method: NavigationMethod, article: Articles) => {
    const articlePermalink = getPermalink({
      year: article.issue.year,
      month: article.issue.month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    if (action === "page_view") {
      sendGAEvent("config", "G-P4BEY1BZ04", {
        page_path: articlePermalink,
        page_title: article.title,
      })
    } else if (action === "article_navigation") {
      sendGAEvent("event", "article_navigation", {
        event_category: "navigation",
        event_label: article.title,
        method,
        page_path: articlePermalink,
      })
    }
  }

  // Set article from preloaded data if available, else fetch
  const fetchAndSetArticle = useCallback(
    async (slug: string, method: NavigationMethod) => {
      const articleData = preloadedArticles[slug] || currentArticle

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

      setAnimationState("article-exit")
      setTimeout(() => {
        setAnimationState("article-enter")
        setTimeout(() => {
          setAnimationState("article-active")
        }, 150) // Match the new transition duration
      }, 150) // Match the new transition duration

      const articlePermalink = getPermalink({
        year: articleData.issue.year,
        month: articleData.issue.month,
        section: articleData.section.slug,
        slug: articleData.slug,
        type: PageType.Article,
      })

      router.push(articlePermalink)

      setArticleSlug(slug)

      handleGAEvent("page_view", method, articleData)
      handleGAEvent("article_navigation", method, articleData)
    },
    [preloadedArticles, currentArticle],
  )

  useEffect(() => {
    const triggerAdImpression = () => {
      document.dispatchEvent(new Event("newAdImpression"))
    }
    triggerAdImpression()
  }, [currentArticle])

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

  const goToNextArticle = useCallback(() => {
    if (nextArticle) {
      fetchAndSetArticle(nextArticle.slug, "click")
    }
  }, [nextArticle, fetchAndSetArticle])

  const goToPrevArticle = useCallback(() => {
    if (prevArticle) {
      fetchAndSetArticle(prevArticle.slug, "click")
    }
  }, [prevArticle, fetchAndSetArticle])

  return {
    currentArticle,
    nextArticle: preloadedArticles[nextArticle?.slug] || nextArticle,
    prevArticle: preloadedArticles[prevArticle?.slug] || prevArticle,
    swipeHandlers,
    animationState,
    goToNextArticle,
    goToPrevArticle,
  }
}
