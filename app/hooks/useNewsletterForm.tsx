import { useCallback } from "react"
import { usePostHog } from "posthog-js/react"
import { sendGAEvent } from "@next/third-parties/google"

export const useNewsletterForm = () => {
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

  // Handle form interaction
  const handleFormInteraction = useCallback(() => {
    trackNewsletterEvent("form_interaction", { timestamp: new Date().toISOString() })
  }, [trackNewsletterEvent])

  // Handle form submission
  const handleFormSubmit = useCallback(() => {
    trackNewsletterEvent("form_submit", { timestamp: new Date().toISOString() })
  }, [trackNewsletterEvent])

  // Handle form success
  const handleFormSuccess = useCallback(
    (data: { email: string; success: boolean; message: string }) => {
      trackNewsletterEvent("form_success", {
        email: data.email,
        success: data.success,
        message: data.message,
      })
    },
    [trackNewsletterEvent],
  )

  // Handle form error
  const handleFormError = useCallback(
    (error: { message: string; email?: string }) => {
      trackNewsletterEvent("form_error", {
        error: error.message || "Unknown error",
        email: error.email,
      })
    },
    [trackNewsletterEvent],
  )

  return {
    handleFormInteraction,
    handleFormSubmit,
    handleFormSuccess,
    handleFormError,
  }
}
