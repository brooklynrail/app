import { ImageResponse } from "next/og"
import parse from "html-react-parser"
import { getArticleOGData } from "../../../../lib/utils/articles"

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
        return await getArticleOGData(slug, "published")
      default:
        console.log("Invalid type")
        return null
    }
  }

  const data = await fetchData(type, slug)

  if (!data) {
    return null
  }

  const ogExcerpt = data.deck ? parse(data.deck) : data.excerpt

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div style={{ marginTop: 10 }}>{data.issue}</div>
        <div style={{ marginTop: 10 }}>{data.section}</div>
        <div style={{ marginTop: 10 }}>{data.title}</div>
        <div style={{ marginTop: 10 }}>{ogExcerpt}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
