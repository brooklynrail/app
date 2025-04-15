import { useRef, useState } from "react"

interface NewsletterFormProps {
  onInteraction?: () => void
  onSubmit?: () => void
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export default function NewsLetterSignUpForm({ onInteraction, onSubmit, onSuccess, onError }: NewsletterFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const validateEmail = (email: string): boolean => {
    // Remove whitespace
    const trimmedEmail = email.trim()

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(trimmedEmail)
  }

  const subscribeUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef.current) {
      return null
    }

    // Get and validate email
    const email = inputRef.current.value.trim()
    if (!validateEmail(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    // Set loading state
    setStatus("loading")
    setMessage("Subscribing...")

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit()
    }

    try {
      console.log("Sending subscription request for:", email)

      const res = await fetch(`/api/subscribe`, {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: "",
        }),
      })

      console.log("Subscription response status:", res.status)

      if (res.ok) {
        // Handle success
        const data = await res.json()
        console.log("You are now subscribed and should be receiving an email from us shortly.", data)
        setStatus("success")
        setMessage(data.message || "Thank you for subscribing!")
        if (inputRef.current) {
          inputRef.current.value = ""
        }

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(data)
        }
      } else {
        // Handle error
        const data = await res.json()
        console.error("Subscription failed:", data)
        setStatus("error")
        setMessage(data.error || "Subscription failed. Please try again.")

        // Call onError callback if provided
        if (onError) {
          onError(data)
        }
      }
    } catch (error) {
      console.error("Error during subscription:", error)
      setStatus("error")
      setMessage("An error occurred. Please try again later.")

      // Call onError callback if provided
      if (onError) {
        onError(error)
      }
    }
  }

  // Handle input interaction
  const handleInputInteraction = () => {
    if (onInteraction) {
      onInteraction()
    }
  }

  return (
    <div className="w-full max-w-screen-mobile-lg mx-auto flex flex-col items-center space-y-3">
      <form onSubmit={subscribeUser} className="w-full flex items-start gap-2">
        <div className="flex-grow">
          <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Email
          </label>

          <input
            type="email"
            id="email-input"
            name="email"
            placeholder=""
            ref={inputRef}
            required
            autoCapitalize="off"
            autoCorrect="off"
            onFocus={handleInputInteraction}
            onChange={handleInputInteraction}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              status === "error" ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          />
        </div>

        <button
          type="submit"
          value=""
          name="subscribe"
          disabled={status === "loading"}
          className={`self-end py-2 px-3 border border-blue-600 rounded text-white font-medium transition-colors ${
            status === "loading" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status !== "idle" && (
        <div
          className={`w-full p-3 rounded text-sm ${
            status === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : status === "error"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}
