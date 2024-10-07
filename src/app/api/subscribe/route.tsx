import { NextRequest, NextResponse } from "next/server"
import mailchimp from "@mailchimp/mailchimp_marketing"

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
})

const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

// Handle POST request
export async function POST(req: NextRequest) {
  const { email_address, status, merge_fields } = await req.json()

  if (!email_address || !status) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    if (!audienceId) {
      return NextResponse.json({ error: "MAILCHIMP_AUDIENCE_ID is not defined" }, { status: 400 })
    }

    // Add subscriber to Mailchimp audience
    await mailchimp.lists.addListMember(audienceId, {
      email_address,
      status,
      merge_fields,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err || "An error occurred" }, { status: 400 })
  }
}
