"use client"

import Link from "next/link"

const Sponsor = () => {
  return (
    <div className="px-3 py-6 tablet-lg:p-6 space-y-3 text-md tablet-lg:text-lg text-center p-description bg-white dark:bg-zinc-700 rounded-xl font-medium text-zinc-600 dark:text-indigo-50">
      <p className="text-center">
        ❤️ 🌈 We'd like to thank the{" "}
        <Link className="text-indigo-500 dark:text-indigo-400" href="https://www.instagram.com/terraamericanart/">
          The Terra Foundation for American Art
        </Link>{" "}
        for making these daily conversations possible, and for their support of our growing archive.
      </p>
      <p className="text-center divide-x rail-divide">
        <Link
          className="px-3 text-indigo-500 dark:text-indigo-400 text-nowrap"
          href="https://www.instagram.com/terraamericanart/"
        >
          <i className="fab fa-instagram"></i> <span>Follow @terraamericanart</span>
        </Link>
        <Link
          className="px-3 text-indigo-500 dark:text-indigo-400 text-nowrap"
          href="https://www.terraamericanart.org/"
        >
          <span>Learn more »</span>
        </Link>
      </p>
    </div>
  )
}

export default Sponsor
