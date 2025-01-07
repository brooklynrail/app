import Link from "next/link"
import { useEffect, useState } from "react"
import posthog from "posthog-js"

const DonationAd = () => {
  const [donateAmt, setDonateAmt] = useState<number | null>(null) // State to hold fetched donation data
  const [donateCount, setDonateCount] = useState<number | null>(null) // State to hold fetched donation data

  // Use useEffect to fetch donation data when the component is mounted
  useEffect(() => {
    const fetchDonateData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/airtable/`)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json()
        setDonateAmt(data.records[0].fields.Gross)
        setDonateCount(data.records[0].fields.Count)
      } catch (error) {
        console.error("Failed to fetch donation data:", error)
      }
    }

    fetchDonateData()
  }, []) // Dependencies: re-fetch data if showPopup or popupType changes

  // Calculate the progress based on fetched data
  const targetAmount = 200000 // Set your fundraising goal
  const currentAmount = donateAmt || null
  const progressPercent = currentAmount && (currentAmount / targetAmount) * 100

  // Add PostHog tracking function
  const handleDonateClick = () => {
    try {
      posthog.capture("clicked_donate", {
        location: "article_ad",
      })
    } catch (error) {
      console.error("Error tracking donation click:", error)
    }
  }

  return (
    <div>
      <div className="h-60 clear-both my-12">
        <div className="article-ad py-6 space-y-3">
          <p className="uppercase text-xl font-bold tablet-lg:text-3xl text-center text-zinc-800 dark:text-slate-100">
            Help us raise $200,000 by December 31
          </p>
          <div className="bg-indigo-100 h-9 w-auto max-w-screen-tablet-lg mx-auto flex justify-start items-center">
            {currentAmount && (
              <div className="bg-lime-500 h-9 flex justify-end items-center" style={{ width: `${progressPercent}%` }}>
                <span
                  className="relative -right-[1.135rem] h-0 w-0"
                  style={{
                    borderTop: "18px solid transparent",
                    borderBottom: "18px solid transparent",
                    borderLeft: "18px solid #84cc16",
                  }}
                ></span>
              </div>
            )}
            {currentAmount && <span className="pl-6 text-zinc-600">${currentAmount.toLocaleString()}</span>}
          </div>
          <p className="text-center text-sm tablet-lg:text-lg text-zinc-800 dark:text-slate-100">
            Your donation helps to ensure that the <em>Brooklyn Rail</em> remains <br /> FREE and accessible to all,
            forever.
          </p>
          <div className="flex justify-center">
            <Link
              href="https://brooklynrail.org/donate"
              title="Donate to The Brooklyn Rail"
              onClick={handleDonateClick}
            >
              <button className="bg-red-500 text-white px-3 tablet-lg:px-6 py-1.5 tablet-lg:py-3 rounded-sm text-nowrap text-md tablet-lg:text-lg uppercase hover:underline underline-offset-2 font-medium">
                {`Donate`}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationAd
