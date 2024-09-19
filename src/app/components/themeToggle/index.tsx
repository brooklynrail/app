import { useEffect } from "react"
import styles from "./themeToggle.module.scss"

interface ThemeToggleProps {
  theme: string | null
  setTheme: (theme: string) => void
}

function ThemeToggle(props: ThemeToggleProps) {
  const { theme, setTheme } = props

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
    document.documentElement.setAttribute("data-mode", newTheme)
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <button className={styles.theme_toggle} onClick={toggleTheme}>
      {theme === "dark" ? "🌙" : "🌞"}
    </button>
  )
}

export default ThemeToggle
