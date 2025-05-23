"use client"
import { usePopup } from "@/components/popupProvider"
import { Articles } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { sendGAEvent } from "@next/third-parties/google"
import { useRouter } from "next/navigation"
import { usePostHog } from "posthog-js/react"
import { useCallback, useEffect, useMemo, useState } from "react"

// Define event types for navigation
type NavigationMethod = "keyboard" | "click"

interface PreloadedArticles {
  [slug: string]: Articles
}

export const useArticleSwitcher = (initialArticle: Articles, articles: Articles[], collectionPermalink: string) => {
  const router = useRouter()
  const [currentArticle, setCurrentArticle] = useState<Articles>(initialArticle)
  const [articleSlug, setArticleSlug] = useState<string>(initialArticle.slug)
  const [_animationState, _setAnimationState] = useState<string>("active")
  const [preloadedArticles, setPreloadedArticles] = useState<PreloadedArticles>({})
  const posthog = usePostHog()
  const { showArticleSlideShow, showPopup } = usePopup()

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
        try {
          const response = await fetch(`/api/article/${slug}`, {
            next: { tags: ["articles"] },
          })
          if (response.ok) {
            const articleData: Articles = await response.json()
            setPreloadedArticles((prev) => ({ ...prev, [slug]: articleData }))
          }
        } catch (error) {
          console.error("Error preloading article:", error)
        }
      }
    }

    if (nextArticle) {
      void preloadArticle(nextArticle.slug)
    }
    if (prevArticle) {
      void preloadArticle(prevArticle.slug)
    }
  }, [nextArticle, prevArticle, preloadedArticles])

  useEffect(() => {
    void preloadAdjacentArticles()
  }, [currentArticle, preloadAdjacentArticles])

  // PostHog and GA Tracking Event Handler
  const handleArticleEvent = (article: Articles, _method: NavigationMethod) => {
    const articlePermalink = getPermalink({
      year: article.issue.year,
      month: article.issue.month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    if (posthog) {
      void posthog.capture(`use_pagination`, {
        permalink: articlePermalink,
        slug: article.slug,
        section: article.section.slug,
        issue: article.issue.slug,
        type: PageType.Article,
      })
    }

    void sendGAEvent("config", "G-P4BEY1BZ04", {
      page_path: articlePermalink,
      page_title: article.title,
    })
  }

  const navigateTo = useCallback(
    async (slug: string | null, method: NavigationMethod) => {
      if (slug) {
        try {
          const articleData = preloadedArticles[slug] || currentArticle

          if (!articleData || articleData.slug !== slug) {
            const response = await fetch(`/api/article/${slug}`, {
              next: { tags: ["articles"] },
            })
            if (response.ok) {
              const fetchedArticleData: Articles = await response.json()
              setPreloadedArticles((prev) => ({ ...prev, [slug]: fetchedArticleData }))
              setCurrentArticle(fetchedArticleData)
            }
          } else {
            setCurrentArticle(articleData)
          }

          const articlePermalink = getPermalink({
            year: articleData.issue.year,
            month: articleData.issue.month,
            section: articleData.section.slug,
            slug: articleData.slug,
            type: PageType.Article,
          })

          void router.push(articlePermalink)
          setArticleSlug(slug)
          void handleArticleEvent(articleData, method)
        } catch (error) {
          console.error("Error navigating to article:", error)
        }
      } else {
        void router.push(collectionPermalink)
      }
    },
    [preloadedArticles, currentArticle, collectionPermalink],
  )

  useEffect(() => {
    const triggerAdImpression = () => {
      document.dispatchEvent(new Event("newAdImpression"))
    }
    triggerAdImpression()
  }, [currentArticle])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (showArticleSlideShow || showPopup) {
        return
      }

      if (e.key === "ArrowRight") {
        void navigateTo(nextArticle?.slug || null, "keyboard")
      } else if (e.key === "ArrowLeft") {
        void navigateTo(prevArticle?.slug || null, "keyboard")
      }
    },
    [nextArticle, prevArticle, navigateTo, showArticleSlideShow, showPopup],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const goToNextArticle = useCallback(() => {
    void navigateTo(nextArticle?.slug || null, "click")
  }, [nextArticle, navigateTo])

  const goToPrevArticle = useCallback(() => {
    void navigateTo(prevArticle?.slug || null, "click")
  }, [prevArticle, navigateTo])

  return {
    currentArticle,
    nextArticle: preloadedArticles[nextArticle?.slug] || nextArticle,
    prevArticle: preloadedArticles[prevArticle?.slug] || prevArticle,
    animationState: _animationState,
    goToNextArticle,
    goToPrevArticle,
  }
}
