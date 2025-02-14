import { getNavData } from "../../../../lib/utils/homepage"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const navData = await getNavData()

    if (!navData) {
      return NextResponse.json(
        { error: "Navigation data not found" },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    return NextResponse.json(
      { data: navData },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch navigation data"

    return NextResponse.json(
      { error: errorMessage },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
