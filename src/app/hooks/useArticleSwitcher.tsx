import { useState, useEffect } from "react"
import { Articles } from "../../../lib/types"
import { useSwipeable } from "react-swipeable"
import { getPermalink, PageType } from "../../../lib/utils"

export const useArticleSwitcher = (initialArticle: Articles, articles: Articles[]) => {
  const [currentArticle, setCurrentArticle] = useState<Articles>(initialArticle)
  const [articleSlug, setArticleSlug] = useState<string>(initialArticle.slug)

  useEffect(() => {
    const handleArticleChange = async (slug: string) => {
      try {
        if (slug !== currentArticle.slug) {
          const response = await fetch(`/api/article/${slug}`)
          if (!response.ok) throw new Error("Failed to fetch article")

          const newArticle: Articles = await response.json()
          setCurrentArticle(newArticle)

          // Update the URL
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

          window.history.pushState({}, "", articlePermalink)
        }
      } catch (error) {
        console.error("Failed to fetch new article data:", error)
      }
    }

    handleArticleChange(articleSlug)
  }, [articleSlug, currentArticle.slug])

  // Effect to handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = articles.findIndex((article: Articles) => article.slug === currentArticle.slug)

      if (e.key === "ArrowRight" && currentIndex < articles.length - 1) {
        // Go to the next article
        setArticleSlug(articles[currentIndex + 1].slug)
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        // Go to the previous article
        setArticleSlug(articles[currentIndex - 1].slug)
      }
    }

    // Attach the event listener for keydown events
    window.addEventListener("keydown", handleKeyDown)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentArticle, setArticleSlug, articles])

  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = articles.findIndex((article: Articles) => article.slug === currentArticle.slug)
      if (currentIndex < articles.length - 1) {
        setArticleSlug(articles[currentIndex + 1].slug)
      }
    },
    onSwipedRight: () => {
      const currentIndex = articles.findIndex((article: Articles) => article.slug === currentArticle.slug)
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
