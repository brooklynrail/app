import { getNavData } from "../../../../lib/utils/homepage"

export async function GET(request: Request) {
  try {
    const navData = await getNavData()

    if (!navData) {
      return Response.json(
        {
          error: "Navigation data not found",
          message: "Unable to retrieve navigation data",
        },
        { status: 404 },
      )
    }

    return new Response(JSON.stringify(navData), {
      headers: {
        "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "",
      },
    })
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    return Response.json(
      {
        error: "Internal server error",
        message: "Failed to fetch navigation data",
      },
      { status: 500 },
    )
  }
}
