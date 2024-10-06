import { readItems } from "@directus/sdk"
import directus from "../../../../lib/directus"
import { getSectionData, getSectionsByIssueId } from "../../../../lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const limit = searchParams.get("limit")

  if (slug && limit) {
    // Get the current list of Sections used in this Issue (draft or published)
    // const data = await getSectionsByIssueId(issueId, "published")
    const data = getSectionData({ slug, limit: Number(limit) })
    return Response.json(data)
  } else {
    const data = await directus.request(
      readItems("sections", {
        fields: ["id", "name", "slug"],
      }),
    )
    return Response.json(data)
  }
}
