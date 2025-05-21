"use client"

import parse from "html-react-parser"
import { EventsBreakDetails } from "@/lib/railTypes"
import NewsLetterSignUpForm from "@/components/newsletterForm"
import { useNewsletterForm } from "@/app/hooks/useNewsletterForm"
import { useCallback } from "react"
import { usePostHog } from "posthog-js/react"
import { sendGAEvent } from "@next/third-parties/google"

const BreakNotice = (props: { eventsBreakDetails: EventsBreakDetails }) => {
  const { eventsBreakDetails } = props
  const { handleFormInteraction, handleFormSubmit, handleFormSuccess, handleFormError } = useNewsletterForm()
  const posthog = usePostHog()

  // Track newsletter events
  const trackNewsletterEvent = useCallback(
    (
      action: "impression" | "close" | "form_interaction" | "form_submit" | "form_success" | "form_error",
      details?: any,
    ) => {
      // Send PostHog event
      if (posthog) {
        posthog.capture(`${action}_newsletter_popup`, {
          ...details,
        })
      }

      // Send GA event
      sendGAEvent("event", action, {
        event_category: "newsletter_popup",
        ...details,
      })
    },
    [posthog],
  )

  if (
    !eventsBreakDetails.events_break_start ||
    !eventsBreakDetails.events_break_end ||
    !eventsBreakDetails.events_on_break
  ) {
    return null // no break dates, so no break notice
  }

  const startDate = new Date(eventsBreakDetails.events_break_start)
  const endDate = new Date(eventsBreakDetails.events_break_end)

  const startDateString = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const endDateString = endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const now = new Date()
  const heading =
    now >= startDate && now <= endDate
      ? "The New Social Environment is on break"
      : `The New Social Environment is going on break starting ${startDateString}`

  const text = eventsBreakDetails.events_break_text
    ? parse(
        eventsBreakDetails.events_break_text
          .replace("{{end_date}}", `<span class="font-medium">${endDateString}</span>`)
          .replace("{{start_date}}", `<span class="font-medium">${startDateString}</span>`),
      )
    : `We look forward to seeing you after <span class="font-medium">${endDateString}</span> for more live dialogues with artists, filmmakers, writers, and poets. In the meantime, dive into our archive.`

  return (
    <div className="py-12 space-y-3">
      <div className="max-w-screen-tablet-lg mx-auto space-y-3">
        <div className="text-center text-lg">
          <h2 className="text-xl font-medium">{heading}</h2>
        </div>
      </div>
      <div className="max-w-screen-tablet mx-auto space-y-6">
        <div className="text-center">{text}</div>
        <div className="space-y-3">
          <div className="text-center font-medium">Get notified about upcoming events</div>
          <NewsLetterSignUpForm
            onInteraction={handleFormInteraction}
            onSubmit={handleFormSubmit}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        </div>
      </div>
    </div>
  )
}

export default BreakNotice
