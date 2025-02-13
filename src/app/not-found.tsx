import { notFound } from "next/navigation"
import NotFound from "../app/components/notFound"

export default async function NotFoundPage() {
  const data = await getData()

  return <NotFound {...data} />
}

async function getData() {
  const navData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nav/`, {
    cache: "no-store", // Avoids caching issues during SSR
  }).then((res) => res.json())

  return {
    navData,
  }
}
