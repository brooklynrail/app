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
    headers: {
      "x-vercel-protection-bypass": `${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`,
    },
    next: { revalidate: 86400, tags: ["homepage"] }, // 24 hours in seconds (24 * 60 * 60)
  }).then((res) => res.json())

  return {
    navData,
  }
}
