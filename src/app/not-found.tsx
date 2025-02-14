import { notFound } from "next/navigation"
import NotFound from "../app/components/notFound"
import { getBaseUrl } from "../../lib/utils"

export default async function NotFoundPage() {
  const data = await getData()

  return <NotFound {...data} />
}

async function getData() {
  const baseURL = getBaseUrl()
  const navData = await fetch(`${baseURL}/api/nav/`, {
    next: { revalidate: 86400 }, // 24 hours in seconds (24 * 60 * 60)
  }).then((res) => res.json())

  return {
    navData,
  }
}
