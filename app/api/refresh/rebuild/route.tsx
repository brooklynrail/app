import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Verify the secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Trigger Vercel deployment using a deploy hook
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL

    if (!deployHookUrl) {
      return NextResponse.json({ error: "Deploy hook URL not configured" }, { status: 500 })
    }

    const response = await fetch(deployHookUrl, {
      method: "POST",
    })

    if (!response.ok) {
      console.error("Failed to trigger deployment:", response.statusText)
      return NextResponse.json({ error: "Failed to trigger deployment" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json(
      {
        success: true,
        message: "Deployment triggered successfully",
        job: data,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Rebuild error:", error)
    return NextResponse.json({ error: "Error triggering rebuild" }, { status: 500 })
  }
}

