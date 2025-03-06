import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"

const Settings = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme">
      <div className="bg-slate-200 dark:bg-slate-800 p-3 py-6">
        <ThemeToggle {...{ theme, setTheme }} />
      </div>
    </div>
  )
}

export default Settings
