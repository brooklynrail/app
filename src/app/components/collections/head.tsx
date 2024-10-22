"use client"
import Link from "next/link"
import parse from "html-react-parser"

interface CollectionHeadProps {
  title: string
  kicker?: string
  permalink: string | null
  classes?: string
  description?: string | null
}

const CollectionHead = (props: CollectionHeadProps) => {
  const { title, kicker, permalink, classes, description } = props
  // Note: links only show up if this section is "featured", which means it has a super-section page
  const heading = permalink ? (
    <h2 className={`text-3xl tablet:text-4xl font-bold`}>
      <Link href={permalink}>{title}</Link>
    </h2>
  ) : (
    <h2 className={`text-3xl tablet:text-4xl font-bold`}>{title}</h2>
  )
  return (
    <div
      className={`head px-3 tablet-lg:px-6 pt-3 pb-1.5 tablet-lg:pt-6 tablet-lg:pb-3 sticky top-9 ${classes ? classes : "rail-bg"} z-10`}
    >
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="flex justify-between items-center">
            <div className="space-y-1 w-1/2">
              {kicker && <h6 className="uppercase text-xs tablet-lg:hidden">{kicker}</h6>}
              {heading}
              {description && <p className="text-sm">{parse(description)}</p>}
            </div>
            {permalink && (
              <Link
                className="hidden tablet-lg:block px-3 py-1 tablet:py-2 rounded-md shadow-lg text-sm tablet:text-lg font-medium bg-white dark:bg-zinc-700"
                href={permalink}
                title={`Visit all ${title}`}
              >
                <button>
                  <span className="hover:underline">All {title}</span> →
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionHead
