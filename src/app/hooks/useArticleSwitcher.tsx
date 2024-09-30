import { useState, useEffect } from "react"
import { Articles } from "../../../lib/types"
import { getPermalink, PageType } from "../../../lib/utils"

export const useArticleSwitcher = (initialArticle: Articles, tributeSlug?: string) => {
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
  }, [articleSlug, currentArticle.slug, tributeSlug])

  return {
    currentArticle,
    setArticleSlug,
  }
}
