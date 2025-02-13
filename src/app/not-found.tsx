import { notFound } from "next/navigation"
import NotFound from "../app/components/notFound"

export default async function NotFoundPage() {
  const data = await getData()

  return <NotFound {...data} />
}

async function getData() {
  const navResponse = await fetch(`/api/nav/`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

  return {
    navData,
  }
}
