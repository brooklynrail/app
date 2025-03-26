"use client"
import { Articles } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Create a hook to manage article switching
export const useArticleState = (initialArticle: Articles, articles: Articles[]) => {
  const [currentArticle, setCurrentArticle] = useState<Articles>(initialArticle)
  const [previousPathname, setPreviousPathname] = useState<string>(usePathname()) // Track the initial pathname
  const [isNavigating, setIsNavigating] = useState(false) // Track if a navigation is currently happening
  const router = useRouter()
  const pathname = usePathname()

  // Function to fetch article data by slug and update the current article state
  const handleArticleChange = async (slug: string) => {
    try {
      if (slug === currentArticle.slug) {
        return
      }

      setIsNavigating(true) // Set navigation flag
      const response = await fetch(`/api/article/${slug}`, {
        next: { revalidate: 3600, tags: ["articles"] },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch article")
      }

      const newArticle: Articles = await response.json()
      setCurrentArticle(newArticle)

      // Update the URL using Next.js router to avoid a full page refresh
      const articlePermalink = getArticlePermalink(newArticle)
      router.push(articlePermalink, { scroll: false })
    } catch (error) {
      console.error("Failed to fetch new article data:", error)
    } finally {
      setIsNavigating(false) // Reset navigation flag
    }
  }

  // Helper function to generate the correct permalink based on article type
  const getArticlePermalink = (article: Articles): string => {
    if (article.tribute) {
      return getPermalink({
        tributeSlug: article.tribute.slug,
        slug: article.slug,
        type: PageType.TributeArticle,
      })
    }
    return getPermalink({
      year: article.issue.year,
      month: article.issue.month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })
  }

  // Function to switch articles by updating the URL based on the new slug
  const switchArticle = async (slug: string) => {
    if (isNavigating) {
      return
    }
    void handleArticleChange(slug)
  }

  // Effect to handle `pathname` changes and update article state accordingly
  useEffect(() => {
    if (pathname !== previousPathname) {
      setPreviousPathname(pathname) // Update the tracked pathname state

      // Extract the slug from the new pathname
      const articleSlug = pathname.split("/").pop()
      const foundArticle = articles.find((article) => article.slug === articleSlug)

      if (foundArticle && foundArticle.slug !== currentArticle.slug) {
        setCurrentArticle(foundArticle)
      }
    }
  }, [pathname, previousPathname, articles, currentArticle.slug])

  return {
    currentArticle,
    switchArticle,
  }
}
