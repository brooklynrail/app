"use client"

import Link from "next/link"

const Sponsor = () => {
  return (
    <div className="px-3 py-6 tablet-lg:p-6 space-y-3 text-md tablet-lg:text-lg text-center p-description bg-white dark:bg-zinc-700 rounded-xl font-medium text-zinc-600 dark:text-indigo-50">
      <p className="text-center">
        ❤️ 🌈 We'd like to thank{" "}
        <Link className="text-indigo-500 dark:text-indigo-400" href="https://www.instagram.com/terraamericanart/">
          The Terra Foundation for American Art
        </Link>{" "}
        and{" "}
        <Link className="text-indigo-500 dark:text-indigo-400" href="https://teigerfoundation.org/">
          Teiger Foundation
        </Link>{" "}
        for making these daily conversations possible, and for their support of our growing archive.
      </p>
      <p className="text-center divide-x rail-divide hidden">
        <Link
          className="text-sm px-3 text-indigo-500 dark:text-indigo-400"
          href="https://www.instagram.com/teigerfoundation/"
        >
          <i className="fab fa-instagram"></i> <span>Follow @teigerfoundation</span>
        </Link>
        <Link className="text-sm px-3 text-indigo-500 dark:text-indigo-400" href="https://teigerfoundation.org/">
          <span>Learn more »</span>
        </Link>
      </p>
    </div>
  )
}

export default Sponsor
