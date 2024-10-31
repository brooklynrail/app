"use client"
import { algoliasearch } from "algoliasearch"
import parse from "html-react-parser"
import Image from "next/image"
import Link from "next/link"
import { InfiniteHits, SearchBox } from "react-instantsearch"
import { InstantSearchNext } from "react-instantsearch-nextjs"

import { SearchHit } from "../../../../lib/types"
import styles from "./search.module.scss"

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!

const searchClient = {
  ...algoliasearch(appId, apiKey),
  search(requests: any) {
    const query = requests[0].params.query

    // Only allow searching if query length is 3 or more characters
    if (!query || query.length < 3) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
        })),
      })
    }

    // Otherwise, perform the search
    return algoliasearch(appId, apiKey).search(requests)
  },
}

const index = "archive"

const SearchField = () => {
  return (
    <div className="py-6 space-y-3">
      <h1 className="font-bold text-2xl px-3">Search</h1>
      <InstantSearchNext
        future={{
          preserveSharedStateOnUnmount: true,
        }}
        routing={{
          router: {
            cleanUrlOnDispose: false,
            windowTitle(routeState) {
              const indexState = routeState.indexName || {}
              return indexState.query
                ? `The Brooklyn Rail - Results for: ${indexState.query}`
                : "The Brooklyn Rail - Results page"
            },
          },
        }}
        indexName={index}
        searchClient={searchClient}
      >
        <SearchBox
          autoFocus={true}
          placeholder=""
          classNames={{
            root: "shadow-sm px-3 tablet-lg:px-0",
            form: "relative flex items-center",
            input:
              "block w-full text-lg px-3 py-3 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-slate-100 border-2 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 rounded-md focus:ring-1",
          }}
          submitIconComponent={() => (
            <div className="top-1.5 right-1.5 absolute">
              <SubmitIcon />
            </div>
          )}
          resetIconComponent={() => <ResetIcon />}
          loadingIconComponent={() => <Loading />}
        />
        <div className={styles.allhits}>
          <InfiniteHits
            hitComponent={Card}
            showPrevious={false}
            classNames={{
              root: `hits`,
              list: "divide-y rail-divide",
            }}
          />
        </div>
      </InstantSearchNext>
    </div>
  )
}

export const SubmitIcon = () => {
  return (
    <div className="p-1.5 absolute right-0 top-0">
      <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24.8161 22.5416L20.0068 17.7322C21.1004 16.1086 21.64 14.08 21.3511 11.9184C20.8585 8.24162 17.8452 5.24952 14.1648 4.78357C8.69288 4.09117 4.09163 8.69242 4.78407 14.1643C5.25014 17.8463 8.24264 20.8621 11.9198 21.3523C14.0814 21.6411 16.1104 21.1017 17.7336 20.0079L22.543 24.8173C23.1706 25.4449 24.1883 25.4449 24.8159 24.8173C25.4429 24.1889 25.4429 23.1684 24.8161 22.5416ZM7.89292 13.0715C7.89292 10.2357 10.2 7.92863 13.0358 7.92863C15.8716 7.92863 18.1786 10.2357 18.1786 13.0715C18.1786 15.9073 15.8716 18.2143 13.0358 18.2143C10.2 18.2143 7.89292 15.9081 7.89292 13.0715Z"
          className="fill-zinc-900 "
        />
      </svg>
    </div>
  )
}

const ResetIcon = () => {
  return <></>
}

const Loading = () => {
  return <></>
}

interface CardProps {
  hit: SearchHit
}

// React InstantSearch InfiniteHits widget
// See: https://www.algolia.com/doc/api-reference/widgets/infinite-hits/react/
const Card = (props: CardProps) => {
  const { permalink, title_display, description_display, image, image_caption, content_type } = props.hit

  // Books | September 2024
  // wrap the first part of the string before the pipe in a span with a class of font-medium
  const [kicker_1, kicker_2] = typeof props.hit.kicker === "string" ? props.hit.kicker.split("|") : [null, null]
  const kicker = kicker_2 ? (
    <>
      <span className="font-medium">{kicker_1}</span> | {kicker_2}
    </>
  ) : (
    kicker_1
  )

  // strip all of the <a> tags from the description_display field but keep the text content
  const description = description_display ? description_display.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1") : ""

  const caption = image_caption ? image_caption : title_display

  const isPastEvent = content_type === "event"

  const type = (() => {
    switch (content_type) {
      case "event":
        return styles.type_event
      case "article":
        return styles.type_article
      case "contributor":
        return styles.type_contributor
      default:
        return ""
    }
  })()

  return (
    <div className={`${styles.hit} ${type}`}>
      <Link className={`p-3 block space-y-1.5`} href={`${permalink}?search`}>
        <div className="grid grid-cols-4 tablet-lg:grid-cols-6 gap-3">
          <div className={`col-span-3 ${isPastEvent ? `tablet-lg:col-span-4` : `tablet-lg:col-span-5`} space-y-3`}>
            <div className="space-y-1 pr-6">
              <h3 className="font-medium text-lg">{parse(title_display)}</h3>
              {description && <div className="line-clamp-4 text-sm">{parse(description)}</div>}
            </div>
            {kicker && <p className="text-indigo-700 uppercase text-xs">{kicker}</p>}
          </div>
          <div className={isPastEvent ? `col-span-2` : `col-span-1`}>
            {image && <Image className="" src={image} alt={caption} width={200} height={200} />}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchField
