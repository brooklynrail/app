import { useEffect, useState } from "react"
import styles from "./themeToggle.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

// const isDevOrPreview =
//   process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
//   process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
//   process.env.NEXT_PUBLIC_VERCEL_ENV === undefined

// {
//   isDevOrPreview && (
//     <p className="text-xs">
//       <span className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden widescreen:block`}>
//         widescreen
//       </span>
//       <span
//         className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden desktop-lg:max-widescreen:block`}
//       >
//         desktop-lg
//       </span>
//       <span
//         className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden desktop:max-desktop-lg:block`}
//       >
//         desktop
//       </span>
//       <span
//         className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden tablet-lg:max-desktop:block`}
//       >
//         tablet-lg
//       </span>
//       <span className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden tablet:max-tablet-lg:block`}>
//         tablet
//       </span>
//       <span className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden mobile-lg:max-tablet:block`}>
//         mobile-lg
//       </span>
//       <span className={`bg-slate-200 dark:bg-slate-800 dark:text-white px-1 rounded hidden mobile:max-mobile-lg:block`}>
//         mobile
//       </span>
//     </p>
//   )
// }

interface ThemeToggleProps {
  theme: string | null
  setTheme: (theme: string) => void
}

const ThemeToggle = (props: ThemeToggleProps) => {
  const { theme, setTheme } = props
  const [darkmode, setDarkMode] = useState(theme === "dark")

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
      <label className="block text-sm">Dark mode: {darkmode ? `On` : `Off`}</label>
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
      <path d="M14.2286 11.4674L12 7.60742" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M24.0001 28.3917L21.7715 24.5317" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M10.4571 18H6" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M30.0001 18H25.543" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M11.4674 14.2281L7.60742 11.9995" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M28.3912 24.0001L24.5312 21.7715" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M11.4674 21.7714L7.60742 24" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M28.3912 11.9999L24.5312 14.2285" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M14.2286 24.5326L12 28.3926" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M24.0001 7.60826L21.7715 11.4683" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M15.4734 8.57151L13.9805 3" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M22.0183 32.9992L20.5254 27.4277" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M11.0962 11.0982L7.01758 7.01953" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M28.979 28.9805L24.9004 24.9019" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M8.57151 20.5262L3 22.019" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M32.9992 13.9808L27.4277 15.4736" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M8.57151 15.4738L3 13.981" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M32.9992 22.0192L27.4277 20.5264" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M11.0982 24.9018L7.01953 28.9805" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M28.981 7.01951L24.9023 11.0981" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M15.4734 27.428L13.9805 32.9995" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
      <path d="M22.0183 2.99978L20.5254 8.57129" stroke="#FDE047" strokeWidth="2" strokeDasharray="1 1" />
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
      <path d="M13 4V16" stroke="#EEF2FF" strokeDasharray="1 1" />
      <path d="M10 4.80371L16 15.196" stroke="#EEF2FF" strokeDasharray="1 1" />
      <path d="M7.80469 7L18.197 13" stroke="#EEF2FF" strokeDasharray="1 1" />
      <path d="M7 10H19" stroke="#EEF2FF" strokeDasharray="1 1" />
      <path d="M7.80469 13L18.197 7" stroke="#EEF2FF" strokeDasharray="1 1" />
      <path d="M10 15.1963L16 4.80398" stroke="#EEF2FF" strokeDasharray="1 1" />
    </svg>
  )
}

export default ThemeToggle
