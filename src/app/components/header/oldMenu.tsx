import { useTheme } from "@/app/components/theme"
import { useEffect, useState } from "react"
import { GlobalSettings, GlobalSettingsNavigation, Issues, Sections, Tributes } from "../../../../lib/types"
import { getCurrentIssueData, getNavigation, getPermalink, PageType } from "../../../../lib/utils"

import IssueRail from "../issueRail"

const OldMenu = () => {
  const { theme } = useTheme()
  const [issue, setIssue] = useState<Issues | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!issue) {
        const issueData = await getCurrentIssueData()
        // Fetch all the data in parallel
        const [fetchedIssue] = await Promise.all([issueData])
        // Update the state with the fetched data as it becomes available
        fetchedIssue && setIssue(fetchedIssue)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch issue data:", error))
  }, [issue])

  if (!issue) {
    return <>loading....</>
  }

  return (
    <>
      <div className="top-0 left-0 w-mobile rail-bg h-screen fixed z-50 overflow-y-auto">
        <nav className="p-6 bg-slate-700 dark:bg-slate-900 text-white">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about/">About the Rail</a>
            </li>
            <li>
              <a href="/subscribe">Subscribe</a>
            </li>
            <li>
              <a href="/where-to-find-us">
                <i className="fas fa-map-marker-alt"></i> Find the Rail in print
              </a>
            </li>
            <li>
              <a href="/mailing-list">
                <i className="fas fa-envelope"></i> Sign up for our newsletter
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/brooklynrail/">
                <i className="fab fa-instagram"></i> Follow us on Instagram
              </a>
            </li>
            <li>
              <a href="https://shop.brooklynrail.org/">Store</a>
            </li>
            <li>
              <a href="/contact">Contact us</a>
            </li>
          </ul>
        </nav>
        <IssueRail thisIssueData={issue} inMenu={true} />
      </div>
    </>
  )
}

export default OldMenu
