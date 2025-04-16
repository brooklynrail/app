import { usePopup, PopupType } from "@/components/popupProvider"
import PopupFrameCenter from "../center"
import NewsLetterSignUpForm from "@/components/newsletterForm"
import { useCallback, useState, useEffect, useRef } from "react"
import { usePostHog } from "posthog-js/react"
import { sendGAEvent } from "@next/third-parties/google"

const PopupNewsletter = () => {
  // Get the context values but don't rely on them for visibility control
  const { setShowPopup, setPopupType, showPopup } = usePopup()
  const posthog = usePostHog()

  // Use local state for everything
  const [isVisible, setIsVisible] = useState(showPopup)
  const [formInteracted, setFormInteracted] = useState(false)
  const [impressionTracked, setImpressionTracked] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  // Update isVisible when showPopup changes
  useEffect(() => {
    setIsVisible(showPopup)
  }, [showPopup])

  // Set up the popup type and start the timer when the component mounts
  useEffect(() => {
    console.log("Newsletter popup mounted")

    // Set the popup type to newsletter
    setPopupType(PopupType.Newsletter)

    // Start with popup hidden
    setIsVisible(false)

    // Set a timer to show the popup after 5 seconds
    const timer = setTimeout(() => {
      console.log("Timer completed, showing newsletter popup")
      setIsVisible(true)
      setShowPopup(true)
    }, 2500)

    // Clean up the timer when the component unmounts
    return () => {
      console.log("Cleaning up newsletter popup timer")
      clearTimeout(timer)
    }
  }, [setPopupType, setShowPopup])

  // Track impression when popup becomes visible
  useEffect(() => {
    if (isVisible && !impressionTracked) {
      console.log("Tracking newsletter popup impression")
      trackNewsletterEvent("impression")
      setImpressionTracked(true)
    }
  }, [isVisible, impressionTracked])

  // Function to track newsletter events
  const trackNewsletterEvent = useCallback(
    (
      action: "impression" | "close" | "form_interaction" | "form_submit" | "form_success" | "form_error",
      details?: any,
    ) => {
      console.log("Newsletter event:", action, details)

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
    if (!formInteracted) {
      setFormInteracted(true)
      trackNewsletterEvent("form_interaction")
    }
  }, [formInteracted, trackNewsletterEvent])

  // Handle form submission
  const handleFormSubmit = useCallback(() => {
    trackNewsletterEvent("form_submit")
  }, [trackNewsletterEvent])

  // Handle form success
  const handleFormSuccess = useCallback(
    (data: any) => {
      trackNewsletterEvent("form_success", { email: data.email })
    },
    [trackNewsletterEvent],
  )

  // Handle form error
  const handleFormError = useCallback(
    (error: any) => {
      trackNewsletterEvent("form_error", { error: error.message || "Unknown error" })
    },
    [trackNewsletterEvent],
  )

  // If the popup is not visible, don't render anything
  if (!isVisible) {
    return null
  }

  // Render the popup
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
