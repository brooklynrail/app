import { useEffect, useState } from "react"
import { usePostHog } from "posthog-js/react"
import styles from "./themeToggle.module.scss"

interface ThemeToggleProps {
  theme: string | null
  setTheme: (theme: string) => void
}

const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  const [darkmode, setDarkMode] = useState(false)
  const [systemPrefersDark, setSystemPrefersDark] = useState(false)
  const [userSelected, setUserSelected] = useState(false)
  const posthog = usePostHog()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const appliedTheme = savedTheme || (prefersDark ? "dark" : "light")

    setTheme(appliedTheme)
    setDarkMode(appliedTheme === "dark")
    setSystemPrefersDark(prefersDark)
    setUserSelected(!!savedTheme)

    document.documentElement.setAttribute("data-mode", appliedTheme)
    document.documentElement.classList.add(appliedTheme)

    if (posthog) {
      posthog.capture("dark_mode_session", {
        theme: appliedTheme,
        systemPrefersDark: prefersDark,
        userSelected: !!savedTheme,
      })
    }
  }, [posthog, setTheme])

  const toggleTheme = () => {
    const previousTheme = theme
    const newTheme = theme === "dark" ? "light" : "dark"

    setTheme(newTheme)
    setUserSelected(true)
    document.documentElement.setAttribute("data-mode", newTheme)
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(newTheme)
    localStorage.setItem("theme", newTheme)

    if (posthog) {
      posthog.capture("dark_mode_toggle", {
        previousTheme,
        newTheme,
        foundToggle: true,
      })
    }
  }

  return (
    <div className="flex justify-between items-center space-x-1">
      <label className="block text-sm font-medium">Dark mode: {darkmode ? `On` : `Off`}</label>
      <div onClick={toggleTheme} className="relative w-14 h-8 cursor-pointer">
        <input type="checkbox" className="opacity-0 w-0 h-0" checked={theme === "dark"} readOnly />
        <span
          className={`absolute block top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${styles.toggle} ${
            darkmode ? "bg-slate-500" : "bg-white"
          }`}
        ></span>
        <span
          className={`absolute block top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            darkmode ? "translate-x-6" : ""
          }`}
        >
          {darkmode ? <MoonIcon /> : <SunIcon />}
        </span>
      </div>
    </div>
  )
}

const SunIcon = () => {
  return (
    <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#818CF8" />
      <circle cx="18" cy="18" r="9" fill="#FDE047" />
      <path d="M18 10.4571V6" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M18 30.0001V25.543" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      {/* Add other paths here */}
    </svg>
  )
}

const MoonIcon = () => {
  return (
    <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#4338CA" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4488 27.6505C22.7331 27.6505 29.4488 20.9348 29.4488 12.6505C29.4488 10.2622 28.8906 8.00425 27.8976 6C31.2845 8.75022 33.4488 12.9476 33.4488 17.6505C33.4488 25.9348 26.7331 32.6505 18.4488 32.6505C12.5529 32.6505 7.45141 29.2488 5 24.301C7.57921 26.3954 10.8674 27.6505 14.4488 27.6505Z"
        fill="#EEF2FF"
      />
    </svg>
  )
}

export default ThemeToggle
