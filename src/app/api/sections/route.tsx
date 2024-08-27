import { readItems } from "@directus/sdk"
import directus from "../../../../lib/directus"
import { getSectionsByIssueId } from "../../../../lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const issueId = searchParams.get("issueId")

  if (issueId) {
    // Get the current list of Sections used in this Issue (draft or published)
    const data = await getSectionsByIssueId(issueId, "published")
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
