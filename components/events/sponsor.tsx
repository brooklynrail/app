"use client"
import parse from "html-react-parser"

interface SponsorProps {
  events_sponsorship_text?: string | null
}

const Sponsor = ({ events_sponsorship_text }: SponsorProps) => {
  // Only show the sponsorship box if we have dynamic sponsorship text
  if (!events_sponsorship_text) {
    return null
  }

  return (
    <div className="px-3 py-6 tablet-lg:p-6 space-y-3 text-md tablet-lg:text-lg text-center p-description bg-white dark:bg-zinc-700 rounded-xl font-medium text-zinc-600 dark:text-indigo-50 [&_a]:text-indigo-500 [&_a]:dark:text-indigo-400">
      {parse(events_sponsorship_text)}
    </div>
  )
}

export default Sponsor
