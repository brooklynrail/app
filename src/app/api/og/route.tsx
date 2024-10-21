import { ImageResponse } from "next/og"
import { getEvent } from "../../../../lib/utils/events/utils"
import { getArticle } from "../../../../lib/utils"
// App router includes @vercel/og.
// No need to install it.

enum PageType {
  Contributor = "contributor",
  Person = "person",
  Article = "article",
  Event = "event",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const type = searchParams.get("type")

  if (!slug || !type) {
    return null
  }

  const fetchData = async (type: string, slug: string) => {
    switch (type) {
      case PageType.Article:
        return await getArticle(slug)
      case PageType.Event:
        return await getEvent(slug)
      default:
        return null
    }
  }

  const data = await fetchData(type, slug)

  console.log("data:", data)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        👋 Hello Drithi!
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
