import { Articles } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { RevalidateType } from "@/lib/utils/revalidate"
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

      case RevalidateType.Sections: {
        revalidateTag("sections")
        return new Response(`Revalidated Sections`, { status: 200 })
      }

      case RevalidateType.Contributors: {
        revalidateTag("contributors")
        return new Response(`Revalidated: contributors`, { status: 200 })
      }

      case RevalidateType.Tributes: {
        revalidateTag("tributes")
        return new Response(`Revalidated: tributes`, { status: 200 })
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

        return new Response(`Revalidated: ${permalink}`, { status: 200 })
      }

      default:
        return new Response("Content type not supported", { status: 400 })
    }
  } catch (err) {
    console.error("Revalidation error:", err)
    return new Response("Error revalidating", { status: 500 })
  }
}
