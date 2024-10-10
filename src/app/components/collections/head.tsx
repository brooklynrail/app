"use client"

import Link from "next/link"
import styles from "./collection.module.scss"

interface CollectionHeadProps {
  title: string
  permalink: string
  classes?: string
}

const CollectionHead = (props: CollectionHeadProps) => {
  const { title, permalink, classes } = props

  return (
    <div className={`head px-6 sticky top-0 ${classes ? classes : "rail-bg"} z-10`}>
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="flex justify-between items-center py-3 pt-6 pb-5">
            <h2 className="text-2xl tablet:text-4xl font-bold">{title}</h2>
            <Link
              className="px-3 py-1 tablet:py-2 shadow-lg text-sm tablet:text-lg font-medium bg-white dark:bg-zinc-700"
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
