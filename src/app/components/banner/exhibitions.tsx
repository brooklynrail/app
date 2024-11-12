"use client"
import Link from "next/link"
import style from "./banner.module.scss"

const Exhibitions = () => {
  const show_url = `https://singing-in-unison.brooklynrail.org/exhibitions/loren-munk-james-kalm`
  return (
    <div className={`banner-card col-span-4 tablet-lg:col-span-3 py-3 px-3 tablet-lg:px-6 tablet-lg:py-0`}>
      <div className="grid grid-cols-3 gap-3 tablet-lg:gap-x-6">
        <div className="col-span-3 row-start-1">
          <h3 className="text-sm tablet-lg:text-lg font-medium">
            <Link href={show_url}>
              <span className="">Singing in Unison Part 10</span>
            </Link>
          </h3>
        </div>

        <div className="col-span-2 row-start-2">
          <div className={`w-full h-full ${style.description}`}>
            <Link href={show_url}>
              <h3>Loren Munk &amp; James Kalm</h3>
              <p>
                October 17–November 16
                <br />
                Ruttkowski;68
              </p>
            </Link>
          </div>
        </div>

        <div className="col-span-1 row-start-2">
          <div className="flex flex-col items-center justify-center space-y-1">
            <Link
              href={show_url}
              className={`py-1 text-center uppercase font-medium text-xs border rail-border px-0.5 flex justify-center w-full`}
            >
              <button className="uppercase">Visit</button>
            </Link>
            <Link
              href={show_url}
              className={`py-1 text-center uppercase font-medium text-xs flex justify-center w-full`}
            >
              <button className="uppercase">All Exhibitions</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Exhibitions
