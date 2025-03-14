import React, { useState, useEffect } from "react"

interface PasswordProps {
  previewPassword: string
  cookieSlug: string
  isEnabled?: boolean
  children: React.ReactNode
}

const Password = ({ previewPassword, cookieSlug, isEnabled = false, children }: PasswordProps) => {
  const [password, setPassword] = useState("")
  const [isViewable, setIsViewable] = useState(false)
  const [passwordError, setPasswordError] = useState<string | undefined>()

  useEffect(() => {
    // get the URL of the current page
    const currentUrl = window.location.href

    // Read the cookie
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
    const previewCookie = cookies.find((cookie) => cookie.includes(cookieSlug))

    // Check various conditions that would make the content viewable
    if (previewCookie || currentUrl.includes("draftMode") || isEnabled) {
      setIsViewable(true)
    }
  }, [cookieSlug, isEnabled])

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (password === previewPassword) {
      setIsViewable(true)
      // set a cookie
      document.cookie = `${cookieSlug}=true; path=/; max-age=3600; SameSite=None; Secure`
    } else {
      setPasswordError("Incorrect password")
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  if (isViewable) {
    return children
  }

  return (
    <div className="bg-white h-screen w-screen">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <form onSubmit={handlePasswordSubmit}>
            <div className="flex justify-center items-center h-screen">
              <div className="text-2xl flex space-x-3">
                <input
                  className={`py-1 px-2 border border-slate-400 rounded-sm ${passwordError ? "usa-input--error" : ""}`}
                  id="input-type-text"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="password..."
                />
                <button
                  className="bg-indigo-600 py-2 px-3 uppercase text-md rounded-sm text-white hover:underline underline-offset-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <p>{passwordError}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password
