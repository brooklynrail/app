import { useEffect, useState } from "react"
import styles from "./themeToggle.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

interface ThemeToggleProps {
  theme: string | null
  setTheme: (theme: string) => void
}

function ThemeToggle(props: ThemeToggleProps) {
  const { theme, setTheme } = props
  const [darkmode, setDarkMode] = useState(theme === "dark")

  const isDevOrPreview =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === undefined

  useEffect(() => {
    // Get the stored theme preference from localStorage
    const savedTheme = localStorage.getItem("theme")

    // If a theme is saved in localStorage, use it. Otherwise, use the system preference
    if (savedTheme) {
      setTheme(savedTheme)

      document.documentElement.setAttribute("data-mode", savedTheme)
      document.documentElement.classList.add(savedTheme)
      // add className to the HTML element
    } else {
      // Default to system setting
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(systemPrefersDark ? "dark" : "light")
      document.documentElement.classList.add(systemPrefersDark ? "dark" : "light")
      document.documentElement.setAttribute("data-mode", systemPrefersDark ? "dark" : "light")
    }
  }, [])

  // Toggle between dark and light themes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    setDarkMode(newTheme === "dark")
    document.documentElement.setAttribute("data-mode", newTheme)
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div className="flex justify-between items-center space-x-1">
      <label className="block text-sm">Dark mode: {theme === "dark" ? `On` : `Off`}</label>
      <div onClick={toggleTheme} className="relative w-12 h-6 cursor-pointer">
        <input type="checkbox" className="opacity-0 w-0 h-0" checked={theme === "dark"} readOnly />
        <span
          className={`absolute block top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${
            darkmode ? "bg-slate-500" : "bg-slate-700"
          }`}
        ></span>
        <span
          className={`absolute block top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            darkmode ? "translate-x-6" : ""
          }`}
        ></span>
      </div>
    </div>
  )
}

export default ThemeToggle
