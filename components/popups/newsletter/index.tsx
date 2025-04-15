import { useCallback, useState } from "react"
import { usePostHog } from "posthog-js/react"
import { sendGAEvent } from "@next/third-parties/google"
import NewsLetterSignUpForm from "@/components/newsletterForm"

interface NewsletterPopupProps {
  isOpen: boolean
  onClose: () => void
  onFormInteraction?: () => void
  onFormSubmit?: () => void
  onFormSuccess?: (data: any) => void
  onFormError?: (error: any) => void
}

export default function NewsletterPopup({
  isOpen,
  onClose,
  onFormInteraction,
  onFormSubmit,
  onFormSuccess,
  onFormError,
}: NewsletterPopupProps) {
  const posthog = usePostHog()
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(isOpen)

  // Track newsletter popup events
  const trackNewsletterEvent = useCallback(
    (action: "close" | "form_interaction" | "form_submit" | "form_success" | "form_error", details?: any) => {
      // Send PostHog event
      if (posthog) {
        posthog.capture(`${action}_newsletter_popup`, {
          ...details,
        })
      }

      // Send GA event
      sendGAEvent("event", action, {
        event_category: "newsletter",
        ...details,
      })
    },
    [posthog],
  )

  // Handle newsletter popup close
  const handleNewsletterClose = useCallback(() => {
    trackNewsletterEvent("close")
    setIsNewsletterOpen(false)
    onClose()
  }, [trackNewsletterEvent, onClose])

  if (!isNewsletterOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <button
          onClick={handleNewsletterClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Stay updated with our latest news and updates.</p>

        <NewsLetterSignUpForm
          onInteraction={onFormInteraction}
          onSubmit={onFormSubmit}
          onSuccess={onFormSuccess}
          onError={onFormError}
        />
      </div>
    </div>
  )
}
