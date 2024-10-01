import { useTheme } from "@/app/components/theme"
import Link from "next/link"
import { useEffect, useState } from "react"
import { GlobalSettings, GlobalSettingsNavigation, Sections, Tributes } from "../../../../lib/types"
import { getNavigation, getPermalink, PageType } from "../../../../lib/utils"
import { glob } from "fs"
import { get } from "http"

interface MenuProps {}

const Menu = () => {
  const { theme } = useTheme()

  const [globalSettings, setGlobalSettings] = useState<GlobalSettings | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!globalSettings) {
        const global_settings = await getNavigation()
        // Fetch all the data in parallel
        const [fetchedNav] = await Promise.all([global_settings])
        // Update the state with the fetched data as it becomes available
        setGlobalSettings(fetchedNav)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch globalNav data:", error))
  }, [globalSettings])

  if (!globalSettings) {
    return <>loading....</>
  }

  const current_issue = globalSettings.current_issue
  const items = globalSettings.navigation.map((nav: GlobalSettingsNavigation) => {
    if (nav.collection === "sections") {
      const sectionPermalink = getPermalink({
        issueSlug: current_issue.slug,
        section: nav.item.slug,
        type: PageType.Section,
      })
      return (
        <li key={nav.id} className="px-6 py-3 font-bold text-center">
          <Link href={sectionPermalink}>{nav.item.name}</Link>
        </li>
      )
    }

    if (nav.collection === "tributes") {
      return (
        <li key={nav.id} className="px-6 py-3 font-bold text-center">
          {nav.item.title}
        </li>
      )
    }

    if (nav.collection === "pages") {
      return (
        <li key={nav.id} className="px-6 py-3 font-bold text-center">
          {nav.item.title}
        </li>
      )
    }

    return <></>
  })

  const searchIcon = (
    <button className="bg-white pr-2 py-2 flex-none border-[1px] border-l-0 border-zinc-800 rounded-e-md">
      <svg className="" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24.8152 23.0416L20.0058 18.2322C21.0994 16.6086 21.639 14.58 21.3502 12.4184C20.8576 8.74162 17.8442 5.74952 14.1638 5.28357C8.6919 4.59117 4.09065 9.19242 4.78309 14.6643C5.24916 18.3463 8.24166 21.3621 11.9188 21.8523C14.0804 22.1411 16.1094 21.6017 17.7326 20.5079L22.542 25.3173C23.1696 25.9449 24.1873 25.9449 24.8149 25.3173C25.4419 24.6889 25.4419 23.6684 24.8152 23.0416ZM7.89195 13.5715C7.89195 10.7357 10.199 8.42863 13.0348 8.42863C15.8706 8.42863 18.1777 10.7357 18.1777 13.5715C18.1777 16.4073 15.8706 18.7143 13.0348 18.7143C10.199 18.7143 7.89195 16.4081 7.89195 13.5715Z"
          fill="#3F3F46"
        />
      </svg>
    </button>
  )

  return (
    <div className="rail-bg z-50 h-screen w-mobile fixed left-0 top-0 bottom-0 overflow-auto">
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex justify-between">
          <Link className="text-lg font-bold" href="/">
            Home
          </Link>{" "}
          <Link className="text-lg font-bold" href="/">
            Close
          </Link>
        </div>

        {/* enter a search form */}
        <form action="" className="flex space-x-0">
          <input
            className="w-full border-[1px] border-r-0 border-zinc-800 rounded-s-md text-md px-2 py-2"
            type="text"
            placeholder="Search"
          />
          {searchIcon}
        </form>
      </div>
      <div className="divide-y-[1px] divide-dotted">
        <div className="flex bg-zinc-800 text-white divide-x-[1px] divide-dotted w-full justify-between">
          <div className="p-6 w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div className="p-6 w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        </div>
        <div className="flex bg-zinc-800 text-white divide-x-[1px] divide-dotted w-full justify-between">
          <div className="p-6 w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div className="p-6 w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        </div>
      </div>
      <ul className="flex flex-col divide-y-[1px] rail-divide">{items}</ul>
    </div>
  )
}

export default Menu
