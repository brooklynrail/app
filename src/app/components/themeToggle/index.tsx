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
    const forcedTheme = "light"

    // If a theme is saved in localStorage, use it. Otherwise, use the system preference
    if (savedTheme) {
      setTheme(savedTheme)

      document.documentElement.setAttribute("data-mode", forcedTheme)
      document.documentElement.classList.add(forcedTheme)
      // add className to the HTML element
    } else {
      // Default to system setting
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      // setTheme(systemPrefersDark ? "dark" : "light")
      setTheme(systemPrefersDark ? forcedTheme : "light")
      document.documentElement.classList.add(systemPrefersDark ? forcedTheme : "light")
      document.documentElement.setAttribute("data-mode", systemPrefersDark ? forcedTheme : "light")
    }
  }, [])

  if (process.env.NODE_ENV === "production") {
    return <></>
  }

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
    <div className="flex space-x-3 items-center fixed bottom-4 left-4">
      <button className={styles.theme_toggle} onClick={toggleTheme}>
        {theme === "dark" ? "🌙" : "🌞"}
      </button>
      <p className="text-xs">
        <span className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden widescreen:block`}>
          widescreen
        </span>
        <span
          className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden desktop-lg:max-widescreen:block`}
        >
          desktop-lg
        </span>
        <span
          className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden desktop:max-desktop-lg:block`}
        >
          desktop
        </span>
        <span
          className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden tablet-lg:max-desktop:block`}
        >
          tablet-lg
        </span>
        <span
          className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden tablet:max-tablet-lg:block`}
        >
          tablet
        </span>
        <span
          className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden mobile-lg:max-tablet:block`}
        >
          mobile-lg
        </span>
        <span
          className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden mobile:max-mobile-lg:block`}
        >
          mobile
        </span>
      </p>
    </div>
  )
}

export default ThemeToggle
