import { useRef } from "react"

export default function NewsLetterSignUpForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  const subscribeUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef.current) {
      return null
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribe`, {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),

      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
    })
    console.log(res)
  }

  return (
    <form onSubmit={subscribeUser}>
      <label htmlFor="email-input" className="form__label">
        Your Best Email
      </label>

      <input
        type="email"
        id="email-input"
        name="email"
        placeholder="your best email"
        ref={inputRef}
        required
        autoCapitalize="off"
        autoCorrect="off"
      />

      <button type="submit" value="" name="subscribe">
        Subscribe
      </button>
    </form>
  )
}
