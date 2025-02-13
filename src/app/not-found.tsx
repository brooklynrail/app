import { notFound } from "next/navigation"
import NotFound from "../app/components/notFound"

export default async function NotFoundPage() {
  const data = await getData()

  return <NotFound {...data} />
}

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_BRANCH_URL}`
  const navData = await fetch(`${baseUrl}/api/nav/`, {
    cache: "no-store", // Avoids caching issues during SSR
  }).then((res) => res.json())
  console.log("Nav data", navData)

  return {
    navData,
  }
}
