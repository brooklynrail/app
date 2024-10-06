"use client"

import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import Button, { ButtonType } from "../button"

interface CollectionHeadProps {
  title: string
  permalink: string
}

const CollectionHead = (props: CollectionHeadProps) => {
  const { title, permalink } = props

  return (
    <div className="sticky top-0 rail-bg">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="flex justify-between items-center py-3 pt-6 pb-5">
            <h2 className="text-2xl tablet:text-4xl font-bold">{title}</h2>
            <Link
              className="px-3 py-2 shadow-lg text-lg font-medium bg-white dark:bg-zinc-700"
              href={permalink}
              title={`Visit all ${title}`}
            >
              <button>All {title} →</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionHead
