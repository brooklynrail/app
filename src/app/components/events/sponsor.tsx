"use client"

import Link from "next/link"

const Sponsor = () => {
  return (
    <div className="py-9 tablet-lg:w-tablet mx-auto space-y-3">
      <p className="text-center text-xl">
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
