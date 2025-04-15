import { usePopup } from "@/components/popupProvider"
import PopupFrameCenter from "../center"
import NewsLetterSignUpForm from "@/components/newsletterForm"
import { useCallback, useState, useEffect, useRef } from "react"
import { usePostHog } from "posthog-js/react"
import { sendGAEvent } from "@next/third-parties/google"

const PopupNewsletter = () => {
  const { showPopup, popupType, setShowPopup } = usePopup()
  const posthog = usePostHog()
  const [formInteracted, setFormInteracted] = useState(false)
  const [impressionTracked, setImpressionTracked] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  // Track newsletter popup events
  const handleNewsletterEvent = useCallback(
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

  // Track impression when popup is visible
  useEffect(() => {
    if (showPopup && popupType === "newsletter" && !impressionTracked) {
      handleNewsletterEvent("impression")
      setImpressionTracked(true)
    }
  }, [showPopup, popupType, impressionTracked, handleNewsletterEvent])

  // Handle newsletter popup close
  const handleNewsletterClose = useCallback(() => {
    handleNewsletterEvent("close")
    setShowPopup(false)
  }, [handleNewsletterEvent, setShowPopup])

  // Handle form interaction
  const handleFormInteraction = useCallback(() => {
    if (!formInteracted) {
      setFormInteracted(true)
      handleNewsletterEvent("form_interaction")
    }
  }, [formInteracted, handleNewsletterEvent])

  // Handle form submission
  const handleFormSubmit = useCallback(() => {
    handleNewsletterEvent("form_submit")
  }, [handleNewsletterEvent])

  // Handle form success
  const handleFormSuccess = useCallback(
    (data: any) => {
      handleNewsletterEvent("form_success", { email: data.email })
    },
    [handleNewsletterEvent],
  )

  // Handle form error
  const handleFormError = useCallback(
    (error: any) => {
      handleNewsletterEvent("form_error", { error: error.message || "Unknown error" })
    },
    [handleNewsletterEvent],
  )

  // Early return after all hooks are defined
  if (!showPopup || popupType !== "newsletter") {
    return null
  }

  return (
    <PopupFrameCenter>
      <div ref={popupRef} className="space-y-3 tablet:space-y-6 py-20">
        <h2 className="text-4xl tablet-lg:text-6xl text-center font-light text-zinc-800 dark:text-slate-100">
          Subscribe to our newsletter
        </h2>
        <p className="text-center text-sm tablet-lg:text-lg text-zinc-800 dark:text-slate-100">
          Receive the latest news and updates from The Brooklyn Rail
        </p>
        <NewsLetterSignUpForm
          onInteraction={handleFormInteraction}
          onSubmit={handleFormSubmit}
          onSuccess={handleFormSuccess}
          onError={handleFormError}
        />
      </div>
    </PopupFrameCenter>
  )
}

export default PopupNewsletter
