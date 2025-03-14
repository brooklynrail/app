import { Articles, Contributors } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getContributorRevalidationPaths, RevalidateType } from "@/lib/utils/revalidate"
import { revalidatePath, revalidateTag } from "next/cache"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")
    const id = searchParams.get("id")
    const type = searchParams.get("type")

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return new Response(`Invalid credentials`, { status: 500 })
    }

    if (!type) {
      return new Response("type is required", { status: 400 })
    }

    switch (type) {
      case RevalidateType.Homepage: {
        revalidatePath(`/`, "page")
        revalidateTag("homepage")
        return new Response(`Revalidated homepage`, { status: 200 })
      }

      case RevalidateType.Events: {
        revalidateTag("events")
        return new Response(`Revalidated Events`, { status: 200 })
      }

      case RevalidateType.GlobalSettings: {
        revalidateTag("homepage")
        return new Response(`Revalidated Global Settings`, { status: 200 })
      }

      case RevalidateType.Ads: {
        revalidateTag("ads")
        const adTypes = ["banner", "tile", "in_article_standard"]
        adTypes.forEach((type) => {
          revalidatePath(`${process.env.NEXT_PUBLIC_API_URL}/ads/?type=${type}`)
        })
        return new Response(`Revalidated Ads APIs`, { status: 200 })
      }

      case RevalidateType.Articles: {
        if (!id) {
          return new Response("id is required", { status: 400 })
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/id/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch article")
        }
        const articleData: Articles = await response.json()

        const permalink = getPermalink({
          year: articleData.issue.year,
          month: articleData.issue.month,
          section: articleData.section.slug,
          slug: articleData.slug,
          type: PageType.Article,
        })

        revalidatePath(new URL(permalink).pathname, "layout")
        revalidateTag("articles")

        return new Response(`Revalidated: ${permalink}`, { status: 200 })
      }

      case RevalidateType.Contributors: {
        if (!id) {
          return new Response("id is required", { status: 400 })
        }

        const contributorResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contributor/id/${id}`, {
          next: { revalidate: 3600, tags: ["contributors"] },
        })
        if (!contributorResponse.ok) {
          throw new Error("Failed to fetch contributor")
        }

        const contributorData: Contributors = await contributorResponse.json()
        const { mainPath, additionalPaths } = getContributorRevalidationPaths(contributorData)

        revalidatePath(mainPath, "page")
        additionalPaths.forEach((path) => {
          revalidatePath(path, "page")
        })
        revalidateTag("contributors")

        return new Response(`Revalidated: ${mainPath}`, { status: 200 })
      }

      // Similar pattern for Events and Pages...

      default:
        return new Response("Content type not supported", { status: 400 })
    }
  } catch (err) {
    console.error("Revalidation error:", err)
    return new Response("Error revalidating", { status: 500 })
  }
}
