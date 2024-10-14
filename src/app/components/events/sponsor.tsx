"use client"

import Link from "next/link"

const Sponsor = () => {
  return (
    <div className="p-6 space-y-3 text-lg text-center p-description bg-white dark:bg-zinc-700 rounded-xl">
      <p className="text-center">
        ❤️ 🌈 We'd like to thank the{" "}
        <a href="https://www.instagram.com/terraamericanart/">
          <strong>The Terra Foundation for American Art</strong>
        </a>{" "}
        for making these daily conversations possible, and for their support of our growing archive.
      </p>
      <p className="text-center divide-x rail-divide">
        <Link className="px-3 underline" href="https://www.instagram.com/terraamericanart/">
          <i className="fab fa-instagram"></i> <span>Follow @terraamericanart</span>
        </Link>
        <Link className="px-3 underline" href="https://www.terraamericanart.org/">
          <span>Learn more »</span>
        </Link>
      </p>
    </div>
  )
}

export default Sponsor
