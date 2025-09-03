import { NextRequest, NextResponse } from "next/server"
import mailchimp from "@mailchimp/mailchimp_marketing"

// Debug logging
// console.log("Environment Variables Check:", {
//   MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY ? "Present" : "Missing",
//   MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER,
//   MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
// })

// Initialize Mailchimp
const apiKey = process.env.MAILCHIMP_API_KEY
const serverPrefix = process.env.MAILCHIMP_API_SERVER
const listId = process.env.MAILCHIMP_AUDIENCE_ID

// Log configuration (without sensitive data)
// console.log("Mailchimp Configuration:", {
//   hasApiKey: !!apiKey,
//   serverPrefix,
//   hasListId: !!listId,
//   apiKeyLength: apiKey?.length,
//   listIdLength: listId?.length,
// })

if (!apiKey || !serverPrefix || !listId) {
  console.error("Missing required Mailchimp environment variables")
}

// Simple Mailchimp configuration
mailchimp.setConfig({
  apiKey: apiKey || "",
  server: serverPrefix || "",
})

export async function POST(request: NextRequest) {
  // Check if Mailchimp is properly configured
  if (!apiKey || !serverPrefix || !listId) {
    console.error("Mailchimp configuration is missing:", {
      hasApiKey: !!apiKey,
      serverPrefix,
      hasListId: !!listId,
    })
    return NextResponse.json({ error: "Mailchimp configuration is missing" }, { status: 500 })
  }

  try {
    // Parse the request body
    const body = await request.json()
    console.log("Received subscription request:", body)

    const { email, name } = body

    // Validate the input
    if (!email) {
      console.log("Missing email in request")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      console.log("Invalid email format:", email)
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Add subscriber to Mailchimp
    try {
      console.log("Adding subscriber to Mailchimp:", {
        email,
        name,
        listId,
        serverPrefix,
      })

      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name || "",
        },
      })

      console.log(`Added subscriber to Mailchimp: ${email}`, response)

      // Return a success response
      return NextResponse.json(
        { success: true, message: "Success! You will receive an email from us shortly." },
        {
          status: 200,
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Content-Type": "application/json",
          },
        },
      )
    } catch (mailchimpError: any) {
      // Handle Mailchimp-specific errors
      console.error("Mailchimp API error:", mailchimpError)
      console.error("Mailchimp API error details:", {
        status: mailchimpError.status,
        title: mailchimpError.response?.text ? JSON.parse(mailchimpError.response.text).title : null,
        detail: mailchimpError.response?.text ? JSON.parse(mailchimpError.response.text).detail : null,
        type: mailchimpError.response?.text ? JSON.parse(mailchimpError.response.text).type : null,
      })

      // Check if the error is because the subscriber already exists
      if (mailchimpError.status === 400 && mailchimpError.response?.text) {
        const errorData = JSON.parse(mailchimpError.response.text)
        if (errorData.title === "Member Exists") {
          return NextResponse.json({ success: true, message: "You're already subscribed!" }, { status: 200 })
        }
      }

      // Handle 404 error specifically
      if (mailchimpError.status === 404) {
        return NextResponse.json(
          { error: "Mailchimp list/audience not found. Please check your audience ID and server prefix." },
          { status: 500 },
        )
      }

      return NextResponse.json({ error: "Failed to add subscriber to mailing list" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing subscription:", error)
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 })
  }
}
