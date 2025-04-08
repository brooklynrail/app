"use client"

import { useEffect, useState } from "react"
import { EventProps } from "@/lib/railTypes"
import { formatEventDate, formatTime } from "@/lib/utils/events"

export interface RegisterProps extends EventProps {
  showRegistration: boolean
  setShowRegistration: (showRegistration: boolean) => void
}

const Register = (props: EventProps & RegisterProps) => {
  const { eventData, setShowRegistration } = props
  const { title, deck, start_date, end_date, airtable_id, all_day } = eventData
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  const isSameDay = startDate.toDateString() === endDate.toDateString()
  const dateString = formatEventDate(startDate, endDate, isSameDay)
  // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(start_date, "America/New_York")
  const startTimePT = formatTime(start_date, "America/Los_Angeles")

  // Preload Airtable script when component mounts
  useEffect(() => {
    const loadAirtableScript = () => {
      return new Promise((resolve, reject) => {
        if (document.querySelector('script[src*="airtable"]')) {
          resolve(true)
          return
        }

        const script = document.createElement("script")
        script.src = "https://static.airtable.com/js/embed/embed_snippet_v1.js"
        script.async = true
        script.onload = () => resolve(true)
        script.onerror = () => reject()
        document.body.appendChild(script)
      })
    }

    loadAirtableScript()
      .then(() => setIsClient(true))
      .catch((error) => console.error("Failed to load Airtable script:", error))

    return () => {
      // Script cleanup is handled automatically by the browser
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 z-30" onClick={() => setShowRegistration(false)} />

      <aside
        id="register"
        className="h-entry py-6 tablet-lg:py-12 bg-orange-100 dark:bg-indigo-800 absolute top-3 left-1/2 -translate-x-1/2 w-[95%] tablet-lg:w-tablet z-40 rounded-md"
        onClick={(e) => e.stopPropagation()} // Prevent clicks on modal from closing it
      >
        {/* Close button */}
        <button
          className="border border-zinc-200 text-zinc-700 text-center shadow-lg absolute top-3.5 right-3 rounded-full bg-white w-8 tablet:w-9 h-8 tablet:h-9 flex items-center justify-center"
          onClick={() => setShowRegistration(false)}
        >
          <span className="text-lg tablet:text-xl font-bold">&#x2715;</span>
        </button>

        <div className="px-3 desktop:max-w-screen-widescreen mx-auto space-y-6">
          <div className="flex flex-col space-y-3 px-3">
            <h2 className="text-4xl font-bold">Register</h2>
            <div className="flex flex-col space-y-3">
              <div className="">
                <p className="text-lg font-bold">{title}</p>
                {deck && <p className="font-light">{deck}</p>}
              </div>
              <p className="font-light space-x-3">
                <span>{dateString}</span>{" "}
                {isSameDay && !all_day && (
                  <span>
                    {startTimeET} Eastern / {startTimePT} Pacific
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="event-register">
            {isClient && (
              <div className="relative w-full" style={{ minHeight: "1300px" }}>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-orange-50 dark:bg-indigo-900">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-orange-800 dark:text-orange-200">Loading registration form...</p>
                    </div>
                  </div>
                )}
                <iframe
                  className="airtable-embed airtable-dynamic-height"
                  src={`https://airtable.com/embed/shrZwZHHxdeEANeeT?backgroundColor=orangeLight&prefill_Event+IDs=${airtable_id}`}
                  frameBorder="0"
                  width="100%"
                  height="1300"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Register
