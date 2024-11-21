"use client"
import Link from "next/link"
import { Homepage } from "../../../../lib/types"
import Paper from "../paper"
import SearchField from "../search/searchBox"

interface NotFoundProps {
  navData: Homepage
}

const NotFound = (props: NotFoundProps) => {
  return (
    <Paper pageClass="paper-404" navData={props.navData}>
      <main className="">
        <div className="py-6 space-y-6">
          <div className="py-6 space-y-3">
            <h1 className="text-5xl font-serif text-center">Page Not Found</h1>
            <p className="text-xl text-center">Sorry, the page you're looking for doesn't exist.</p>
          </div>
          <ul className="flex text-center w-full justify-center divide-x rail-divide">
            <li>
              <Link className={`px-3 underline text-blue-600`} href="/">
                Homepage
              </Link>
            </li>
            <li>
              <Link className={`px-3 underline text-blue-600`} href="/archives">
                All Issues
              </Link>
            </li>
            <li>
              <Link className={`px-3 underline text-blue-600`} href="/events">
                Events
              </Link>
            </li>
            <li>
              <Link className={`px-3 underline text-blue-600`} href="/contributors">
                Contributors
              </Link>
            </li>
            <li>
              <Link className={`px-3 underline text-blue-600`} href="/about">
                About the <em>Rail</em>
              </Link>
            </li>
          </ul>
        </div>
        <section id="main" className="tablet-lg:py-9">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
            <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 desktop-lg:col-span-6 desktop-lg:col-start-4">
              <SearchField />
            </div>
          </div>
        </section>
      </main>
    </Paper>
  )
}

export default NotFound
