import { usePopup, PopupType } from "@/components/popupProvider"
import PopupFrameCenter from "../center"
import NewsLetterSignUpForm from "@/components/newsletterForm"
import { useCallback, useState, useEffect, useRef } from "react"
import { usePostHog } from "posthog-js/react"
import { sendGAEvent } from "@next/third-parties/google"

const NEWSLETTER_COOKIE_NAME = "newsletter_subscribed"
const NEWSLETTER_COOKIE_EXPIRY_DAYS = 365 // Cookie expires in 1 year
const NEWSLETTER_DISMISSED_COOKIE_NAME = "newsletter_dismissed"
const NEWSLETTER_DISMISSED_COOKIE_EXPIRY_DAYS = 1 // Cookie expires in 1 day

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === "undefined") {
    return
  }
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;secure;SameSite=Strict`
}

// Helper function to get a cookie
const getCookie = (name: string) => {
  if (typeof document === "undefined") {
    return null
  }
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift()
  }
  return null
}

const PopupNewsletter = () => {
  // Get the context values but don't rely on them for visibility control
  const { setShowPopup, setPopupType, showPopup } = usePopup()
  const posthog = usePostHog()

  // Use local state for everything
  const [isVisible, setIsVisible] = useState(false)
  const [formInteracted, setFormInteracted] = useState(false)
  const [impressionTracked, setImpressionTracked] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  // Check for newsletter cookie on mount
  useEffect(() => {
    const hasSubscribed = getCookie(NEWSLETTER_COOKIE_NAME)
    const wasDismissed = getCookie(NEWSLETTER_DISMISSED_COOKIE_NAME)
    if (hasSubscribed || wasDismissed) {
      setIsVisible(false)
      setShowPopup(false)
      return
    }

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

  // Update isVisible when showPopup changes
  useEffect(() => {
    setIsVisible(showPopup)
  }, [showPopup])

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
      trackNewsletterEvent("form_interaction", { timestamp: new Date().toISOString() })
    }
  }, [formInteracted, trackNewsletterEvent])

  // Handle form submission
  const handleFormSubmit = useCallback(() => {
    trackNewsletterEvent("form_submit", { timestamp: new Date().toISOString() })
  }, [trackNewsletterEvent])

  // Handle form success
  const handleFormSuccess = useCallback(
    (data: { email: string; success: boolean; message: string }) => {
      // Set cookie to prevent showing popup again
      setCookie(NEWSLETTER_COOKIE_NAME, "true", NEWSLETTER_COOKIE_EXPIRY_DAYS)

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

  // Handle popup close
  const handleClose = useCallback(() => {
    setCookie(NEWSLETTER_DISMISSED_COOKIE_NAME, "true", NEWSLETTER_DISMISSED_COOKIE_EXPIRY_DAYS)
    setIsVisible(false)
    setShowPopup(false)
    trackNewsletterEvent("close", { timestamp: new Date().toISOString() })
  }, [setShowPopup, trackNewsletterEvent])

  // If the popup is not visible, don't render anything
  if (!isVisible) {
    return null
  }

  // Render the popup
  return (
    <PopupFrameCenter onClose={handleClose}>
      <div ref={popupRef} className="h-full w-full flex flex-col justify-center items-center">
        <div className="space-y-3 tablet:space-y-6">
          <h2 className="text-3xl tablet-lg:text-5xl desktop-lg:text-6xl text-center font-light text-zinc-800 dark:text-slate-100">
            Get the Brooklyn Rail in your inbox
          </h2>
          <p className="text-center text-sm tablet-lg:text-lg text-zinc-800 dark:text-slate-100 tablet-lg:w-2/3 mx-auto">
            Subscribe to our newsletter to get the latest articles from the Rail, weekly guest schedules for the New
            Social Environment, and invitations to our exhibitions and events.
          </p>
          <NewsLetterSignUpForm
            onInteraction={handleFormInteraction}
            onSubmit={handleFormSubmit}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        </div>
      </div>
    </PopupFrameCenter>
  )
}

export default PopupNewsletter
