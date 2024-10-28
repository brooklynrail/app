import parse from "html-react-parser"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Pages } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { getAllPages } from "../../../../lib/utils/pages"

const CurrentPages = () => {
  const [currentPages, setCurrentPages] = useState<Pages[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentPages) {
        const pages = await getAllPages()
        const [fetchedPages] = await Promise.all([pages])
        setCurrentPages(fetchedPages)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch Event data on the Homepage:", error))
  }, [currentPages])

  if (!currentPages || currentPages.length === 0) {
    return null
  }

  const allPages = currentPages?.map((page: Pages, i: number) => {
    const pageURL = getPermalink({
      slug: page.slug,
      type: PageType.Page,
    })
    const childPageURL = getPermalink({
      slug: page.slug,
      type: PageType.ChildPage,
    })
    return (
      <li key={i} className="">
        <Link href={page.slug === "about" ? pageURL : childPageURL} className="block text-sm font-bold">
          {parse(page.title)}
        </Link>
      </li>
    )
  })

  return (
    <div className="py-3 bg-slate-100 dark:bg-zinc-700 pb-48">
      <ul className="py-3 block text-sm font-bold px-9 space-y-3">
        {allPages}
        <li className="">
          <Link className="flex space-x-2 w-full" href={`/subscribe`}>
            <span>Sign up for our newsletter</span>
          </Link>
        </li>
        <li className="">
          <Link className="flex space-x-2 w-full" href={`/instagram`}>
            <span>Follow us on Instagram</span>
          </Link>
        </li>
        <li className="">
          <Link className="flex space-x-2 w-full" href={`/store`}>
            <span>Visit our store</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default CurrentPages
